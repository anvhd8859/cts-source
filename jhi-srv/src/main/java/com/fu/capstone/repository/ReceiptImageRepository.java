package com.fu.capstone.repository;

import com.fu.capstone.domain.ReceiptImage;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReceiptImage entity.
 */
@Repository
public interface ReceiptImageRepository extends JpaRepository<ReceiptImage, Long> {

	@Query(value = "SELECT i FROM ReceiptImage i WHERE i.receiptNoteId = :id")
	ReceiptImage getImageByNoteId(@Param("id") Long id);

}
