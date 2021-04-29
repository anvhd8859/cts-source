package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.RequestDetailsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RequestDetails and its DTO RequestDetailsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RequestDetailsMapper extends EntityMapper<RequestDetailsDTO, RequestDetails> {



    default RequestDetails fromId(Long id) {
        if (id == null) {
            return null;
        }
        RequestDetails requestDetails = new RequestDetails();
        requestDetails.setId(id);
        return requestDetails;
    }
}
