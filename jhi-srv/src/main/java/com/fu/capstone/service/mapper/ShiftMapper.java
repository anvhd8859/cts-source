package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.ShiftDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Shift and its DTO ShiftDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ShiftMapper extends EntityMapper<ShiftDTO, Shift> {



    default Shift fromId(Long id) {
        if (id == null) {
            return null;
        }
        Shift shift = new Shift();
        shift.setId(id);
        return shift;
    }
}
