package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.WarehouseTransferRequestDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity WarehouseTransferRequest and its DTO WarehouseTransferRequestDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface WarehouseTransferRequestMapper extends EntityMapper<WarehouseTransferRequestDTO, WarehouseTransferRequest> {



    default WarehouseTransferRequest fromId(Long id) {
        if (id == null) {
            return null;
        }
        WarehouseTransferRequest warehouseTransferRequest = new WarehouseTransferRequest();
        warehouseTransferRequest.setId(id);
        return warehouseTransferRequest;
    }
}
