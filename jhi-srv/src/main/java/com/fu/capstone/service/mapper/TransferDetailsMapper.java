package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.TransferDetailsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TransferDetails and its DTO TransferDetailsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TransferDetailsMapper extends EntityMapper<TransferDetailsDTO, TransferDetails> {



    default TransferDetails fromId(Long id) {
        if (id == null) {
            return null;
        }
        TransferDetails transferDetails = new TransferDetails();
        transferDetails.setId(id);
        return transferDetails;
    }
}
