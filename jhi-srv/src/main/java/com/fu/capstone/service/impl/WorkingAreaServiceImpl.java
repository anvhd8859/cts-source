package com.fu.capstone.service.impl;

import com.fu.capstone.service.WorkingAreaService;
import com.fu.capstone.repository.StreetRepository;
import com.fu.capstone.domain.WorkingArea;
import com.fu.capstone.repository.WorkingAreaRepository;
import com.fu.capstone.service.dto.WorkingAreaDTO;
import com.fu.capstone.service.dto.WorkingAreaStreetDTO;
import com.fu.capstone.service.mapper.WorkingAreaMapper;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing WorkingArea.
 */
@Service
@Transactional
public class WorkingAreaServiceImpl implements WorkingAreaService {

	private final Logger log = LoggerFactory.getLogger(WorkingAreaServiceImpl.class);

	private WorkingAreaRepository workingAreaRepository;

	private StreetRepository streetRepository;

	private WorkingAreaMapper workingAreaMapper;

	public WorkingAreaServiceImpl(WorkingAreaRepository workingAreaRepository, WorkingAreaMapper workingAreaMapper,
			StreetRepository streetRepository) {
		this.workingAreaRepository = workingAreaRepository;
		this.workingAreaMapper = workingAreaMapper;
		this.streetRepository = streetRepository;
	}

	/**
	 * Save a workingArea.
	 *
	 * @param workingAreaDTO
	 *            the entity to save
	 * @return the persisted entity
	 */
	@Override
	public WorkingAreaDTO save(WorkingAreaDTO workingAreaDTO) {
		log.debug("Request to save WorkingArea : {}", workingAreaDTO);

		WorkingArea workingArea = workingAreaMapper.toEntity(workingAreaDTO);
		workingArea = workingAreaRepository.save(workingArea);
		return workingAreaMapper.toDto(workingArea);
	}

	/**
	 * Get all the workingAreas.
	 *
	 * @return the list of entities
	 */
	@Override
	@Transactional(readOnly = true)
	public List<WorkingAreaDTO> findAll() {
		log.debug("Request to get all WorkingAreas");
		return workingAreaRepository.findAll().stream().map(workingAreaMapper::toDto)
				.collect(Collectors.toCollection(LinkedList::new));
	}

	/**
	 * Get one workingArea by id.
	 *
	 * @param id
	 *            the id of the entity
	 * @return the entity
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<WorkingAreaDTO> findOne(Long id) {
		log.debug("Request to get WorkingArea : {}", id);
		return workingAreaRepository.findById(id).map(workingAreaMapper::toDto);
	}

	/**
	 * Delete the workingArea by id.
	 *
	 * @param id
	 *            the id of the entity
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request to delete WorkingArea : {}", id);
		workingAreaRepository.deleteById(id);
	}

	@Override
	public Page<WorkingAreaStreetDTO> getWorkingAreaByFilter(Long sid, Long eid, Pageable pageable) {
		Page<WorkingArea> page = workingAreaRepository.getWorkingAreaByFilter(sid, eid, pageable);
		return page.map(this::convert);
	}

	private WorkingAreaStreetDTO convert(WorkingArea value) {
		WorkingAreaStreetDTO dto = new WorkingAreaStreetDTO();
		String name = streetRepository.getOne(value.getStreetId()).getStreetName();
		dto.setWorkingArea(workingAreaMapper.toDto(value));
		dto.setStreetName(name);
		return dto;
	}

	@Override
	public WorkingAreaDTO saveAndCheckDeplicate(WorkingAreaDTO workingAreaDTO) {
		WorkingArea wa = workingAreaRepository.findWorkingAreaDuplicate(workingAreaDTO.getEmployeeId(),
				workingAreaDTO.getStreetId());
		Instant instant = Instant.now();
		workingAreaDTO.setCreateDate(instant);
		workingAreaDTO.setUpdateDate(instant);
		if (wa != null)
			throw new BadRequestAlertException("Duplicate Object", "ctsmicroserviceWorkingArea", "duplicated");
		else wa = workingAreaRepository.save(workingAreaMapper.toEntity(workingAreaDTO));
		return workingAreaMapper.toDto(wa);
	}
}
