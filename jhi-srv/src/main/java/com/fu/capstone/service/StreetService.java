package com.fu.capstone.service;

import com.fu.capstone.domain.Street;
import com.fu.capstone.service.dto.StreetDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Street.
 */
public interface StreetService {

    /**
     * Save a street.
     *
     * @param streetDTO the entity to save
     * @return the persisted entity
     */
    StreetDTO save(StreetDTO streetDTO);

    /**
     * Get all the streets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<StreetDTO> findAll(Pageable pageable);


    /**
     * Get the "id" street.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<StreetDTO> findOne(Long id);

    /**
     * Delete the "id" street.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
    
    // AnhVD new code
    Page<StreetDTO> getAllStreetsBySubDistrictId(Long id, Pageable pageable);

	Optional<Street> getFullAddressByStreetId(Long id);
}
