package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.WorkingAreaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity WorkingArea and its DTO WorkingAreaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface WorkingAreaMapper extends EntityMapper<WorkingAreaDTO, WorkingArea> {



    default WorkingArea fromId(Long id) {
        if (id == null) {
            return null;
        }
        WorkingArea workingArea = new WorkingArea();
        workingArea.setId(id);
        return workingArea;
    }
}
