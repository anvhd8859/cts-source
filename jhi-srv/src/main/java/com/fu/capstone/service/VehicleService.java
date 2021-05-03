package com.fu.capstone.service;

import com.fu.capstone.service.dto.VehicleDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Vehicle.
 */
public interface VehicleService {

	/**
	 * 
	 */
	VehicleDTO save(VehicleDTO vehicleDTO);
	
	List<VehicleDTO> findAll();
	
	Optional<VehicleDTO> findOne(Long id);
	
	void delete(Long id);
}
