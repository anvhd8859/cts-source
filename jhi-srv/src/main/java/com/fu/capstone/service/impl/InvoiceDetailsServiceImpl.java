package com.fu.capstone.service.impl;

import com.fu.capstone.service.InvoiceDetailsService;
import com.fu.capstone.domain.InvoiceDetails;
import com.fu.capstone.repository.InvoiceDetailsRepository;
import com.fu.capstone.service.dto.InvoiceDetailsDTO;
import com.fu.capstone.service.mapper.InvoiceDetailsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing InvoiceDetails.
 */
@Service
@Transactional
public class InvoiceDetailsServiceImpl implements InvoiceDetailsService {

    private final Logger log = LoggerFactory.getLogger(InvoiceDetailsServiceImpl.class);

    private InvoiceDetailsRepository invoiceDetailsRepository;

    private InvoiceDetailsMapper invoiceDetailsMapper;

    public InvoiceDetailsServiceImpl(InvoiceDetailsRepository invoiceDetailsRepository, InvoiceDetailsMapper invoiceDetailsMapper) {
        this.invoiceDetailsRepository = invoiceDetailsRepository;
        this.invoiceDetailsMapper = invoiceDetailsMapper;
    }

    /**
     * Save a invoiceDetails.
     *
     * @param invoiceDetailsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public InvoiceDetailsDTO save(InvoiceDetailsDTO invoiceDetailsDTO) {
        log.debug("Request to save InvoiceDetails : {}", invoiceDetailsDTO);

        InvoiceDetails invoiceDetails = invoiceDetailsMapper.toEntity(invoiceDetailsDTO);
        invoiceDetails = invoiceDetailsRepository.save(invoiceDetails);
        return invoiceDetailsMapper.toDto(invoiceDetails);
    }

    /**
     * Get all the invoiceDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<InvoiceDetailsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all InvoiceDetails");
        return invoiceDetailsRepository.findAll(pageable)
            .map(invoiceDetailsMapper::toDto);
    }


    /**
     * Get one invoiceDetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<InvoiceDetailsDTO> findOne(Long id) {
        log.debug("Request to get InvoiceDetails : {}", id);
        return invoiceDetailsRepository.findById(id)
            .map(invoiceDetailsMapper::toDto);
    }

    /**
     * Delete the invoiceDetails by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete InvoiceDetails : {}", id);
        invoiceDetailsRepository.deleteById(id);
    }

    // AnhVD new code
	@Override
	public List<InvoiceDetailsDTO> getInvoiceDetailsByHeaderId(Long id) {
		return invoiceDetailsMapper.toDto(invoiceDetailsRepository.getInvoiceDetailsByHeaderId(id));
	}
}
