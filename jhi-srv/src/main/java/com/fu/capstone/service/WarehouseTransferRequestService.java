package com.fu.capstone.service;

import com.fu.capstone.service.dto.PersonalShipmentInvoiceDTO;
import com.fu.capstone.service.dto.TransferDetailsInvoiceDTO;
import com.fu.capstone.service.dto.TransferInvoicePackageDTO;
import com.fu.capstone.service.dto.WarehouseTransferRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing WarehouseTransferRequest.
 */
public interface WarehouseTransferRequestService {

    /**
     * Save a warehouseTransferRequest.
     *
     * @param warehouseTransferRequestDTO the entity to save
     * @return the persisted entity
     */
    WarehouseTransferRequestDTO save(WarehouseTransferRequestDTO warehouseTransferRequestDTO);

    /**
     * Get all the warehouseTransferRequests.
     *
     * @return the list of entities
     */
    List<WarehouseTransferRequestDTO> findAll();


    /**
     * Get the "id" warehouseTransferRequest.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<WarehouseTransferRequestDTO> findOne(Long id);

    /**
     * Delete the "id" warehouseTransferRequest.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

	WarehouseTransferRequestDTO createTransferRequest(TransferInvoicePackageDTO body);

    Page<TransferInvoicePackageDTO> getWarehouseTransferByOffice(Long id, Pageable pageable);

    List<TransferDetailsInvoiceDTO> getWarehouseTransferData(Long id);

    List<PersonalShipmentInvoiceDTO> approveTransferRequest(List<TransferDetailsInvoiceDTO> body);
}
