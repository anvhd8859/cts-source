package com.fu.capstone.service.impl;

import com.fu.capstone.service.TransferPackingService;
import com.fu.capstone.domain.TransferPacking;
import com.fu.capstone.repository.TransferPackingRepository;
import com.fu.capstone.service.dto.TransferPackingDTO;
import com.fu.capstone.service.mapper.TransferPackingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing TransferPacking.
 */
@Service
@Transactional
public class TransferPackingServiceImpl implements TransferPackingService {

    private final Logger log = LoggerFactory.getLogger(TransferPackingServiceImpl.class);

    private TransferPackingRepository transferPackingRepository;

    private TransferPackingMapper transferPackingMapper;

    public TransferPackingServiceImpl(TransferPackingRepository transferPackingRepository, TransferPackingMapper transferPackingMapper) {
        this.transferPackingRepository = transferPackingRepository;
        this.transferPackingMapper = transferPackingMapper;
    }

    /**
     * Save a transferPacking.
     *
     * @param transferPackingDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransferPackingDTO save(TransferPackingDTO transferPackingDTO) {
        log.debug("Request to save TransferPacking : {}", transferPackingDTO);

        TransferPacking transferPacking = transferPackingMapper.toEntity(transferPackingDTO);
        transferPacking = transferPackingRepository.save(transferPacking);
        return transferPackingMapper.toDto(transferPacking);
    }

    /**
     * Get all the transferPackings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TransferPackingDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TransferPackings");
        return transferPackingRepository.findAll(pageable)
            .map(transferPackingMapper::toDto);
    }


    /**
     * Get one transferPacking by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TransferPackingDTO> findOne(Long id) {
        log.debug("Request to get TransferPacking : {}", id);
        return transferPackingRepository.findById(id)
            .map(transferPackingMapper::toDto);
    }

    /**
     * Delete the transferPacking by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransferPacking : {}", id);
        transferPackingRepository.deleteById(id);
    }
}
