package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.TransferVehicleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TransferVehicle and its DTO TransferVehicleDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TransferVehicleMapper extends EntityMapper<TransferVehicleDTO, TransferVehicle> {



    default TransferVehicle fromId(Long id) {
        if (id == null) {
            return null;
        }
        TransferVehicle transferVehicle = new TransferVehicle();
        transferVehicle.setId(id);
        return transferVehicle;
    }
}
