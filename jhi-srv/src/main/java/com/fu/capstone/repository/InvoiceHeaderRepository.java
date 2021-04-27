package com.fu.capstone.repository;

import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;

import java.time.Instant;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * Spring Data  repository for the InvoiceHeader entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceHeaderRepository extends JpaRepository<InvoiceHeader, Long> {

	@Query(	  value = "SELECT i FROM InvoiceHeader i "
					+ " WHERE ( :invoiceNo = '' OR i.invoiceNo = :invoiceNo ) "
					+ " AND ( :status = '' OR i.status = :status ) "
					+ " AND ( :receiveDate = '' OR i.receiveDate BETWEEN CONCAT(:receiveDate, ' 00:00:00') AND CONCAT(:receiveDate,' 23:59:59')  ) "
					+ " AND ( :createDate = ''  OR i.createDate  BETWEEN CONCAT(:createDate, ' 00:00:00')  AND CONCAT(:createDate, ' 23:59:59')  ) "
					+ " AND ( :updateDate = ''  OR i.updateDate  BETWEEN CONCAT(:updateDate, ' 00:00:00')  AND CONCAT(:updateDate, ' 23:59:59')  ) ")
	Page<InvoiceHeader> getInvoiceHeadersByParams (
			@RequestParam("invoiceNo") String invoiceNo, @RequestParam("status") String status,
    		@RequestParam("receiveDate") String receiveDate, @RequestParam("createDate") String createDate, 
    		@RequestParam("updateDate") String updateDate, Pageable pageable );

	@Query( value = "SELECT i.* FROM invoice_header i, personal_shipment ps "
				  + " WHERE i.id = ps.invoice_header_id AND ps.employee_id = :id "
				  + " AND (ps.status <> 'finish' OR i.jhi_cancel <> 'true') "
				  + " AND (:type = '' OR ps.shipment_type = :type) "
				  + " AND (:invNo = '' OR i.invoice_no like CONCAT('%', :invNo , '%')) ",
				  countQuery =  "SELECT COUNT(*) FROM invoice_header i, personal_shipment ps, employee e, person p "
						  + " WHERE i.id = ps.invoice_header_id AND ps.employee_id = :id "
						  + " AND (ps.status <> 'finish' OR i.jhi_cancel <> 'true')"
						  + " AND (:type = '' OR ps.shipment_type = :type) "
						  + " AND (:invNo = '' OR i.invoice_no like CONCAT('%', :invNo , '%')) ",
				  nativeQuery = true)
	Page<InvoiceHeader> getInvoiceHeadersByShipper (@Param("id") Long id, @Param("invNo") String invNo, @Param("type") String type, Pageable pageable );

	@Query( value = "SELECT i FROM InvoiceHeader i WHERE i.status != 'finish' AND i.changeNote = 'request' AND i.cancel != TRUE")
	Page<InvoiceHeader> getInvoiceHeadersRequestCancel(Pageable pageable);

	@Query( value = "SELECT i FROM InvoiceHeader i WHERE i.customerId = :id ORDER BY i.createDate DESC")
	Page<InvoiceHeader> getInvoiceHeadersByCustomer(@Param("id") Long id, Pageable pageable);

	@Query( value = "SELECT i FROM InvoiceHeader i WHERE (i.destinationOfficeId = :id "
				  + " AND ((:status = '' AND (i.status = 'transporting' OR i.status = 'delivering')) OR i.status = :status) AND i.cancel != TRUE "
				  + " AND (:invNo = '' OR i.invoiceNo like CONCAT('%', :invNo, '%'))) "
				  + " OR  (i.officeId = :id "
				  + " AND ((:status = '' AND i.status = 'collected') OR i.status = :status) "
				  + " AND (:invNo = '' OR i.invoiceNo like CONCAT('%', :invNo, '%'))) "
				  + " ORDER BY i.dueDate ASC")
	Page<InvoiceHeader> getImportPackageByOfficeId(@Param("id") Long id,@Param("invNo") String invNo, @Param("status") String status, Pageable pageable);

	@Query( value = "SELECT i FROM InvoiceHeader i WHERE (i.destinationOfficeId = :id "
			  	  + " AND ((:status = '' AND i.status = 'last_import') OR i.status = :status) AND i.cancel != TRUE "
				  + " AND (:invNo = '' OR i.invoiceNo like CONCAT('%', :invNo, '%')))"
				  + " OR  (i.officeId = :id "
				  + " AND ((:status = '' AND i.status = 'first_import') OR i.status = :status) "
				  + " AND (:invNo = '' OR i.invoiceNo like CONCAT('%', :invNo, '%'))) "
				  + " ORDER BY i.dueDate ASC")
	Page<InvoiceHeader> getExportPackageByOfficeId(@Param("id") Long id,@Param("invNo") String invNo, @Param("status") String status, Pageable pageable);

}
