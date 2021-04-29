package com.fu.capstone.service.impl;

import com.fu.capstone.service.RequestDetailsService;
import com.fu.capstone.domain.RequestDetails;
import com.fu.capstone.repository.RequestDetailsRepository;
import com.fu.capstone.service.dto.RequestDetailsDTO;
import com.fu.capstone.service.mapper.RequestDetailsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing RequestDetails.
 */
@Service
@Transactional
public class RequestDetailsServiceImpl implements RequestDetailsService {

    private final Logger log = LoggerFactory.getLogger(RequestDetailsServiceImpl.class);

    private RequestDetailsRepository requestDetailsRepository;

    private RequestDetailsMapper requestDetailsMapper;

    public RequestDetailsServiceImpl(RequestDetailsRepository requestDetailsRepository, RequestDetailsMapper requestDetailsMapper) {
        this.requestDetailsRepository = requestDetailsRepository;
        this.requestDetailsMapper = requestDetailsMapper;
    }

    /**
     * Save a requestDetails.
     *
     * @param requestDetailsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RequestDetailsDTO save(RequestDetailsDTO requestDetailsDTO) {
        log.debug("Request to save RequestDetails : {}", requestDetailsDTO);

        RequestDetails requestDetails = requestDetailsMapper.toEntity(requestDetailsDTO);
        requestDetails = requestDetailsRepository.save(requestDetails);
        return requestDetailsMapper.toDto(requestDetails);
    }

    /**
     * Get all the requestDetails.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RequestDetailsDTO> findAll() {
        log.debug("Request to get all RequestDetails");
        return requestDetailsRepository.findAll().stream()
            .map(requestDetailsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one requestDetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RequestDetailsDTO> findOne(Long id) {
        log.debug("Request to get RequestDetails : {}", id);
        return requestDetailsRepository.findById(id)
            .map(requestDetailsMapper::toDto);
    }

    /**
     * Delete the requestDetails by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RequestDetails : {}", id);
        requestDetailsRepository.deleteById(id);
    }
}
