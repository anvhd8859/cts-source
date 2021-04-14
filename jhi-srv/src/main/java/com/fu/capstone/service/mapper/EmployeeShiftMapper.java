package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.EmployeeShiftDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EmployeeShift and its DTO EmployeeShiftDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EmployeeShiftMapper extends EntityMapper<EmployeeShiftDTO, EmployeeShift> {



    default EmployeeShift fromId(Long id) {
        if (id == null) {
            return null;
        }
        EmployeeShift employeeShift = new EmployeeShift();
        employeeShift.setId(id);
        return employeeShift;
    }
}
