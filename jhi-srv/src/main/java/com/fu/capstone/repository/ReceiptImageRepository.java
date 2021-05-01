package com.fu.capstone.repository;

import com.fu.capstone.domain.ReceiptImage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReceiptImage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceiptImageRepository extends JpaRepository<ReceiptImage, Long> {

}
