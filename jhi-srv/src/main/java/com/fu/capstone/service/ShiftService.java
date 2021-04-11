package com.fu.capstone.service;

import com.fu.capstone.service.dto.ShiftDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Shift.
 */
public interface ShiftService {

    /**
     * Save a shift.
     *
     * @param shiftDTO the entity to save
     * @return the persisted entity
     */
    ShiftDTO save(ShiftDTO shiftDTO);

    /**
     * Get all the shifts.
     *
     * @return the list of entities
     */
    List<ShiftDTO> findAll();


    /**
     * Get the "id" shift.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ShiftDTO> findOne(Long id);

    /**
     * Delete the "id" shift.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
