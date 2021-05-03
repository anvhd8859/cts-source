package com.fu.capstone.service;

import com.fu.capstone.service.dto.EmployeeShiftDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing EmployeeShift.
 */
public interface EmployeeShiftService {

    /**
     * Save a employeeShift.
     *
     * @param employeeShiftDTO the entity to save
     * @return the persisted entity
     */
    EmployeeShiftDTO save(EmployeeShiftDTO employeeShiftDTO);

    /**
     * Get all the employeeShifts.
     *
     * @return the list of entities
}
