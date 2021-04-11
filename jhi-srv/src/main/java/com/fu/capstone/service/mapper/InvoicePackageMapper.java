package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.InvoicePackageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity InvoicePackage and its DTO InvoicePackageDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface InvoicePackageMapper extends EntityMapper<InvoicePackageDTO, InvoicePackage> {



    default InvoicePackage fromId(Long id) {
        if (id == null) {
            return null;
        }
        InvoicePackage invoicePackage = new InvoicePackage();
        invoicePackage.setId(id);
        return invoicePackage;
    }
}
