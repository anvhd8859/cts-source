package com.fu.capstone.repository;

import com.fu.capstone.domain.PersonalShipment;
import com.fu.capstone.service.dto.PersonalShipmentDTO;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PersonalShipment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonalShipmentRepository extends JpaRepository<PersonalShipment, Long> {

	// START TuyenVNT 14/04/2021
	@Query( value="SELECT * FROM personal_shipment WHERE invoice_header_id = :invoiceHeaderId",
			countQuery = "SELECT count(*) FROM personal_shipment WHERE invoice_header_id = :invoiceHeaderId", 
			nativeQuery = true)
	Page<PersonalShipment> getPersonalShipmentByHeaderId(@Param("invoiceHeaderId") Long id,Pageable pageable);
	// END TuyenVNT 16/04/2021
	
	// START TuyenVNT 16/04/2021
	@Query( value="SELECT * FROM personal_shipment WHERE employee_id is null",
			countQuery = "SELECT count(*) FROM personal_shipment WHERE employee_id is null", 
			nativeQuery = true)
	Page<PersonalShipment> getPersonalShipmentNotAssigned(Pageable pageable);
	// END TuyenVNT 16/04/2021
}
