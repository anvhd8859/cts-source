package com.fu.capstone.repository;

import com.fu.capstone.domain.TransferPacking;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransferPacking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransferPackingRepository extends JpaRepository<TransferPacking, Long> {

	@Query( value = "SELECT t FROM TransferPacking t WHERE t.invoiceHeaderId = :invoiceHeaderId")
	List<TransferPacking> getTransferPackingByInvoiceHeaderId(@Param("invoiceHeaderId") Long id);
	
}
