package com.fu.capstone.service;

import com.fu.capstone.service.dto.ReceiptInvoiceDTO;
import com.fu.capstone.service.dto.PackageDetailsDTO;
import com.fu.capstone.service.dto.ReceiptDetailPackageDTO;
import com.fu.capstone.service.dto.ReceiptNoteDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ReceiptNote.
 */
public interface ReceiptNoteService {

    /**
     * Save a receiptNote.
     *
     * @param receiptNoteDTO the entity to save
     * @return the persisted entity
     */
    ReceiptNoteDTO save(ReceiptNoteDTO receiptNoteDTO);

    /**
     * Get all the receiptNotes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ReceiptNoteDTO> findAll(Pageable pageable);


    /**
     * Get the "id" receiptNote.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ReceiptNoteDTO> findOne(Long id);

    /**
     * Delete the "id" receiptNote.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

	Optional<ReceiptNoteDTO> getReceiptNoteByHeaderId(Long id);

	List<ReceiptInvoiceDTO> getAllReceiptInvoiceByUser(Long id, Pageable pageable);

	List<PackageDetailsDTO> getReceiptItemPackage(Long id);

	ReceiptNoteDTO createReceiptNoteColectShipment(ReceiptDetailPackageDTO data);

	ReceiptNoteDTO createReceiptNoteDeliveryShipment(ReceiptDetailPackageDTO data);
}
