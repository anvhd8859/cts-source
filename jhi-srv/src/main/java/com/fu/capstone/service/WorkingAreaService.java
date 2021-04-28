package com.fu.capstone.service;

import com.fu.capstone.service.dto.WorkingAreaDTO;
import com.fu.capstone.service.dto.WorkingAreaStreetDTO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing WorkingArea.
 */
public interface WorkingAreaService {

    /**
     * Save a workingArea.
     *
     * @param workingAreaDTO the entity to save
     * @return the persisted entity
     */
    WorkingAreaDTO save(WorkingAreaDTO workingAreaDTO);

    /**
     * Get all the workingAreas.
     *
     * @return the list of entities
     */
    List<WorkingAreaDTO> findAll();


    /**
     * Get the "id" workingArea.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<WorkingAreaDTO> findOne(Long id);

    /**
     * Delete the "id" workingArea.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

	Page<WorkingAreaStreetDTO> getWorkingAreaByFilter(Long sid, Long eid, Pageable pageable);
}
