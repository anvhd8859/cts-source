package com.fu.capstone.repository;

import com.fu.capstone.domain.InvoiceHeader;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InvoiceHeader entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceHeaderRepository extends JpaRepository<InvoiceHeader, Long> {

}
