package com.fu.capstone.service.impl;

import com.fu.capstone.service.ReceiptImageService;
import com.fu.capstone.domain.ReceiptImage;
import com.fu.capstone.repository.ReceiptImageRepository;
import com.fu.capstone.service.dto.ReceiptImageDTO;
import com.fu.capstone.service.mapper.ReceiptImageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ReceiptImage.
 */
@Service
@Transactional
public class ReceiptImageServiceImpl implements ReceiptImageService {

    private final Logger log = LoggerFactory.getLogger(ReceiptImageServiceImpl.class);

    private ReceiptImageRepository receiptImageRepository;

    private ReceiptImageMapper receiptImageMapper;

    public ReceiptImageServiceImpl(ReceiptImageRepository receiptImageRepository, ReceiptImageMapper receiptImageMapper) {
        this.receiptImageRepository = receiptImageRepository;
        this.receiptImageMapper = receiptImageMapper;
    }

    /**
     * Save a receiptImage.
     *
     * @param receiptImageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ReceiptImageDTO save(ReceiptImageDTO receiptImageDTO) {
        log.debug("Request to save ReceiptImage : {}", receiptImageDTO);

        ReceiptImage receiptImage = receiptImageMapper.toEntity(receiptImageDTO);
        receiptImage = receiptImageRepository.save(receiptImage);
        return receiptImageMapper.toDto(receiptImage);
    }

    /**
     * Get all the receiptImages.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ReceiptImageDTO> findAll() {
        log.debug("Request to get all ReceiptImages");
        return receiptImageRepository.findAll().stream()
            .map(receiptImageMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one receiptImage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ReceiptImageDTO> findOne(Long id) {
        log.debug("Request to get ReceiptImage : {}", id);
        return receiptImageRepository.findById(id)
            .map(receiptImageMapper::toDto);
    }

    /**
     * Delete the receiptImage by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ReceiptImage : {}", id);
        receiptImageRepository.deleteById(id);
    }
}
