package com.fu.capstone.service.impl;

import com.fu.capstone.service.ShiftService;
import com.fu.capstone.domain.Shift;
import com.fu.capstone.repository.ShiftRepository;
import com.fu.capstone.service.dto.ShiftDTO;
import com.fu.capstone.service.mapper.ShiftMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Shift.
 */
@Service
@Transactional
public class ShiftServiceImpl implements ShiftService {

    private final Logger log = LoggerFactory.getLogger(ShiftServiceImpl.class);

    private ShiftRepository shiftRepository;

    private ShiftMapper shiftMapper;

    public ShiftServiceImpl(ShiftRepository shiftRepository, ShiftMapper shiftMapper) {
        this.shiftRepository = shiftRepository;
        this.shiftMapper = shiftMapper;
    }

    /**
     * Save a shift.
     *
     * @param shiftDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ShiftDTO save(ShiftDTO shiftDTO) {
        log.debug("Request to save Shift : {}", shiftDTO);

        Shift shift = shiftMapper.toEntity(shiftDTO);
        shift = shiftRepository.save(shift);
        return shiftMapper.toDto(shift);
    }

    /**
     * Get all the shifts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ShiftDTO> findAll() {
        log.debug("Request to get all Shifts");
        return shiftRepository.findAll().stream()
            .map(shiftMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one shift by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ShiftDTO> findOne(Long id) {
        log.debug("Request to get Shift : {}", id);
        return shiftRepository.findById(id)
            .map(shiftMapper::toDto);
    }

    /**
     * Delete the shift by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Shift : {}", id);
        shiftRepository.deleteById(id);
    }
}
