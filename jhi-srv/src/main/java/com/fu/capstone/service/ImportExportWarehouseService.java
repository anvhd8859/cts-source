package com.fu.capstone.service;

import com.fu.capstone.service.dto.DetailsImportExportDTO;
import com.fu.capstone.service.dto.IERequestDetailDTO;
import com.fu.capstone.service.dto.ImportExportRequestDTO;
import com.fu.capstone.service.dto.PersonalShipmentInvoiceDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ImportExportWarehouse.
 */
public interface ImportExportWarehouseService {

    /**
     * Save a importExportWarehouse.
     *
     * @param importExportRequestDTO the entity to save
     * @return the persisted entity
     */
    ImportExportRequestDTO save(ImportExportRequestDTO importExportRequestDTO);

    /**
     * Get all the importExportWarehouses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ImportExportRequestDTO> findAll(Pageable pageable);


    /**
     * Get the "id" importExportWarehouse.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ImportExportRequestDTO> findOne(Long id);

    /**
     * Delete the "id" importExportWarehouse.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

	ImportExportRequestDTO createImportWarehouse(DetailsImportExportDTO importExportWarehouseDTO);

	ImportExportRequestDTO createExportWarehouse(DetailsImportExportDTO importExportWarehouseDTO);

	Page<ImportExportRequestDTO> getImportExportWarehouseByFilter(Long eid, Long oid, String type, String cf, Pageable pageable);

	ImportExportRequestDTO updateImportExportByKeeper(Long id, List<PersonalShipmentInvoiceDTO> InvoicePackageDetailDTO);

	Page<ImportExportRequestDTO> getImportExportWarehouseForShipper(Long eid, String type, String cf,
			Pageable pageable);

	ImportExportRequestDTO approveWarehouseRequest(IERequestDetailDTO body);

	ImportExportRequestDTO rejectWarehouseRequest(IERequestDetailDTO body);
}
