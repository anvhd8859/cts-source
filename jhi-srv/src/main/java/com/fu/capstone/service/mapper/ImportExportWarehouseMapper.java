package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.ImportExportWarehouseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ImportExportWarehouse and its DTO ImportExportWarehouseDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ImportExportWarehouseMapper extends EntityMapper<ImportExportWarehouseDTO, ImportExportWarehouse> {



    default ImportExportWarehouse fromId(Long id) {
        if (id == null) {
            return null;
        }
        ImportExportWarehouse importExportWarehouse = new ImportExportWarehouse();
        importExportWarehouse.setId(id);
        return importExportWarehouse;
    }
}
