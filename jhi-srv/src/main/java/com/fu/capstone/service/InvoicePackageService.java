package com.fu.capstone.service;

import com.fu.capstone.service.dto.InvoicePackageDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing InvoicePackage.
 */
public interface InvoicePackageService {

    /**
     * Save a invoicePackage.
     *
     * @param invoicePackageDTO the entity to save
     * @return the persisted entity
     */
    InvoicePackageDTO save(InvoicePackageDTO invoicePackageDTO);

    /**
     * Get all the invoicePackages.
     *
     * @return the list of entities
     */
    List<InvoicePackageDTO> findAll();


    /**
     * Get the "id" invoicePackage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<InvoicePackageDTO> findOne(Long id);

    /**
     * Delete the "id" invoicePackage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
