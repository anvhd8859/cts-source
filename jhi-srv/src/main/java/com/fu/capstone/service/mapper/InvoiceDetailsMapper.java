package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.InvoiceDetailsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity InvoiceDetails and its DTO InvoiceDetailsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface InvoiceDetailsMapper extends EntityMapper<InvoiceDetailsDTO, InvoiceDetails> {



    default InvoiceDetails fromId(Long id) {
        if (id == null) {
            return null;
        }
        InvoiceDetails invoiceDetails = new InvoiceDetails();
        invoiceDetails.setId(id);
        return invoiceDetails;
    }
}
