package com.fu.capstone.service;

import com.fu.capstone.service.dto.TransferPackingDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TransferPacking.
 */
public interface TransferPackingService {

    /**
     * Save a transferPacking.
     *
     * @param transferPackingDTO the entity to save
     * @return the persisted entity
     */
    TransferPackingDTO save(TransferPackingDTO transferPackingDTO);

    /**
     * Get all the transferPackings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TransferPackingDTO> findAll(Pageable pageable);


    /**
     * Get the "id" transferPacking.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TransferPackingDTO> findOne(Long id);

    /**
     * Delete the "id" transferPacking.
     *
     * @param id the id of the entity
     */
    void delete(Long id);


    // AnhVD new code

	List<TransferPackingDTO> getTransferPackingByInvoiceHeaderId(Long id);
}
