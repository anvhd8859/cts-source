package com.fu.capstone.service;

import com.fu.capstone.service.dto.DetailsImportExportDTO;
import com.fu.capstone.service.dto.ImportExportWarehouseDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing ImportExportWarehouse.
 */
public interface ImportExportWarehouseService {

    /**
     * Save a importExportWarehouse.
     *
     * @param importExportWarehouseDTO the entity to save
     * @return the persisted entity
     */
    ImportExportWarehouseDTO save(ImportExportWarehouseDTO importExportWarehouseDTO);

    /**
     * Get all the importExportWarehouses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ImportExportWarehouseDTO> findAll(Pageable pageable);


    /**
     * Get the "id" importExportWarehouse.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ImportExportWarehouseDTO> findOne(Long id);

    /**
     * Delete the "id" importExportWarehouse.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

	ImportExportWarehouseDTO createImportWarehouse(DetailsImportExportDTO importExportWarehouseDTO);

	ImportExportWarehouseDTO createExportWarehouse(DetailsImportExportDTO importExportWarehouseDTO);

	Page<ImportExportWarehouseDTO> getImportExportWarehouseByFilter(Long eid, Long oid, String type, String cf, Pageable pageable);

	ImportExportWarehouseDTO updateImportExportByKeeper(ImportExportWarehouseDTO importExportWarehouseDTO);
}
