package com.fu.capstone.service.impl;

import com.fu.capstone.service.TransferDetailsService;
import com.fu.capstone.domain.TransferDetails;
import com.fu.capstone.repository.TransferDetailsRepository;
import com.fu.capstone.service.dto.TransferDetailsDTO;
import com.fu.capstone.service.mapper.TransferDetailsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing TransferDetails.
 */
@Service
@Transactional
public class TransferDetailsServiceImpl implements TransferDetailsService {

    private final Logger log = LoggerFactory.getLogger(TransferDetailsServiceImpl.class);

    private TransferDetailsRepository transferDetailsRepository;

    private TransferDetailsMapper transferDetailsMapper;

    public TransferDetailsServiceImpl(TransferDetailsRepository transferDetailsRepository, TransferDetailsMapper transferDetailsMapper) {
        this.transferDetailsRepository = transferDetailsRepository;
        this.transferDetailsMapper = transferDetailsMapper;
    }

    /**
     * Save a transferDetails.
     *
     * @param transferDetailsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransferDetailsDTO save(TransferDetailsDTO transferDetailsDTO) {
        log.debug("Request to save TransferDetails : {}", transferDetailsDTO);

        TransferDetails transferDetails = transferDetailsMapper.toEntity(transferDetailsDTO);
        transferDetails = transferDetailsRepository.save(transferDetails);
        return transferDetailsMapper.toDto(transferDetails);
    }

    /**
     * Get all the transferDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TransferDetailsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TransferDetails");
        return transferDetailsRepository.findAll(pageable)
            .map(transferDetailsMapper::toDto);
    }


    /**
     * Get one transferDetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TransferDetailsDTO> findOne(Long id) {
        log.debug("Request to get TransferDetails : {}", id);
        return transferDetailsRepository.findById(id)
            .map(transferDetailsMapper::toDto);
    }

    /**
     * Delete the transferDetails by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransferDetails : {}", id);
        transferDetailsRepository.deleteById(id);
    }
}
