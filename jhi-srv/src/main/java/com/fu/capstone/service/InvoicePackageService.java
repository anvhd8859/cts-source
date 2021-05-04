package com.fu.capstone.service;

import com.fu.capstone.service.dto.InvoiceHeaderDTO;
import com.fu.capstone.service.dto.InvoicePackageDTO;
import com.fu.capstone.service.dto.InvoicePackageShipmentDTO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing InvoicePackage.
 */
public interface InvoicePackageService {

    /**
     * Save a invoicePackage.
     *
     * @param invoicePackageDTO the entity to save
     * @return the persisted entity
     */
    InvoicePackageDTO save(InvoicePackageDTO invoicePackageDTO);

    /**
     * Get all the invoicePackages.
     *
     * @return the list of entities
     */
    List<InvoicePackageDTO> findAll();


    /**
     * Get the "id" invoicePackage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<InvoicePackageDTO> findOne(Long id);

    /**
     * Delete the "id" invoicePackage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
    
    // AnhVD new code

	List<InvoicePackageDTO> getInvoicePackageByHeaderId(Long id);

	List<InvoicePackageShipmentDTO> putImportPackageByOfficeId(List<InvoicePackageShipmentDTO> invoicePackageDTO);

	InvoiceHeaderDTO putImportOnePackage(Long id);

	Page<InvoicePackageShipmentDTO> getImportPackageByOfficeId(Long id, String invNo, String status, String fromDate, String toDate, Pageable pageable);
	
	List<InvoicePackageShipmentDTO> putExportPackageByOfficeId(List<InvoicePackageShipmentDTO> invoicePackageDTO);

	InvoiceHeaderDTO putExportOnePackage(Long id);

	Page<InvoicePackageShipmentDTO> getExportPackageByOfficeId(Long id, String invNo, String status, String fromDate, String toDate, Pageable pageable);

}
