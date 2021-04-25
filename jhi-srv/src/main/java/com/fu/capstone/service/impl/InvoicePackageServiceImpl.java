package com.fu.capstone.service.impl;

import com.fu.capstone.service.InvoicePackageService;
import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.domain.InvoicePackage;
import com.fu.capstone.repository.InvoiceHeaderRepository;
import com.fu.capstone.repository.InvoicePackageRepository;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;
import com.fu.capstone.service.dto.InvoicePackageDTO;
import com.fu.capstone.service.dto.InvoicePackageShipmentDTO;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import com.fu.capstone.service.mapper.InvoicePackageMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
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
    
    private InvoiceHeaderRepository invoiceHeaderRepository;

    private InvoicePackageMapper invoicePackageMapper;
    
    private InvoiceHeaderMapper invoiceHeaderMapper;

    public InvoicePackageServiceImpl(InvoicePackageRepository invoicePackageRepository, InvoicePackageMapper invoicePackageMapper,
    		InvoiceHeaderRepository invoiceHeaderRepository, InvoiceHeaderMapper invoiceHeaderMapper) {
        this.invoicePackageRepository = invoicePackageRepository;
        this.invoicePackageMapper = invoicePackageMapper;
        this.invoiceHeaderRepository = invoiceHeaderRepository;
        this.invoiceHeaderMapper = invoiceHeaderMapper;
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
		Instant instant = Instant.now();
		if(invoicePackage.getId() == null){
			invoicePackage.setCreateDate(instant);
			invoicePackage.setUpdateDate(instant);
		}
		else invoicePackage.setUpdateDate(instant);
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
		return invoicePackageMapper.toDto(
				invoicePackageRepository.getInvoicePackageByHeaderId(id));
	}


	@Override
	public List<InvoicePackageShipmentDTO> putImportPackageByOfficeId(
			List<InvoicePackageShipmentDTO> invoicePackageDTO) {
		Instant instant = Instant.now();
		List<InvoiceHeaderDTO> invoiceList = new ArrayList<>();
		List<InvoicePackageDTO> packageList = new ArrayList<>();
		for(InvoicePackageShipmentDTO i : invoicePackageDTO) {
			i.getInvoiceHeader().setUpdateDate(instant);
			if(i.getInvoiceHeader().getStatus().equalsIgnoreCase("collected")) {
				i.getInvoiceHeader().setStatus("first_import");
			}
			if(i.getInvoiceHeader().getStatus().equalsIgnoreCase("transporting") || 
					i.getInvoiceHeader().getStatus().equalsIgnoreCase("delivering")) {
				i.getInvoiceHeader().setStatus("last_import");
			}
			invoiceList.add(i.getInvoiceHeader());
			for(InvoicePackageDTO p : i.getInvoicePackageList()) {
				p.setUpdateDate(instant);
				if(i.getInvoiceHeader().getStatus().equalsIgnoreCase("collected")) {
					p.setStatus("first_import");
				}
				if(i.getInvoiceHeader().getStatus().equalsIgnoreCase("transporting") || 
						i.getInvoiceHeader().getStatus().equalsIgnoreCase("delivering")) {
					p.setStatus("last_import");
				}
				packageList.add(p);
			}
		}
		invoiceHeaderRepository.saveAll(invoiceHeaderMapper.toEntity(invoiceList));
		invoicePackageRepository.saveAll(invoicePackageMapper.toEntity(packageList));
		return invoicePackageDTO;
	}
	@Override
	public Page<InvoicePackageShipmentDTO> getImportPackageByOfficeId(Long id, String invNo, String status, Pageable pageable) {
		Page<InvoiceHeaderDTO> pageInvoice = invoiceHeaderRepository
				.getImportPackageByOfficeId(id, invNo, status, pageable).map(invoiceHeaderMapper::toDto);
		Page<InvoicePackageShipmentDTO> page = pageInvoice.map(this::convert);
		return page;
	}


	@Override
	public List<InvoicePackageShipmentDTO> putExportPackageByOfficeId(
			List<InvoicePackageShipmentDTO> invoicePackageDTO) {
		Instant instant = Instant.now();
		List<InvoiceHeaderDTO> invoiceList = new ArrayList<>();
		List<InvoicePackageDTO> packageList = new ArrayList<>();
		for(InvoicePackageShipmentDTO i : invoicePackageDTO) {
			i.getInvoiceHeader().setUpdateDate(instant);
			for(InvoicePackageDTO p : i.getInvoicePackageList()) {
				p.setUpdateDate(instant);
				if(i.getInvoiceHeader().getStatus().equalsIgnoreCase("first_import")) {
					p.setStatus("transporting");
				}
				if(i.getInvoiceHeader().getStatus().equalsIgnoreCase("last_import")) {
					p.setStatus("delivering");
				}
				packageList.add(p);
			}
			if(i.getInvoiceHeader().getStatus().equalsIgnoreCase("first_import")) {
				i.getInvoiceHeader().setStatus("transporting");
			}
			if(i.getInvoiceHeader().getStatus().equalsIgnoreCase("last_import")) {
				i.getInvoiceHeader().setStatus("delivering");
			}
			invoiceList.add(i.getInvoiceHeader());
		}
		invoiceHeaderRepository.saveAll(invoiceHeaderMapper.toEntity(invoiceList));
		invoicePackageRepository.saveAll(invoicePackageMapper.toEntity(packageList));
		return invoicePackageDTO;
	}
	@Override
	public Page<InvoicePackageShipmentDTO> getExportPackageByOfficeId(Long id, String invNo, String status,
			Pageable pageable) {
		Page<InvoiceHeaderDTO> pageInvoice = invoiceHeaderRepository
				.getExportPackageByOfficeId(id, invNo, status, pageable).map(invoiceHeaderMapper::toDto);
		Page<InvoicePackageShipmentDTO> page = pageInvoice.map(this::convert);
		return page;
	}


	private InvoicePackageShipmentDTO convert (InvoiceHeaderDTO value) {
		InvoicePackageShipmentDTO resultDTO = new InvoicePackageShipmentDTO();
		List<InvoicePackageDTO> lstPackage = invoicePackageMapper.toDto(
				invoicePackageRepository.getInvoicePackageByHeaderId(value.getId()));
		resultDTO.setInvoiceHeader(value);
		resultDTO.setInvoicePackageList(lstPackage);
		return resultDTO;
	}

	@Override
	public InvoiceHeaderDTO putImportOnePackage(Long id) {
		InvoiceHeader inv = invoiceHeaderRepository.getOne(id);
		List<InvoicePackage> invPackageList = invoicePackageRepository.getInvoicePackageByHeaderId(id);
		if(inv.getStatus().equalsIgnoreCase("transporting") || inv.getStatus().equalsIgnoreCase("delivering")) {
			inv.setStatus("last_import");
		}
		if(inv.getStatus().equalsIgnoreCase("collected")) {
			inv.setStatus("first_import");
		}
		for(InvoicePackage ip : invPackageList) {
			if(inv.getStatus().equalsIgnoreCase("transporting") || inv.getStatus().equalsIgnoreCase("delivering")) {
				ip.setStatus("last_import");
			}
			if(inv.getStatus().equalsIgnoreCase("collected")) {
				ip.setStatus("first_import");
			}
			ip.setUpdateDate(Instant.now());
		}
		inv.setUpdateDate(Instant.now());
		invoicePackageRepository.saveAll(invPackageList);
		return invoiceHeaderMapper.toDto(invoiceHeaderRepository.save(inv));
	}

	@Override
	public InvoiceHeaderDTO putExportOnePackage(Long id) {
		InvoiceHeader invoice = invoiceHeaderRepository.getOne(id);
		List<InvoicePackage> invPackageList = invoicePackageRepository.getInvoicePackageByHeaderId(invoice.getId());
		if(invoice.getStatus().equalsIgnoreCase("first_import")) {
			invoice.setStatus("transporting");
		}
		if(invoice.getStatus().equalsIgnoreCase("last_import")) {
			invoice.setStatus("delivering");
		}
		for(InvoicePackage ip : invPackageList) {
			if(invoice.getStatus().equalsIgnoreCase("first_import")) {
				ip.setStatus("transporting");
			}
			if(invoice.getStatus().equalsIgnoreCase("last_import")) {
				ip.setStatus("delivering");
			}
			ip.setUpdateDate(Instant.now());
		}
		invoice.setUpdateDate(Instant.now());
		invoicePackageRepository.saveAll(invPackageList);
		return invoiceHeaderMapper.toDto(invoiceHeaderRepository.save(invoice));
	}

}
