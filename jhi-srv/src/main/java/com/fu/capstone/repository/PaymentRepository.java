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
	@Query( value="SELECT p FROM Payment p WHERE p.invoiceHeaderId = :invoiceHeaderId"
			countQuery = "SELECT count(p) FROM Payment p WHERE p.invoiceHeaderId = :invoiceHeaderId", 
			nativeQuery = true)
	List<Payment> getPaymentByHeaderId(@Param("invoiceHeaderId") Long id);
	// END TuyenVNT 14/04/2021
}
