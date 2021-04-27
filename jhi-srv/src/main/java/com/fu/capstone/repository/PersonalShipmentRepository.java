package com.fu.capstone.repository;

import com.fu.capstone.domain.PersonalShipment;

import java.util.Optional;
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
				 + " AND (:type = '' OR ps.shipment_type = :type) "
				 + " AND (:invNo = '' OR i.invoice_no like CONCAT('%', :invNo , '%')) ",
			countQuery = "SELECT COUNT(*) FROM personal_shipment ps, invoice_header i"
					   + " WHERE i.id = ps.invoice_header_id AND ps.employee_id = :id "
					   + " AND ps.status <> 'finish' "
					   + " AND (:type = '' OR ps.shipment_type = :type) "
					   + " AND (:invNo = '' OR i.invoice_no like CONCAT('%', :invNo , '%')) ",
			nativeQuery = true)
	Page<PersonalShipment> getPersonalShipmentByShipper(@Param("id") Long id, 
			@Param("invNo") String invNo, @Param("type") String type, Pageable pageable);

}
