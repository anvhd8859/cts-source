package com.fu.capstone.service.impl;

import com.fu.capstone.service.EmployeeShiftService;
import com.fu.capstone.domain.EmployeeShift;
import com.fu.capstone.repository.EmployeeShiftRepository;
import com.fu.capstone.service.dto.EmployeeShiftDTO;
import com.fu.capstone.service.mapper.EmployeeShiftMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing EmployeeShift.
 */
@Service
@Transactional
public class EmployeeShiftServiceImpl implements EmployeeShiftService {

    private final Logger log = LoggerFactory.getLogger(EmployeeShiftServiceImpl.class);

    private EmployeeShiftRepository employeeShiftRepository;

    private EmployeeShiftMapper employeeShiftMapper;

    public EmployeeShiftServiceImpl(EmployeeShiftRepository employeeShiftRepository, EmployeeShiftMapper employeeShiftMapper) {
        this.employeeShiftRepository = employeeShiftRepository;
        this.employeeShiftMapper = employeeShiftMapper;
    }

    /**
     * Save a employeeShift.
     *
     * @param employeeShiftDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EmployeeShiftDTO save(EmployeeShiftDTO employeeShiftDTO) {
        log.debug("Request to save EmployeeShift : {}", employeeShiftDTO);

        EmployeeShift employeeShift = employeeShiftMapper.toEntity(employeeShiftDTO);
        employeeShift = employeeShiftRepository.save(employeeShift);
        return employeeShiftMapper.toDto(employeeShift);
    }

    /**
     * Get all the employeeShifts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<EmployeeShiftDTO> findAll() {
        log.debug("Request to get all EmployeeShifts");
        return employeeShiftRepository.findAll().stream()
            .map(employeeShiftMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one employeeShift by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<EmployeeShiftDTO> findOne(Long id) {
        log.debug("Request to get EmployeeShift : {}", id);
        return employeeShiftRepository.findById(id)
            .map(employeeShiftMapper::toDto);
    }

    /**
     * Delete the employeeShift by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EmployeeShift : {}", id);
        employeeShiftRepository.deleteById(id);
    }
}
