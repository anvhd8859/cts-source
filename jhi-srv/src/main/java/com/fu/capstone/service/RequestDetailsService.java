package com.fu.capstone.service;

import com.fu.capstone.service.dto.InvoicePackageDetailDTO;
import com.fu.capstone.service.dto.PersonalShipmentInvoiceDTO;
import com.fu.capstone.service.dto.RequestDetailInvoiceDTO;
import com.fu.capstone.service.dto.RequestDetailsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing RequestDetails.
 */
public interface RequestDetailsService {

    /**
     * Save a requestDetails.
     *
     * @param requestDetailsDTO the entity to save
     * @return the persisted entity
     */
    RequestDetailsDTO save(RequestDetailsDTO requestDetailsDTO);

    /**
     * Get all the requestDetails.
     *
     * @return the list of entities
     */
    List<RequestDetailsDTO> findAll();


    /**
     * Get the "id" requestDetails.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<RequestDetailsDTO> findOne(Long id);

    /**
     * Delete the "id" requestDetails.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

	List<RequestDetailInvoiceDTO> getRequestDetailsByHeaderId(Long id);

	RequestDetailsDTO updateImportExportByKeeper(Long eid, Long wid, List<InvoicePackageDetailDTO> body);
	
}
