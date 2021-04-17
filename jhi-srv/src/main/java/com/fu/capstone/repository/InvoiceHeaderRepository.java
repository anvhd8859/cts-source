package com.fu.capstone.repository;

import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;

import java.time.Instant;

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

	
	@Query( value = "SELECT i.* FROM invoice_header i, personal_shipment ps, employee e, person p "
				  + " WHERE i.id = ps.invoice_header_id AND ps.employee_id = e.id AND e.person_id = p.id AND p.email = :userName "
				  + " AND ps.status <> 'finish' AND (ps.shipment_type = '' OR ps.shipment_type = :type) ",
				  nativeQuery = true)
	Page<InvoiceHeader> getInvoiceHeadersByShipperId (@Param("userName") String userName, @Param("type")  String type, Pageable pageable );

}
