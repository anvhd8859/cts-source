package com.fu.capstone.service;

import com.fu.capstone.service.dto.VehicleDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Vehicle.
 */
public interface VehicleService {

	/**
	 * Save a vehicle.
	 * 
	 * @param vehicleDTO the entity to save
	 * @return the persisted entity
	 */
	VehicleDTO save(VehicleDTO vehicleDTO);
	
	/**
	 * Get all the vehicles.
	 * 
	 * @return the list of entities
	 */
	List<VehicleDTO> findAll();
	
	/**
	 * Get vehicle by "id".
	 * 
	 */
	Optional<VehicleDTO> findOne(Long id);
	
	void delete(Long id);
}
