package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.SubDistrictDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SubDistrict and its DTO SubDistrictDTO.
 */
@Mapper(componentModel = "spring", uses = {DistrictMapper.class})
public interface SubDistrictMapper extends EntityMapper<SubDistrictDTO, SubDistrict> {

    @Mapping(source = "districtId.id", target = "districtIdId")
    SubDistrictDTO toDto(SubDistrict subDistrict);

    @Mapping(target = "streets", ignore = true)
    @Mapping(source = "districtIdId", target = "districtId")
    SubDistrict toEntity(SubDistrictDTO subDistrictDTO);

    default SubDistrict fromId(Long id) {
        if (id == null) {
            return null;
        }
        SubDistrict subDistrict = new SubDistrict();
        subDistrict.setId(id);
        return subDistrict;
    }
}
