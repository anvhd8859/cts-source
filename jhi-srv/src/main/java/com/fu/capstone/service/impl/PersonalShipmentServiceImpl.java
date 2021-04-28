package com.fu.capstone.service.impl;

import com.fu.capstone.service.PersonalShipmentService;
import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.domain.PersonalShipment;
import com.fu.capstone.repository.InvoiceHeaderRepository;
import com.fu.capstone.repository.PersonalShipmentRepository;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;
import com.fu.capstone.service.dto.PersonalShipmentDTO;
import com.fu.capstone.service.dto.PersonalShipmentInvoiceDTO;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import com.fu.capstone.service.mapper.PersonalShipmentMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Optional;

/**
 * Service Implementation for managing PersonalShipment.
 */
@Service
@Transactional
public class PersonalShipmentServiceImpl implements PersonalShipmentService {

    private final Logger log = LoggerFactory.getLogger(PersonalShipmentServiceImpl.class);
    
    private InvoiceHeaderRepository invoiceHeaderRepository;

    private InvoiceHeaderMapper invoiceHeaderMapper;

    private PersonalShipmentRepository personalShipmentRepository;

    private PersonalShipmentMapper personalShipmentMapper;

    public PersonalShipmentServiceImpl(PersonalShipmentRepository personalShipmentRepository, PersonalShipmentMapper personalShipmentMapper,
    		InvoiceHeaderRepository invoiceHeaderRepository, InvoiceHeaderMapper invoiceHeaderMapper) {
        this.personalShipmentRepository = personalShipmentRepository;
        this.personalShipmentMapper = personalShipmentMapper;
        this.invoiceHeaderRepository = invoiceHeaderRepository;
        this.invoiceHeaderMapper = invoiceHeaderMapper;
    }

    /**
     * Save a personalShipment.
     *
     * @param personalShipmentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PersonalShipmentDTO save(PersonalShipmentDTO personalShipmentDTO) {
        log.debug("Request to save PersonalShipment : {}", personalShipmentDTO);

        PersonalShipment personalShipment = personalShipmentMapper.toEntity(personalShipmentDTO);
		Instant instant = Instant.now();
		if(personalShipment.getId() == null){
			personalShipment.setCreateDate(instant);
			personalShipment.setUpdateDate(instant);
		}
		else personalShipment.setUpdateDate(instant);
        personalShipment = personalShipmentRepository.save(personalShipment);
        return personalShipmentMapper.toDto(personalShipment);
    }

    /**
     * Get all the personalShipments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PersonalShipmentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PersonalShipments");
        return personalShipmentRepository.findAll(pageable)
            .map(personalShipmentMapper::toDto);
    }


    /**
     * Get one personalShipment by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PersonalShipmentDTO> findOne(Long id) {
        log.debug("Request to get PersonalShipment : {}", id);
        return personalShipmentRepository.findById(id)
            .map(personalShipmentMapper::toDto);
    }

    /**
     * Delete the personalShipment by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PersonalShipment : {}", id);
        personalShipmentRepository.deleteById(id);
    }

    
    // START TuyenVNT 14/04/2021
 	@Override
 	public Page<PersonalShipmentDTO> getPersonalShipmentByHeaderId(Long id, Pageable pageable) {
 		return personalShipmentRepository.getPersonalShipmentByHeaderId(id, pageable)
				.map(personalShipmentMapper::toDto);
 	}
 	// END TuyenVNT 16/04/2021
 	
 	// START TuyenVNT 16/04/2021
 	@Override
 	public Page<PersonalShipmentDTO> getPersonalShipmentNotAssigned(Pageable pageable) {
 		return personalShipmentRepository.getPersonalShipmentNotAssigned(pageable)
				.map(personalShipmentMapper::toDto);
 	}
 	// END TuyenVNT 16/04/2021


	@Override
	public Page<PersonalShipmentInvoiceDTO> getPersonalShipmentByShipper(Long id, String invNo, String type, Pageable pageable) {
		Page<PersonalShipmentDTO> page = personalShipmentRepository.getPersonalShipmentByShipper(id, invNo, type, pageable)
					.map(personalShipmentMapper::toDto);
		
		Page<PersonalShipmentInvoiceDTO> result = page.map(this::convert);
		return result;
	}
	private PersonalShipmentInvoiceDTO convert(PersonalShipmentDTO entity) {
		PersonalShipmentInvoiceDTO dto = new PersonalShipmentInvoiceDTO();
        InvoiceHeaderDTO invDTO = invoiceHeaderMapper.toDto(invoiceHeaderRepository.getOne(entity.getInvoiceHeaderId()));
        dto.setPersonalShipmentDTO(entity);
        dto.setInvoiceHeaderDTO(invDTO);
        return dto;
    }

	@Override
	public PersonalShipmentDTO createCollectPersonalShipmentForInvoice(Long id) {
		PersonalShipment ps = new PersonalShipment();
		ps.setInvoiceHeaderId(id);
		ps.setShipmentType("collect");
		ps.setStatus("new");
		Instant instant = Instant.now();
		ps.setCreateDate(instant);
		ps.setUpdateDate(instant);
		// re-calculate total due 
		InvoiceHeader inv = invoiceHeaderRepository.findById(id).get();
		if(inv != null) {
			BigDecimal subTotal = inv.getSubTotal();
			subTotal = new BigDecimal(3000).add(subTotal.multiply(new BigDecimal(1.05)));
			invoiceHeaderRepository.save(inv);
		}
		return personalShipmentMapper.toDto(personalShipmentRepository.save(ps));
	}

	@Override
	public Page<PersonalShipmentInvoiceDTO> getAllPersonaShipmentInvoices(Long empId, String invNo, Long strId, String type, Pageable pageable) {
		Page<PersonalShipment> pgShipment = personalShipmentRepository.getAllPersonaShipmentInvoices(empId, invNo, strId, type, pageable);
		return pgShipment.map(this::convertPersonalShipmentToPersonalShipmentInvoiceDTO);
	}
	private PersonalShipmentInvoiceDTO convertPersonalShipmentToPersonalShipmentInvoiceDTO(PersonalShipment entity){
		PersonalShipmentInvoiceDTO result = new PersonalShipmentInvoiceDTO();
		result.setPersonalShipmentDTO(personalShipmentMapper.toDto(entity));
		result.setInvoiceHeaderDTO(invoiceHeaderMapper.toDto(invoiceHeaderRepository.getOne(entity.getInvoiceHeaderId())));
		return result;
	}

}
