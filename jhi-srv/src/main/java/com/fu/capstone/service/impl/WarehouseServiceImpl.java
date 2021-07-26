package com.fu.capstone.service.impl;

import com.fu.capstone.service.WarehouseService;
import com.fu.capstone.domain.Office;
import com.fu.capstone.domain.Warehouse;
import com.fu.capstone.repository.OfficeRepository;
import com.fu.capstone.repository.WarehouseRepository;
import com.fu.capstone.service.dto.WarehouseDTO;
import com.fu.capstone.service.mapper.WarehouseMapper;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Warehouse.
 */
@Service
@Transactional
public class WarehouseServiceImpl implements WarehouseService {

	private final Logger log = LoggerFactory.getLogger(WarehouseServiceImpl.class);

	private WarehouseRepository warehouseRepository;
	
	private OfficeRepository officeRepository;

	private WarehouseMapper warehouseMapper;

	public WarehouseServiceImpl(WarehouseRepository warehouseRepository,
			OfficeRepository officeRepository,
			WarehouseMapper warehouseMapper) {
		this.warehouseRepository = warehouseRepository;
		this.officeRepository = officeRepository;
		this.warehouseMapper = warehouseMapper;
	}

	/**
	 * Save a warehouse.
	 *
	 * @param warehouseDTO
	 *            the entity to save
	 * @return the persisted entity
	 */
	@Override
	public WarehouseDTO save(WarehouseDTO warehouseDTO) {
		log.debug("Request to save Warehouse : {}", warehouseDTO);

		Warehouse warehouse = warehouseMapper.toEntity(warehouseDTO);
		warehouse = warehouseRepository.save(warehouse);
		return warehouseMapper.toDto(warehouse);
	}

	/**
	 * Get all the warehouses.
	 *
	 * @return the list of entities
	 */
	@Override
	@Transactional(readOnly = true)
	public List<WarehouseDTO> findAll() {
		log.debug("Request to get all Warehouses");
		return warehouseRepository.findAll().stream().map(warehouseMapper::toDto)
				.collect(Collectors.toCollection(LinkedList::new));
	}

	/**
	 * Get one warehouse by id.
	 *
	 * @param id
	 *            the id of the entity
	 * @return the entity
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<WarehouseDTO> findOne(Long id) {
		log.debug("Request to get Warehouse : {}", id);
		return warehouseRepository.findById(id).map(warehouseMapper::toDto);
	}

	/**
	 * Delete the warehouse by id.
	 *
	 * @param id
	 *            the id of the entity
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request to delete Warehouse : {}", id);
		warehouseRepository.deleteById(id);
	}

	@Override
	public WarehouseDTO saveWarehouse(WarehouseDTO warehouseDTO) {
		log.debug("Request to save Warehouse : {}", warehouseDTO);
		
		// validate
		Warehouse warehouse = warehouseRepository.getWarehouseByOfficeId(warehouseDTO.getOfficeId());
		if(warehouse != null ) 
			throw new BadRequestAlertException("OfficeID:" + warehouseDTO.getOfficeId() + " allreade have an warehouseID:" + warehouse.getId(), "ctsmicroserviceWarehouse", "");
		
		Office ofc = officeRepository.getOne(warehouseDTO.getOfficeId());
		warehouse = warehouseMapper.toEntity(warehouseDTO);
		warehouse.setAddress(ofc.getAddress());
		warehouse.setStreetId(ofc.getStreetId().toString());
		warehouse = warehouseRepository.save(warehouse);
		return warehouseMapper.toDto(warehouse);
	}
}
