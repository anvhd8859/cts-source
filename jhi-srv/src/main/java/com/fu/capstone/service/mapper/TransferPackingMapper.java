package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.TransferPackingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TransferPacking and its DTO TransferPackingDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TransferPackingMapper extends EntityMapper<TransferPackingDTO, TransferPacking> {



    default TransferPacking fromId(Long id) {
        if (id == null) {
            return null;
        }
        TransferPacking transferPacking = new TransferPacking();
        transferPacking.setId(id);
        return transferPacking;
    }
}
