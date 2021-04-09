package com.fu.capstone.repository;

import com.fu.capstone.domain.InvoiceDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InvoiceDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceDetailsRepository extends JpaRepository<InvoiceDetails, Long> {

}
