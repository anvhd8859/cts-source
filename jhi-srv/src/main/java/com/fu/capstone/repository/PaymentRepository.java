package com.fu.capstone.repository;

import com.fu.capstone.domain.Payment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Payment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

	// START TuyenVNT 14/04/2021
	@Query( value="SELECT * FROM payment WHERE invoice_header_id = :invoiceHeaderId"
			countQuery = "SELECT count(*) FROM payment WHERE invoice_header_id = :invoiceHeaderId", 
			nativeQuery = true)
	Page<Payment> getPaymentByHeaderId(@Param("invoiceHeaderId") Long id,Pageable pageable);
	// END TuyenVNT 16/04/2021
}
