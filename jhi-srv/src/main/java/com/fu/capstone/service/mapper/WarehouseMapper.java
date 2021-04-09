package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.WarehouseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Warehouse and its DTO WarehouseDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface WarehouseMapper extends EntityMapper<WarehouseDTO, Warehouse> {



    default Warehouse fromId(Long id) {
        if (id == null) {
            return null;
        }
        Warehouse warehouse = new Warehouse();
        warehouse.setId(id);
        return warehouse;
    }
}
