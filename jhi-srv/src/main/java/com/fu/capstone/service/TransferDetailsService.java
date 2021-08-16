package com.fu.capstone.service;

import com.fu.capstone.service.dto.TransferDetailsDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing TransferDetails.
 */
public interface TransferDetailsService {

    /**
     * Save a transferDetails.
     *
     * @param transferDetailsDTO the entity to save
     * @return the persisted entity
     */
    TransferDetailsDTO save(TransferDetailsDTO transferDetailsDTO);

    /**
     * Get all the transferDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TransferDetailsDTO> findAll(Pageable pageable);


    /**
     * Get the "id" transferDetails.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TransferDetailsDTO> findOne(Long id);

    /**
     * Delete the "id" transferDetails.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
