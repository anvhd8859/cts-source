package com.fu.capstone.service;

import com.fu.capstone.service.dto.PersonalShipmentDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
    
    // START TuyenVNT 14/04/2021
    /**
     * Get the personalShipment by headerId
     * 
     * @param id the headerId
     */
    List<PersonalShipmentDTO> getPersonalShipmentByHeaderId(Long id, Pageable page);
    // END TuyenVNT 14/04/2021
}
