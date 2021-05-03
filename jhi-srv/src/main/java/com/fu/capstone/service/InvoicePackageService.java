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

    /**
     * Get InvoicePackage by HeaderId
     * 
     * @param id the HeaderId
     */
	List<InvoicePackageDTO> getInvoicePackageByHeaderId(Long id);

	/**
	 * Put ImportPackage by OfficeId
	 * 
	 * @param invoicePackageDTO the list of InvoicePackageShipmentDTO
	 */
	List<InvoicePackageShipmentDTO> putImportPackageByOfficeId(List<InvoicePackageShipmentDTO> invoicePackageDTO);
	
	/**
	 * Put ImportOnePackage
	 * 
	 */
	InvoiceHeaderDTO putImportOnePackage(Long id);
	
	/**
	 * Get ImportPackage by OfficeId
	 * 
	 */
	Page<InvoicePackageShipmentDTO> getImportPackageByOfficeId(Long id, String invNo, String type, Pageable pageable);
	
	/**
	 * Put ExportPackage by OfficeId
	 * 
	 */
	List<InvoicePackageShipmentDTO> putExportPackageByOfficeId(List<InvoicePackageShipmentDTO> invoicePackageDTO);
	
	/**
	 * Put ExportOnePackage
	 * 
	 */
	InvoiceHeaderDTO putExportOnePackage(Long id);
	
	Page<InvoicePackageShipmentDTO> getExportPackageByOfficeId(Long id, String invNo, String status, Pageable pageable);
}
