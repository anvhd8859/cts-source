package com.fu.capstone.repository;

import com.fu.capstone.domain.InvoiceDetails;
import com.fu.capstone.service.dto.InvoiceDetailsDTO;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InvoiceDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceDetailsRepository extends JpaRepository<InvoiceDetails, Long> {

	@Query( value = "SELECT i FROM InvoiceDetails i WHERE i.invoiceHeaderId = :invoiceHeaderId")
	List<InvoiceDetails> getInvoiceDetailsByHeaderId(@Param("invoiceHeaderId") Long id);
	
}
