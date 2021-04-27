package com.fu.capstone.service.impl;

import com.fu.capstone.service.StreetService;
import com.fu.capstone.domain.Street;
import com.fu.capstone.repository.StreetRepository;
import com.fu.capstone.service.dto.StreetDTO;
import com.fu.capstone.service.mapper.StreetMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Street.
 */
@Service
@Transactional
public class StreetServiceImpl implements StreetService {

    private final Logger log = LoggerFactory.getLogger(StreetServiceImpl.class);

    private StreetRepository streetRepository;

    private StreetMapper streetMapper;

    public StreetServiceImpl(StreetRepository streetRepository, StreetMapper streetMapper) {
        this.streetRepository = streetRepository;
        this.streetMapper = streetMapper;
    }

    /**
     * Save a street.
     *
     * @param streetDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public StreetDTO save(StreetDTO streetDTO) {
        log.debug("Request to save Street : {}", streetDTO);

        Street street = streetMapper.toEntity(streetDTO);
        street = streetRepository.save(street);
        return streetMapper.toDto(street);
    }

    /**
     * Get all the streets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StreetDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Streets");
        return streetRepository.findAll(pageable)
            .map(streetMapper::toDto);
    }


    /**
     * Get one street by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StreetDTO> findOne(Long id) {
        log.debug("Request to get Street : {}", id);
        return streetRepository.findById(id)
            .map(streetMapper::toDto);
    }

    /**
     * Delete the street by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Street : {}", id);
        streetRepository.deleteById(id);
    }

    // AnhVD new code
	@Override
	public Page<StreetDTO> getAllStreetsBySubDistrictId(Long id, Pageable pageable) {
		return streetRepository.getAllStreetsBySubDistrictId(id, pageable)
				.map(streetMapper::toDto);
	}

	@Override
	public Street getFullAddressByStreetId(Long id) {
		return streetRepository.getFullAddressByStreetId(id);
	}
}
