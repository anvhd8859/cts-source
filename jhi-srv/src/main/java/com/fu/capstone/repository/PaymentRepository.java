package com.fu.capstone.repository;

import com.fu.capstone.domain.Payment;
import com.fu.capstone.service.dto.PaymentDTO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Payment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

	// START TuyenVNT 14/04/2021
	@Query( value="SELECT * FROM payment WHERE invoice_header_id = :invoiceHeaderId",
			nativeQuery = true)
	List<Payment> getPaymentByHeaderId(@Param("invoiceHeaderId") Long id,Pageable pageable);
	// END TuyenVNT 16/04/2021

	@Query(value = "SELECT p FROM Payment p, InvoiceHeader i, ReceiptNote r "
				 + " WHERE i.id = p.invoiceHeaderId AND i.id = r.invoiceHeaderId"
				 + " AND (:invoiceNo = '' OR i.invoiceNo LIKE CONCAT('%',:invoiceNo,'%')) "
				 + " AND (r.receiptType = :type OR :type IS NULL) "
				 + " AND (:receiveFrom = '' OR p.createDate >= CONCAT(:receiveFrom, ' 00:00:00')) "
				 + " AND (:receiveTo = '' OR p.createDate <= CONCAT(:receiveTo, ' 23:59:59'))  "
				 + " AND (:createFrom = '' OR i.createDate >= CONCAT(:createFrom, ' 00:00:00')) "
				 + " AND (:createTo = '' OR i.createDate <= CONCAT(:createTo, ' 23:59:59'))  ")
	Page<Payment> getPaymentInvoceByParams(@Param("invoiceNo") String invoiceNo,
			@Param("type") Boolean type, @Param("receiveFrom") String receiveFrom,
			@Param("receiveTo") String receiveTo, @Param("createFrom") String createFrom,
			@Param("createTo") String createTo, Pageable pageable);
}
