package com.fu.capstone.service;

import com.fu.capstone.service.dto.InvoiceHeaderDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing InvoiceHeader.
 */
public interface InvoiceHeaderService {

    /**
     * Save a invoiceHeader.
     *
     * @param invoiceHeaderDTO the entity to save
     * @return the persisted entity
     */
    InvoiceHeaderDTO save(InvoiceHeaderDTO invoiceHeaderDTO);

    /**
     * Get all the invoiceHeaders.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<InvoiceHeaderDTO> findAll(Pageable pageable);


    /**
     * Get the "id" invoiceHeader.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<InvoiceHeaderDTO> findOne(Long id);

    /**
     * Delete the "id" invoiceHeader.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
