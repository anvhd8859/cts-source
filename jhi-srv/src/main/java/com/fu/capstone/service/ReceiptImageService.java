package com.fu.capstone.service;

import com.fu.capstone.service.dto.ReceiptImageDTO;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

/**
 * Service Interface for managing ReceiptImage.
 */
public interface ReceiptImageService {

    /**
     * Save a receiptImage.
     *
     * @param receiptImageDTO the entity to save
     * @return the persisted entity
     */
    ReceiptImageDTO save(ReceiptImageDTO receiptImageDTO);

    /**
     * Get all the receiptImages.
     *
     * @return the list of entities
     */
    List<ReceiptImageDTO> findAll();


    /**
     * Get the "id" receiptImage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ReceiptImageDTO> findOne(Long id);

    /**
     * Delete the "id" receiptImage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    ReceiptImageDTO store(Long id, MultipartFile file) throws IOException;

	ReceiptImageDTO getReceiptImageByReceiptNote(Long id);
}
