package com.fu.capstone.service;

import com.fu.capstone.service.dto.PersonalShipmentDTO;
import com.fu.capstone.service.dto.PersonalShipmentInvoiceDTO;

import com.fu.capstone.service.dto.ShipmentInvoicePackagesDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing PersonalShipment.
 */
public interface PersonalShipmentService {

    /**
     * Save a personalShipment.
     *
     * @param personalShipmentDTO the entity to save
     * @return the persisted entity
     */
    PersonalShipmentDTO save(PersonalShipmentDTO personalShipmentDTO);

    /**
     * Get all the personalShipments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PersonalShipmentDTO> findAll(Pageable pageable);


    /**
     * Get the "id" personalShipment.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PersonalShipmentDTO> findOne(Long id);

    /**
     * Delete the "id" personalShipment.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
    
    // START TuyenVNT
    /**
     * Get the personalShipment by headerId
     * 
     * @param id the headerId
     */
    Page<PersonalShipmentDTO> getPersonalShipmentByHeaderId(Long id, Pageable pageable);
  
    /**
     * Get the personalShipment not assigned
     * 
     */
    Page<PersonalShipmentDTO> getPersonalShipmentNotAssigned(Pageable pageable);
    // END TuyenVNT


	Page<PersonalShipmentInvoiceDTO> getPersonalShipmentByShipper(Long id, String invNo, String type, String status, String from, String to, Pageable pageable);

	PersonalShipmentDTO createCollectPersonalShipmentForInvoice(Long id);

	Page<PersonalShipmentInvoiceDTO> getAllPersonaShipmentInvoices(Long empId, String invNo, Long prvId, Long dstId, Long sdtId, Long strId, String type, Pageable pageable);

	List<PersonalShipmentInvoiceDTO> getPersonalShipmentByRequestId(Long id);

	// v2
	Page<ShipmentInvoicePackagesDTO> getImportShipmentByShipper(Long id, String invNo, String type, String from, String to, Pageable pageable);
}
