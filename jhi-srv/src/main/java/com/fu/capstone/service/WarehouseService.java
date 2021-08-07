package com.fu.capstone.service;

import com.fu.capstone.service.dto.WarehouseDTO;
import com.fu.capstone.service.dto.WarehouseDetailDTO;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Warehouse.
 */
public interface WarehouseService {

    /**
     * Save a warehouse.
     *
     * @param warehouseDTO the entity to save
     * @return the persisted entity
     */
    WarehouseDTO save(WarehouseDTO warehouseDTO);

    /**
     * Get all the warehouses.
     *
     * @return the list of entities
     */
    List<WarehouseDTO> findAll();


    /**
     * Get the "id" warehouse.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<WarehouseDTO> findOne(Long id);

    /**
     * Delete the "id" warehouse.
     *
     * @param id the id of the entity
     */

    void delete(Long id);    

    WarehouseDTO saveWarehouse(WarehouseDTO warehouseDTO);

    List<WarehouseDetailDTO> getAllWarehousesDetail();

}
