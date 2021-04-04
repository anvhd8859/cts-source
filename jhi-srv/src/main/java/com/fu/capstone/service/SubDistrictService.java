package com.fu.capstone.service;

import com.fu.capstone.service.dto.SubDistrictDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing SubDistrict.
 */
public interface SubDistrictService {

    /**
     * Save a subDistrict.
     *
     * @param subDistrictDTO the entity to save
     * @return the persisted entity
     */
    SubDistrictDTO save(SubDistrictDTO subDistrictDTO);

    /**
     * Get all the subDistricts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SubDistrictDTO> findAll(Pageable pageable);


    /**
     * Get the "id" subDistrict.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SubDistrictDTO> findOne(Long id);

    /**
     * Delete the "id" subDistrict.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

	List<SubDistrictDTO> getAllSubDistrictsByDistrictId(Long id);
}
