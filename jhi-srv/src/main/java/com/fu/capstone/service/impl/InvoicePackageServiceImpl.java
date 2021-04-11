package com.fu.capstone.service.impl;

import com.fu.capstone.service.InvoicePackageService;
import com.fu.capstone.domain.InvoicePackage;
import com.fu.capstone.repository.InvoicePackageRepository;
import com.fu.capstone.service.dto.InvoicePackageDTO;
import com.fu.capstone.service.mapper.InvoicePackageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing InvoicePackage.
 */
@Service
@Transactional
public class InvoicePackageServiceImpl implements InvoicePackageService {

    private final Logger log = LoggerFactory.getLogger(InvoicePackageServiceImpl.class);

    private InvoicePackageRepository invoicePackageRepository;

    private InvoicePackageMapper invoicePackageMapper;

    public InvoicePackageServiceImpl(InvoicePackageRepository invoicePackageRepository, InvoicePackageMapper invoicePackageMapper) {
        this.invoicePackageRepository = invoicePackageRepository;
        this.invoicePackageMapper = invoicePackageMapper;
    }

    /**
     * Save a invoicePackage.
     *
     * @param invoicePackageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public InvoicePackageDTO save(InvoicePackageDTO invoicePackageDTO) {
        log.debug("Request to save InvoicePackage : {}", invoicePackageDTO);

        InvoicePackage invoicePackage = invoicePackageMapper.toEntity(invoicePackageDTO);
        invoicePackage = invoicePackageRepository.save(invoicePackage);
        return invoicePackageMapper.toDto(invoicePackage);
    }

    /**
     * Get all the invoicePackages.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<InvoicePackageDTO> findAll() {
        log.debug("Request to get all InvoicePackages");
        return invoicePackageRepository.findAll().stream()
            .map(invoicePackageMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one invoicePackage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<InvoicePackageDTO> findOne(Long id) {
        log.debug("Request to get InvoicePackage : {}", id);
        return invoicePackageRepository.findById(id)
            .map(invoicePackageMapper::toDto);
    }

    /**
     * Delete the invoicePackage by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete InvoicePackage : {}", id);
        invoicePackageRepository.deleteById(id);
    }
    
    // AnhVD new code

	@Override
	public List<InvoicePackageDTO> getInvoicePackageByHeaderId(Long id) {
		return invoicePackageMapper.toDto(invoicePackageRepository.getInvoicePackageByHeaderId(id));
	}
}
