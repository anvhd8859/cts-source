package com.fu.capstone.service.mapper;

import com.fu.capstone.domain.*;
import com.fu.capstone.service.dto.ReceiptNoteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ReceiptNote and its DTO ReceiptNoteDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ReceiptNoteMapper extends EntityMapper<ReceiptNoteDTO, ReceiptNote> {



    default ReceiptNote fromId(Long id) {
        if (id == null) {
            return null;
        }
        ReceiptNote receiptNote = new ReceiptNote();
        receiptNote.setId(id);
        return receiptNote;
    }
}
