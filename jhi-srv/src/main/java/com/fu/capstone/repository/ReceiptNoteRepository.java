package com.fu.capstone.repository;

import com.fu.capstone.domain.ReceiptNote;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReceiptNote entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceiptNoteRepository extends JpaRepository<ReceiptNote, Long> {

}
