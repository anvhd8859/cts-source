package com.fu.capstone.service.impl;

import com.fu.capstone.service.WarehouseTransferRequestService;
import com.fu.capstone.domain.WarehouseTransferRequest;
import com.fu.capstone.repository.WarehouseTransferRequestRepository;
import com.fu.capstone.service.dto.WarehouseTransferRequestDTO;
import com.fu.capstone.service.mapper.WarehouseTransferRequestMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing WarehouseTransferRequest.
 */
@Service
@Transactional
public class WarehouseTransferRequestServiceImpl implements WarehouseTransferRequestService {

    private final Logger log = LoggerFactory.getLogger(WarehouseTransferRequestServiceImpl.class);

    private WarehouseTransferRequestRepository warehouseTransferRequestRepository;

    private WarehouseTransferRequestMapper warehouseTransferRequestMapper;

    public WarehouseTransferRequestServiceImpl(WarehouseTransferRequestRepository warehouseTransferRequestRepository, WarehouseTransferRequestMapper warehouseTransferRequestMapper) {
        this.warehouseTransferRequestRepository = warehouseTransferRequestRepository;
        this.warehouseTransferRequestMapper = warehouseTransferRequestMapper;
    }

    /**
     * Save a warehouseTransferRequest.
     *
     * @param warehouseTransferRequestDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public WarehouseTransferRequestDTO save(WarehouseTransferRequestDTO warehouseTransferRequestDTO) {
        log.debug("Request to save WarehouseTransferRequest : {}", warehouseTransferRequestDTO);

        WarehouseTransferRequest warehouseTransferRequest = warehouseTransferRequestMapper.toEntity(warehouseTransferRequestDTO);
        warehouseTransferRequest = warehouseTransferRequestRepository.save(warehouseTransferRequest);
        return warehouseTransferRequestMapper.toDto(warehouseTransferRequest);
    }

    /**
     * Get all the warehouseTransferRequests.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<WarehouseTransferRequestDTO> findAll() {
        log.debug("Request to get all WarehouseTransferRequests");
        return warehouseTransferRequestRepository.findAll().stream()
            .map(warehouseTransferRequestMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one warehouseTransferRequest by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<WarehouseTransferRequestDTO> findOne(Long id) {
        log.debug("Request to get WarehouseTransferRequest : {}", id);
        return warehouseTransferRequestRepository.findById(id)
            .map(warehouseTransferRequestMapper::toDto);
    }

    /**
     * Delete the warehouseTransferRequest by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete WarehouseTransferRequest : {}", id);
        warehouseTransferRequestRepository.deleteById(id);
    }
}
