package com.fu.capstone.service.impl;

import com.fu.capstone.service.TransferVehicleService;
import com.fu.capstone.domain.TransferVehicle;
import com.fu.capstone.repository.TransferVehicleRepository;
import com.fu.capstone.service.dto.TransferVehicleDTO;
import com.fu.capstone.service.mapper.TransferVehicleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing TransferVehicle.
 */
@Service
@Transactional
public class TransferVehicleServiceImpl implements TransferVehicleService {

    private final Logger log = LoggerFactory.getLogger(TransferVehicleServiceImpl.class);

    private TransferVehicleRepository transferVehicleRepository;

    private TransferVehicleMapper transferVehicleMapper;

    public TransferVehicleServiceImpl(TransferVehicleRepository transferVehicleRepository, TransferVehicleMapper transferVehicleMapper) {
        this.transferVehicleRepository = transferVehicleRepository;
        this.transferVehicleMapper = transferVehicleMapper;
    }

    /**
     * Save a transferVehicle.
     *
     * @param transferVehicleDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransferVehicleDTO save(TransferVehicleDTO transferVehicleDTO) {
        log.debug("Request to save TransferVehicle : {}", transferVehicleDTO);

        TransferVehicle transferVehicle = transferVehicleMapper.toEntity(transferVehicleDTO);
        transferVehicle = transferVehicleRepository.save(transferVehicle);
        return transferVehicleMapper.toDto(transferVehicle);
    }

    /**
     * Get all the transferVehicles.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TransferVehicleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TransferVehicles");
        return transferVehicleRepository.findAll(pageable)
            .map(transferVehicleMapper::toDto);
    }


    /**
     * Get one transferVehicle by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TransferVehicleDTO> findOne(Long id) {
        log.debug("Request to get TransferVehicle : {}", id);
        return transferVehicleRepository.findById(id)
            .map(transferVehicleMapper::toDto);
    }

    /**
     * Delete the transferVehicle by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransferVehicle : {}", id);
        transferVehicleRepository.deleteById(id);
    }


    // AnhVD new code

	@Override
	public List<TransferVehicleDTO> getTransferVehiclesByInvoiceHeaderId(Long id) {
		return transferVehicleMapper.toDto(transferVehicleRepository.getTransferVehiclesByInvoiceHeaderId(id));
	}
}
