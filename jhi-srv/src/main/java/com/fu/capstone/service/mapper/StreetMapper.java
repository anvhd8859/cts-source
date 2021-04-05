package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.StreetDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Street and its DTO StreetDTO.
 */
@Mapper(componentModel = "spring", uses = {SubDistrictMapper.class})
public interface StreetMapper extends EntityMapper<StreetDTO, Street> {

    @Mapping(source = "subDistrictId.id", target = "subDistrictIdId")
    StreetDTO toDto(Street street);

    @Mapping(source = "subDistrictIdId", target = "subDistrictId")
    Street toEntity(StreetDTO streetDTO);

    default Street fromId(Long id) {
        if (id == null) {
            return null;
        }
        Street street = new Street();
        street.setId(id);
        return street;
    }
}
