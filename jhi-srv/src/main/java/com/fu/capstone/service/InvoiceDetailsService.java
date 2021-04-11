package com.fu.capstone.service;

import com.fu.capstone.service.dto.InvoiceDetailsDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing InvoiceDetails.
 */
public interface InvoiceDetailsService {

    /**
     * Save a invoiceDetails.
     *
     * @param invoiceDetailsDTO the entity to save
     * @return the persisted entity
     */
    InvoiceDetailsDTO save(InvoiceDetailsDTO invoiceDetailsDTO);

    /**
     * Get all the invoiceDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<InvoiceDetailsDTO> findAll(Pageable pageable);


    /**
     * Get the "id" invoiceDetails.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<InvoiceDetailsDTO> findOne(Long id);

    /**
     * Delete the "id" invoiceDetails.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    // AnhVD new code
	List<InvoiceDetailsDTO> getInvoiceDetailsByHeaderId(Long id);
}
