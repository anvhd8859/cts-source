package com.fu.capstone.repository;

import com.fu.capstone.domain.ReceiptNote;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReceiptNote entity.
 */
@Repository
public interface ReceiptNoteRepository extends JpaRepository<ReceiptNote, Long> {

	@Query( value = " SELECT r FROM ReceiptNote r WHERE r.invoiceHeaderId = :id ")
	Optional<ReceiptNote> getReceiptNoteByHeaderId(@Param("id") Long id);

}
