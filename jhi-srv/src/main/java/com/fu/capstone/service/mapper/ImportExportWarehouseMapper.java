package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.ImportExportRequestDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ImportExportWarehouse and its DTO ImportExportWarehouseDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ImportExportWarehouseMapper extends EntityMapper<ImportExportRequestDTO, ImportExportRequest> {



    default ImportExportRequest fromId(Long id) {
        if (id == null) {
            return null;
        }
        ImportExportRequest importExportRequest = new ImportExportRequest();
        importExportRequest.setId(id);
        return importExportRequest;
    }
}
