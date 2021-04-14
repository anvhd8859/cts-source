package com.fu.capstone.service.impl;

import com.fu.capstone.service.PersonalShipmentService;
import com.fu.capstone.domain.PersonalShipment;
import com.fu.capstone.repository.PersonalShipmentRepository;
import com.fu.capstone.service.dto.PersonalShipmentDTO;
import com.fu.capstone.service.mapper.PersonalShipmentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing PersonalShipment.
 */
@Service
@Transactional
public class PersonalShipmentServiceImpl implements PersonalShipmentService {

    private final Logger log = LoggerFactory.getLogger(PersonalShipmentServiceImpl.class);

    private PersonalShipmentRepository personalShipmentRepository;

    private PersonalShipmentMapper personalShipmentMapper;

    public PersonalShipmentServiceImpl(PersonalShipmentRepository personalShipmentRepository, PersonalShipmentMapper personalShipmentMapper) {
        this.personalShipmentRepository = personalShipmentRepository;
        this.personalShipmentMapper = personalShipmentMapper;
    }

    /**
     * Save a personalShipment.
     *
     * @param personalShipmentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PersonalShipmentDTO save(PersonalShipmentDTO personalShipmentDTO) {
        log.debug("Request to save PersonalShipment : {}", personalShipmentDTO);

        PersonalShipment personalShipment = personalShipmentMapper.toEntity(personalShipmentDTO);
        personalShipment = personalShipmentRepository.save(personalShipment);
        return personalShipmentMapper.toDto(personalShipment);
    }

    /**
     * Get all the personalShipments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PersonalShipmentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PersonalShipments");
        return personalShipmentRepository.findAll(pageable)
            .map(personalShipmentMapper::toDto);
    }


    /**
     * Get one personalShipment by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PersonalShipmentDTO> findOne(Long id) {
        log.debug("Request to get PersonalShipment : {}", id);
        return personalShipmentRepository.findById(id)
            .map(personalShipmentMapper::toDto);
    }

    /**
     * Delete the personalShipment by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PersonalShipment : {}", id);
        personalShipmentRepository.deleteById(id);
    }
}
