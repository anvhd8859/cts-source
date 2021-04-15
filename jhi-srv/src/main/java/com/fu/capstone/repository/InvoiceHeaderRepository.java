package com.fu.capstone.repository;

import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;

import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * Spring Data  repository for the InvoiceHeader entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceHeaderRepository extends JpaRepository<InvoiceHeader, Long> {

	@Query(	  value = "SELECT i FROM InvoiceHeader i "
					+ " WHERE ( :invoiceNo = '' OR i.invoiceNo = :invoiceNo ) "
					+ " AND ( :status = '' OR i.status = :status ) "
					+ " AND ( :receiveDate IS NULL OR i.receiveDate = :receiveDate ) "
					+ " AND ( :createDate IS NULL OR i.createDate = :createDate ) "
					+ " AND ( :updateDate IS NULL OR i.updateDate = :updateDate ) ")
	Page<InvoiceHeader> getInvoiceHeadersByParams(
			@RequestParam("invoiceNo") String invoiceNo, @RequestParam("status") String status,
    		@RequestParam("receiveDate") Instant receiveDate, @RequestParam("createDate") Instant createDate, 
    		@RequestParam("updateDate") Instant updateDate, Pageable pageable);

}
