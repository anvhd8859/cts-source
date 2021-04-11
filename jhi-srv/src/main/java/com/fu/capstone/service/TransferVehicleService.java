package com.fu.capstone.service;

import com.fu.capstone.service.dto.TransferVehicleDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing TransferVehicle.
 */
public interface TransferVehicleService {

    /**
     * Save a transferVehicle.
     *
     * @param transferVehicleDTO the entity to save
     * @return the persisted entity
     */
    TransferVehicleDTO save(TransferVehicleDTO transferVehicleDTO);

    /**
     * Get all the transferVehicles.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TransferVehicleDTO> findAll(Pageable pageable);


    /**
     * Get the "id" transferVehicle.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TransferVehicleDTO> findOne(Long id);

    /**
     * Delete the "id" transferVehicle.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
