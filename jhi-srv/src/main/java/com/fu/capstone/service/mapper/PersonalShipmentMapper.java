package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.PersonalShipmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PersonalShipment and its DTO PersonalShipmentDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PersonalShipmentMapper extends EntityMapper<PersonalShipmentDTO, PersonalShipment> {



    default PersonalShipment fromId(Long id) {
        if (id == null) {
            return null;
        }
        PersonalShipment personalShipment = new PersonalShipment();
        personalShipment.setId(id);
        return personalShipment;
    }
}
