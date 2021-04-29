package com.fu.capstone.service.impl;

import com.fu.capstone.service.ImportExportWarehouseService;
import com.fu.capstone.domain.ImportExportWarehouse;
import com.fu.capstone.repository.ImportExportWarehouseRepository;
import com.fu.capstone.service.dto.ImportExportWarehouseDTO;
import com.fu.capstone.service.mapper.ImportExportWarehouseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing ImportExportWarehouse.
 */
@Service
@Transactional
public class ImportExportWarehouseServiceImpl implements ImportExportWarehouseService {

    private final Logger log = LoggerFactory.getLogger(ImportExportWarehouseServiceImpl.class);

    private ImportExportWarehouseRepository importExportWarehouseRepository;

    private ImportExportWarehouseMapper importExportWarehouseMapper;

    public ImportExportWarehouseServiceImpl(ImportExportWarehouseRepository importExportWarehouseRepository, ImportExportWarehouseMapper importExportWarehouseMapper) {
        this.importExportWarehouseRepository = importExportWarehouseRepository;
        this.importExportWarehouseMapper = importExportWarehouseMapper;
    }

    /**
     * Save a importExportWarehouse.
     *
     * @param importExportWarehouseDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ImportExportWarehouseDTO save(ImportExportWarehouseDTO importExportWarehouseDTO) {
        log.debug("Request to save ImportExportWarehouse : {}", importExportWarehouseDTO);

        ImportExportWarehouse importExportWarehouse = importExportWarehouseMapper.toEntity(importExportWarehouseDTO);
        importExportWarehouse = importExportWarehouseRepository.save(importExportWarehouse);
        return importExportWarehouseMapper.toDto(importExportWarehouse);
    }

    /**
     * Get all the importExportWarehouses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ImportExportWarehouseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ImportExportWarehouses");
        return importExportWarehouseRepository.findAll(pageable)
            .map(importExportWarehouseMapper::toDto);
    }


    /**
     * Get one importExportWarehouse by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ImportExportWarehouseDTO> findOne(Long id) {
        log.debug("Request to get ImportExportWarehouse : {}", id);
        return importExportWarehouseRepository.findById(id)
            .map(importExportWarehouseMapper::toDto);
    }

    /**
     * Delete the importExportWarehouse by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ImportExportWarehouse : {}", id);
        importExportWarehouseRepository.deleteById(id);
    }
}
