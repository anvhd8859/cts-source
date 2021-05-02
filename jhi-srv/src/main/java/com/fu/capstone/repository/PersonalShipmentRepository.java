package com.fu.capstone.repository;

import com.fu.capstone.domain.PersonalShipment;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PersonalShipment entity.
 */
@Repository
public interface PersonalShipmentRepository extends JpaRepository<PersonalShipment, Long> {

	// START TuyenVNT 
	@Query( value="SELECT * FROM personal_shipment WHERE invoice_header_id = :invoiceHeaderId",
			countQuery = "SELECT count(*) FROM personal_shipment WHERE invoice_header_id = :invoiceHeaderId", 
			nativeQuery = true)
	Page<PersonalShipment> getPersonalShipmentByHeaderId(@Param("invoiceHeaderId") Long id,Pageable pageable);

	@Query( value="SELECT * FROM personal_shipment WHERE employee_id is null",
			countQuery = "SELECT count(*) FROM personal_shipment WHERE employee_id is null", 
			nativeQuery = true)
	Page<PersonalShipment> getPersonalShipmentNotAssigned(Pageable pageable);
	// END TuyenVNT 


    // new code DongPH
	@Query( value = "SELECT p FROM PersonalShipment p WHERE p.invoiceHeaderId = :invoiceId")
	List<PersonalShipment> getShipmentByInvoice(@Param("invoiceId") Long id);

	@Query(value = "SELECT ps.* FROM personal_shipment ps, invoice_header i "
				 + " WHERE i.id = ps.invoice_header_id AND ps.employee_id = :id "
				 + " AND ps.status <> 'finish' "
				 + " AND ps.shipment_type = :type AND (:status = '' OR i.status = :status) "
				 + " AND (:invNo = '' OR i.invoice_no like CONCAT('%', :invNo , '%')) "
				 + " AND (:from = '' OR i.due_date >= CONCAT(:from , ' 00:00:00')) "
				 + " AND (:to = '' OR i.due_date <= CONCAT(:to , ' 00:00:00')) "
				 + " ORDER BY i.due_date",
			countQuery = "SELECT COUNT(*) FROM personal_shipment ps, invoice_header i"
					   + " WHERE i.id = ps.invoice_header_id AND ps.employee_id = :id "
					   + " AND ps.status <> 'finish' "
					   + " AND ps.shipment_type = :type AND (:status = '' OR i.status = :status) "
					   + " AND (:invNo = '' OR i.invoice_no like CONCAT('%', :invNo , '%')) "
					   + " AND (:from = '' OR i.due_date >= CONCAT(:from , ' 00:00:00')) "
					   + " AND (:to = '' OR i.due_date <= CONCAT(:to , ' 23:59:59')) "
					   + " ORDER BY i.due_date",
			nativeQuery = true)
	Page<PersonalShipment> getPersonalShipmentByShipper(@Param("id") Long id, 
			@Param("invNo") String invNo, @Param("status") String status, @Param("type") String type,
			@Param("from") String from, @Param("to") String to, Pageable pageable);

	@Query( value = "SELECT p FROM PersonalShipment p WHERE p.invoiceHeaderId = :id AND p.shipmentType = 'delivery'")
	PersonalShipment getDeliveryShipmentByHeaderId(@Param("id") Long id);

	@Query( value = "SELECT p FROM PersonalShipment p, InvoiceHeader i WHERE p.invoiceHeaderId = i.id "
				  + " AND (:empId is NULL OR p.employeeId = :empId) "
				  + " AND (:invNo = '' OR i.invoiceNo like CONCAT('%', :invNo , '%')) "
				  + " AND (:strId is NULL OR (i.startStreetId = :strId AND p.shipmentType = 'collect') OR (i.destinationStreetId = :strId AND p.shipmentType = 'delivery')) "
				  + " AND (:type = '' OR :type = p.shipmentType) ")
	Page<PersonalShipment> getAllPersonaShipmentInvoices(@Param("empId") Long empId
    		,@Param("invNo") String invNo, @Param("strId") Long strId, @Param("type") String type, Pageable pageable);

	@Query( value = "SELECT p FROM PersonalShipment p WHERE p.invoiceHeaderId = :id AND p.shipmentType = 'delivery'")
	PersonalShipment getDeliveryShipmentByInvoice(@Param("id") Long id);

	@Query( value = "SELECT p FROM PersonalShipment p WHERE p.invoiceHeaderId = :id AND p.shipmentType = 'collect'")
	PersonalShipment getCollectShipmentByInvoice(@Param("id") Long invoiceHeaderId);

	@Query( value = "SELECT DISTINCT p FROM PersonalShipment p, RequestDetails r "
				  + " WHERE p.id = r.shipmentId AND r.ieWarehouseId = :id ")
	List<PersonalShipment> getPersonalShipmentByRequestId(@Param("id") Long id);

}
