package com.fu.capstone.repository;

import com.fu.capstone.domain.InvoicePackage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InvoicePackage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoicePackageRepository extends JpaRepository<InvoicePackage, Long> {

}
