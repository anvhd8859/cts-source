package com.fu.capstone.repository;

import com.fu.capstone.domain.InvoicePackage;
import com.fu.capstone.service.dto.InvoicePackageDTO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InvoicePackage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoicePackageRepository extends JpaRepository<InvoicePackage, Long> {

	@Query(value="SELECT p FROM InvoicePackage p WHERE p.invoiceHeaderId = :invoiceHeaderId")
	List<InvoicePackage> getInvoicePackageByHeaderId(@Param("invoiceHeaderId") Long id);

}
