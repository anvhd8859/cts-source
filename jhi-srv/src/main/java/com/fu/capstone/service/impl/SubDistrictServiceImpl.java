package com.fu.capstone.service.impl;

import com.fu.capstone.service.SubDistrictService;
import com.fu.capstone.domain.SubDistrict;
import com.fu.capstone.repository.SubDistrictRepository;
import com.fu.capstone.service.dto.SubDistrictDTO;
import com.fu.capstone.service.mapper.SubDistrictMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing SubDistrict.
 */
@Service
@Transactional
public class SubDistrictServiceImpl implements SubDistrictService {

    private final Logger log = LoggerFactory.getLogger(SubDistrictServiceImpl.class);

    private SubDistrictRepository subDistrictRepository;

    private SubDistrictMapper subDistrictMapper;

    public SubDistrictServiceImpl(SubDistrictRepository subDistrictRepository, SubDistrictMapper subDistrictMapper) {
        this.subDistrictRepository = subDistrictRepository;
        this.subDistrictMapper = subDistrictMapper;
    }

    /**
     * Save a subDistrict.
     *
     * @param subDistrictDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SubDistrictDTO save(SubDistrictDTO subDistrictDTO) {
        log.debug("Request to save SubDistrict : {}", subDistrictDTO);

        SubDistrict subDistrict = subDistrictMapper.toEntity(subDistrictDTO);
        subDistrict = subDistrictRepository.save(subDistrict);
        return subDistrictMapper.toDto(subDistrict);
    }

    /**
     * Get all the subDistricts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SubDistrictDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SubDistricts");
        return subDistrictRepository.getAll(pageable)
            .map(subDistrictMapper::toDto);
    }


    /**
     * Get one subDistrict by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SubDistrictDTO> findOne(Long id) {
        log.debug("Request to get SubDistrict : {}", id);
        return subDistrictRepository.findById(id)
            .map(subDistrictMapper::toDto);
    }

    /**
     * Delete the subDistrict by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SubDistrict : {}", id);
        subDistrictRepository.deleteById(id);
    }

	@Override
	public List<SubDistrictDTO> getAllSubDistrictsByDistrictId(Long id) {
		return subDistrictMapper.toDto(subDistrictRepository.getAllSubDistrictsByDistrictId(id));
	}
}
