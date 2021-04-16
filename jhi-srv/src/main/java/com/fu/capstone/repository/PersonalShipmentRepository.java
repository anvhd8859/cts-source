package com.fu.capstone.repository;

import com.fu.capstone.domain.PersonalShipment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PersonalShipment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonalShipmentRepository extends JpaRepository<PersonalShipment, Long> {

	// START TuyenVNT 14/04/2021
	@Query( value="SELECT * FROM personal_shipment WHERE invoice_header_id = :invoiceHeaderId",
			countQuery = "SELECT count(p) FROM PersonalShipment p WHERE p.invoiceHeaderId = :invoiceHeaderId", 
			nativeQuery = true)
	Page<PersonalShipment> getPersonalShipmentByHeaderId(@Param("invoiceHeaderId") Long id,Pageable pageable);
	// END TuyenVNT 16/04/2021
}
