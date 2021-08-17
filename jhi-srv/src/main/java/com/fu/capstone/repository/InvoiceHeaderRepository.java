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
 * Spring Data repository for the InvoiceHeader entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceHeaderRepository extends JpaRepository<InvoiceHeader, Long> {

	@Query(value = "SELECT i FROM InvoiceHeader i "
			+ " WHERE ( :invoiceNo = '' OR i.invoiceNo like CONCAT('%', :invoiceNo, '%') ) "
			+ " AND ( :status = '' OR i.status = :status ) "
			+ " AND ( :receiveDate = '' OR i.reviewDate BETWEEN CONCAT(:receiveDate, ' 00:00:00') AND CONCAT(:receiveDate,' 23:59:59')  ) "
			+ " AND ( :createDate = ''  OR i.createDate  BETWEEN CONCAT(:createDate, ' 00:00:00')  AND CONCAT(:createDate, ' 23:59:59')  ) "
			+ " AND ( :updateDate = ''  OR i.updateDate  BETWEEN CONCAT(:updateDate, ' 00:00:00')  AND CONCAT(:updateDate, ' 23:59:59')  ) ")
	Page<InvoiceHeader> getInvoiceHeadersByParams(@RequestParam("invoiceNo") String invoiceNo,
			@RequestParam("status") String status, @RequestParam("receiveDate") String receiveDate,
			@RequestParam("createDate") String createDate, @RequestParam("updateDate") String updateDate,
			Pageable pageable);

	@Query(value = "SELECT i.* FROM invoice_header i, personal_shipment ps "
			+ " WHERE i.id = ps.invoice_header_id AND ps.employee_id = :id "
			+ " AND (ps.status <> 'finish' OR i.jhi_cancel <> 'true') "
			+ " AND (:type = '' OR ps.shipment_type = :type) "
			+ " AND (:invNo = '' OR i.invoice_no like CONCAT('%', :invNo , '%')) ",
			countQuery = "SELECT COUNT(*) FROM invoice_header i, personal_shipment ps, employee e, person p "
					+ " WHERE i.id = ps.invoice_header_id AND ps.employee_id = :id "
					+ " AND (ps.status <> 'finish' OR i.jhi_cancel <> 'true')"
					+ " AND (:type = '' OR ps.shipment_type = :type) "
					+ " AND (:invNo = '' OR i.invoice_no like CONCAT('%', :invNo , '%')) ", nativeQuery = true)
	Page<InvoiceHeader> getInvoiceHeadersByShipper(@Param("id") Long id, @Param("invNo") String invNo,
			@Param("type") String type, Pageable pageable);

	@Query(value = "SELECT i FROM InvoiceHeader i WHERE i.status <> 'finish' AND i.changeNote = 'request' AND i.cancel <> TRUE")
	Page<InvoiceHeader> getInvoiceHeadersRequestCancel(Pageable pageable);

	@Query(value = "SELECT i FROM InvoiceHeader i WHERE i.customerId = :id ORDER BY i.createDate DESC")
	Page<InvoiceHeader> getInvoiceHeadersByCustomer(@Param("id") Long id, Pageable pageable);

	@Query(value = "SELECT i FROM InvoiceHeader i WHERE i.destinationOfficeId = :id "
			+ " AND (i.status = :status) AND i.cancel <> TRUE"
			+ " AND (:fromDate = '' OR i.createDate >= CONCAT(:fromDate , ' 00:00:00')) "
			+ " AND (:toDate = '' OR i.createDate <= CONCAT(:toDate , ' 23:59:59')) "
			+ " AND (:invNo = '' OR i.invoiceNo like CONCAT('%', :invNo, '%'))"
			+ " ORDER BY i.dueDate ASC")
	Page<InvoiceHeader> getImportPackageByOfficeId(@Param("id") Long id, @Param("invNo") String invNo,
			@Param("status") String status, @Param("fromDate") String fromDate,
			@Param("toDate") String toDate, Pageable pageable);

	@Query(value = "SELECT i FROM InvoiceHeader i, InvoicePackage p WHERE i.id = p.invoiceHeaderId"
			+ " AND i.officeId = :id "
			+ " AND i.destinationOfficeId = :tid"
			+ " AND (i.status = :status) "
			+ " AND (:invNo = '' OR i.invoiceNo like CONCAT('%', :invNo, '%')) "
			+ " AND (:fromDate = '' OR i.createDate >= CONCAT(:fromDate , ' 00:00:00')) "
			+ " AND (:toDate = '' OR i.createDate <= CONCAT(:toDate , ' 23:59:59')) "
			+ " ORDER BY i.dueDate ASC")
	Page<InvoiceHeader> getExportPackageByOfficeId(@Param("id") Long id, @Param("tid") Long toOfficeId, @Param("invNo") String invNo,
			@Param("status") String status, @Param("fromDate") String fromDate,
			@Param("toDate") String toDate, Pageable pageable);

	@Query(value = "SELECT i FROM InvoiceHeader i WHERE i.officeId = :id AND i.status = 'waiting' "
			+ " AND ( :invoiceNo = '' OR i.invoiceNo like CONCAT('%', :invoiceNo, '%') ) "
			+ " AND ( :receiveDate = '' OR i.reviewDate BETWEEN CONCAT(:receiveDate, ' 00:00:00') AND CONCAT(:receiveDate,' 23:59:59')  ) "
			+ " AND ( :createDate = ''  OR i.createDate  BETWEEN CONCAT(:createDate, ' 00:00:00')  AND CONCAT(:createDate, ' 23:59:59')  ) "
			+ " AND ( :updateDate = ''  OR i.updateDate  BETWEEN CONCAT(:updateDate, ' 00:00:00')  AND CONCAT(:updateDate, ' 23:59:59')  ) ")
	Page<InvoiceHeader> getInvoiceHeadersWaitingReview(
			@Param("id") Long id, @RequestParam("invoiceNo") String invoiceNo,
			@RequestParam("receiveDate") String receiveDate, @RequestParam("createDate") String createDate,
			@RequestParam("updateDate") String updateDate, Pageable pageable);

	@Query(value = "SELECT i FROM InvoiceHeader i, RequestDetails r, PersonalShipment p "
			+ " WHERE i.id = p.invoiceHeaderId AND p.id = r.invoicePackageId " + " AND r.requestId = :id ")
	List<InvoiceHeader> getInvoiceHeaderByIEID(@Param("id") Long id);

	@Query(value = "SELECT i FROM InvoiceHeader i, PersonalShipment p WHERE i.id = p.invoiceHeaderId "
			+ " AND p.id IN (:list) ")
	List<InvoiceHeader> getInvoiceHeaderByListShipmentId(@Param("list") List<Long> id);

	@Query(value = "SELECT i FROM InvoiceHeader i, Payment p WHERE i.id = p.invoiceHeaderId AND p.id = :id "
			+ " AND (:invoiceNo = '' OR i.invoiceNo LIKE CONCAT('%',:invoiceNo,'%')) "
			+ " AND (:status = '') "
			+ " AND (:receiveFrom = '' OR p.createDate >= CONCAT(:receiveFrom, ' 00:00:00')) "
			+ " AND (:receiveTo = '' OR p.createDate <= CONCAT(:receiveTo, ' 23:59:59'))  "
			+ " AND (:createFrom = '' OR i.createDate >= CONCAT(:createFrom, ' 00:00:00')) "
			+ " AND (:createTo = '' OR i.createDate <= CONCAT(:createTo, ' 23:59:59'))  ")
	Page<InvoiceHeader> getFullInvoiceByPayment(@Param("id") Long id, @Param("invoiceNo") String invoiceNo,
			@Param("status") String status, @Param("receiveFrom") String receiveFrom,
			@Param("receiveTo") String receiveTo,
			@Param("createFrom") String createFrom, @Param("createTo") String createTo, Pageable pageable);

	@Query(value = "SELECT i FROM InvoiceHeader i, PersonalShipment p WHERE i.id = p.invoiceHeaderId AND p.id = :id ")
	InvoiceHeader getInvoiceByShipmentId(@Param("id") Long shipmentId);

	@Query(value = "SELECT i.* FROM invoice_header i "
			+ " WHERE i.employee_id = :id "
			+ " AND i.status = 'received' "
			+ " AND (:invNo = '' OR i.invoice_no like CONCAT('%', :invNo , '%')) "
			+ " AND (:from = '' OR i.review_date >= CONCAT(:from , ' 00:00:00')) "
			+ " AND (:to = '' OR i.review_date <= CONCAT(:to , ' 23:59:59')) "
			+ " ORDER BY i.due_date",
			countQuery = "SELECT COUNT(*) FROM invoice_header i "
					+ " WHERE i.employee_id = :id "
					+ " AND i.status = 'received' "
					+ " AND (:invNo = '' OR i.invoice_no like CONCAT('%', :invNo , '%')) "
					+ " AND (:from = '' OR i.review_date >= CONCAT(:from , ' 00:00:00')) "
					+ " AND (:to = '' OR i.review_date <= CONCAT(:to , ' 23:59:59')) "
					+ " ORDER BY i.due_date",
			nativeQuery = true)
	Page<InvoiceHeader> getImportInvoiceByOfficer(Long id, String invNo, String from, String to, Pageable pageable);

	@Query(value = "SELECT i FROM InvoiceHeader i, TransferDetails t WHERE i.id = t.invoicePackageId "
				 + " AND t.transferId = :id ")
	List<InvoiceHeader> getInvoiceHeaderByTransferId(@Param("id") Long id);

	@Query(value = "SELECT i FROM InvoiceHeader i, InvoicePackage p WHERE i.id = p.invoiceHeaderId AND p.warehouseId = :id ")
	Page<InvoiceHeader> getInvoiceByWarehouse(@Param("id") Long id, Pageable pageable);
}
