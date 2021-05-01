package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.ReceiptImageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ReceiptImage and its DTO ReceiptImageDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ReceiptImageMapper extends EntityMapper<ReceiptImageDTO, ReceiptImage> {



    default ReceiptImage fromId(Long id) {
        if (id == null) {
            return null;
        }
        ReceiptImage receiptImage = new ReceiptImage();
        receiptImage.setId(id);
        return receiptImage;
    }
}
