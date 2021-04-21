package com.fu.capstone.service.impl;

import com.fu.capstone.service.InvoiceHeaderService;
import com.fu.capstone.domain.InvoiceDetails;
import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.domain.InvoicePackage;
import com.fu.capstone.domain.PersonalShipment;
import com.fu.capstone.domain.Street;
import com.fu.capstone.repository.InvoiceDetailsRepository;
import com.fu.capstone.repository.InvoiceHeaderRepository;
import com.fu.capstone.repository.InvoicePackageRepository;
import com.fu.capstone.repository.PersonalShipmentRepository;
import com.fu.capstone.repository.StreetRepository;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;
import com.fu.capstone.service.dto.InvoicePackageDetailDTO;
import com.fu.capstone.service.dto.InvoiceShipmentDTO;
import com.fu.capstone.service.dto.PersonalShipmentDTO;
import com.fu.capstone.service.mapper.InvoiceDetailsMapper;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import com.fu.capstone.service.mapper.InvoicePackageMapper;
import com.fu.capstone.service.mapper.PersonalShipmentMapper;

import org.joda.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing InvoiceHeader.
 */
@Service
@Transactional
public class InvoiceHeaderServiceImpl implements InvoiceHeaderService {

	private final Logger log = LoggerFactory.getLogger(InvoiceHeaderServiceImpl.class);

	private InvoiceHeaderRepository invoiceHeaderRepository;

	private InvoiceDetailsRepository invoiceDetailsRepository;
	
	private InvoicePackageRepository invoicePackageRepository;
	
	private PersonalShipmentRepository personalShipmentRepository;
	
	private StreetRepository streetRepository;
	
	private InvoiceHeaderMapper invoiceHeaderMapper;
	
	private InvoiceDetailsMapper invoiceDetailsMapper;
	
	private InvoicePackageMapper invoicePackageMapper;
	
	private PersonalShipmentMapper personalShipmentMapper;

	public InvoiceHeaderServiceImpl(InvoiceHeaderRepository invoiceHeaderRepository, InvoiceHeaderMapper invoiceHeaderMapper, 
			InvoiceDetailsRepository invoiceDetailsRepository, InvoiceDetailsMapper invoiceDetailsMapper, 
			InvoicePackageRepository invoicePackageRepository, InvoicePackageMapper invoicePackageMapper,
			PersonalShipmentRepository personalShipmentRepository, PersonalShipmentMapper personalShipmentMapper,
			StreetRepository streetRepository) {
		this.invoiceHeaderRepository = invoiceHeaderRepository;
		this.invoiceHeaderMapper = invoiceHeaderMapper;
		this.invoiceDetailsRepository = invoiceDetailsRepository;
		this.invoiceDetailsMapper = invoiceDetailsMapper;
		this.invoicePackageRepository = invoicePackageRepository;
		this.invoicePackageMapper = invoicePackageMapper;
		this.personalShipmentRepository = personalShipmentRepository;
		this.personalShipmentMapper = personalShipmentMapper;
		this.streetRepository = streetRepository;
	}

	/**
	 * Save a invoiceHeader.
	 *
	 * @param invoiceHeaderDTO
	 *            the entity to save
	 * @return the persisted entity
	 */
	@Override
	public InvoiceHeaderDTO save(InvoiceHeaderDTO invoiceHeaderDTO) {
		log.debug("Request to save InvoiceHeader : {}", invoiceHeaderDTO);

		InvoiceHeader invoiceHeader = invoiceHeaderMapper.toEntity(invoiceHeaderDTO);
		invoiceHeader = invoiceHeaderRepository.save(invoiceHeader);
		return invoiceHeaderMapper.toDto(invoiceHeader);
	}

	/**
	 * Get all the invoiceHeaders.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the list of entities
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<InvoiceHeaderDTO> findAll(Pageable pageable) {
		log.debug("Request to get all InvoiceHeaders");
		return invoiceHeaderRepository.findAll(pageable).map(invoiceHeaderMapper::toDto);
	}

	/**
	 * Get one invoiceHeader by id.
	 *
	 * @param id
	 *            the id of the entity
	 * @return the entity
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<InvoiceHeaderDTO> findOne(Long id) {
		log.debug("Request to get InvoiceHeader : {}", id);
		return invoiceHeaderRepository.findById(id).map(invoiceHeaderMapper::toDto);
	}

	/**
	 * Delete the invoiceHeader by id.
	 *
	 * @param id
	 *            the id of the entity
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request to delete InvoiceHeader : {}", id);
		invoiceHeaderRepository.deleteById(id);
	}

	// AnhVD new code
	@Override
	public Page<InvoiceHeaderDTO> getInvoiceHeadersByParams(String invoiceNo, String status, String receiveDate,
			String createDate, String updateDate, Pageable pageable) {
		return invoiceHeaderRepository
				.getInvoiceHeadersByParams(invoiceNo, status, receiveDate, createDate, updateDate, pageable)
				.map(invoiceHeaderMapper::toDto);
	}

	// DongPh code
	@Override
	public InvoiceHeaderDTO createNewInvoice(InvoiceHeaderDTO invoiceHeaderDTO) {
		log.debug("Request to save InvoiceHeader : {}", invoiceHeaderDTO);

		InvoiceHeader invoiceHeader = invoiceHeaderMapper.toEntity(invoiceHeaderDTO);
		invoiceHeader = invoiceHeaderRepository.save(invoiceHeader);
		// process invoice header no
		String invNo = "INV" + LocalDate.now().getYear() + "-" + String.format("%010d", invoiceHeader.getId());
		invoiceHeader.setInvoiceNo(invNo);
		// process invoice header no
		invoiceHeader = invoiceHeaderRepository.save(invoiceHeader);
		return invoiceHeaderMapper.toDto(invoiceHeader);
	}

	// start function
	@Override
	public Page<InvoiceShipmentDTO> getInvoiceHeadersByShipper(Long id, String invNo, String type, Pageable pageable) {
		Page<InvoiceHeaderDTO> invoicePage = invoiceHeaderRepository.getInvoiceHeadersByShipper(id, invNo, type, pageable)
				.map(invoiceHeaderMapper::toDto);
		Page<InvoiceShipmentDTO> dtoPage = invoicePage.map(this::convert);
		return dtoPage;
	}
	// convert
	private InvoiceShipmentDTO convert(InvoiceHeaderDTO value) {
		InvoiceShipmentDTO isDTO = new InvoiceShipmentDTO();
		List<PersonalShipmentDTO> psDTO = personalShipmentMapper.toDto(personalShipmentRepository
				.getShipmentByInvoice(value.getId()));
		isDTO.setInvoiceHeader(value);
		isDTO.setPersonalShipmentList(psDTO);
		return isDTO;
	}
	// end function

	@Override
	public Page<InvoiceHeaderDTO> getInvoiceHeadersRequestCancel(Pageable pageable) {
		return invoiceHeaderRepository.getInvoiceHeadersRequestCancel(pageable).map(invoiceHeaderMapper::toDto) ;
	}

	@Override
	public InvoiceHeaderDTO createInvoiceHeaderDetailPackage(InvoicePackageDetailDTO invoicePackageDetailDTO) {
		// get data from web
		InvoiceHeader invoiceHeader = invoiceHeaderMapper.toEntity(invoicePackageDetailDTO.getHeader());
		List<InvoiceDetails> lstDetail = invoiceDetailsMapper.toEntity(invoicePackageDetailDTO.getLstDetail());
		List<InvoicePackage> lstPackage = invoicePackageMapper.toEntity(invoicePackageDetailDTO.getLstPackage());
		Street fromStreet = streetRepository.getFullAddressByStreetId(invoiceHeader.getStartStreetId());
		Street toStreet = streetRepository.getFullAddressByStreetId(invoiceHeader.getDestinationStreetId());
		
		// process data
		BigDecimal subTotal = calculateSubTotal(lstPackage, fromStreet, toStreet);
		invoiceHeader.setSubTotal(subTotal);
		invoiceHeader.setTaxAmount(subTotal.multiply(new BigDecimal(0.1)));
		invoiceHeader.setTotalDue(subTotal.add(invoiceHeader.getTaxAmount()));
		
		// save data
		invoiceHeader = invoiceHeaderRepository.save(invoiceHeader);
		InvoiceHeaderDTO invoiceHeaderDTO = invoiceHeaderMapper.toDto(invoiceHeader);
		if(invoiceHeaderDTO.getStatus().equalsIgnoreCase("collect")){
			PersonalShipment psOne = new PersonalShipment();
			psOne.setStatus("waiting");
			psOne.setInvoiceHeaderId(invoiceHeaderDTO.getId());
			psOne.setShipmentType("collect");
			PersonalShipment psTwo = new PersonalShipment();
			psTwo.setStatus("waiting");
			psTwo.setInvoiceHeaderId(invoiceHeaderDTO.getId());
			psTwo.setShipmentType("delivery");
			List<PersonalShipment> lstShipment = new ArrayList<>();
			lstShipment.add(psOne);
			lstShipment.add(psTwo);
			personalShipmentRepository.saveAll(lstShipment);
		} else {
			PersonalShipment psTwo = new PersonalShipment();
			psTwo.setStatus("waiting");
			psTwo.setInvoiceHeaderId(invoiceHeaderDTO.getId());
			psTwo.setShipmentType("delivery");
			personalShipmentRepository.save(psTwo);
		}
		invoiceDetailsRepository.saveAll(lstDetail);
		invoicePackageRepository.saveAll(lstPackage);		
		return invoiceHeaderDTO;
	}
	
	private BigDecimal calculateSubTotal(List<InvoicePackage> lstPackage, Street fromStreet, Street toStreet) {
		BigDecimal result = new BigDecimal(0);
		float totalWeight = 0;
		for (InvoicePackage ip : lstPackage) {
			totalWeight += ip.getWeight();
		}
		if(fromStreet.getSubDistrictId().getDistrictId().getProvinceId().getId() == 
				toStreet.getSubDistrictId().getDistrictId().getProvinceId().getId()) {
			if(totalWeight <= 0.25) result = new BigDecimal(9000);
			else if(totalWeight <= 0.50) result = new BigDecimal(13000);
			else if(totalWeight <= 1.00) result = new BigDecimal(16000);
			else if(totalWeight <= 1.50) result = new BigDecimal(25000);
			else if(totalWeight <= 2.00) result = new BigDecimal(29000);
			else if(totalWeight <= 100.00) result = new BigDecimal(2600.0 * totalWeight);
			else result = new BigDecimal(1400.0 * totalWeight);
		} else {
			if(totalWeight <= 0.25) result = new BigDecimal(10000);
			else if(totalWeight <= 0.50) result = new BigDecimal(14000);
			else if(totalWeight <= 1.00) result = new BigDecimal(17000);
			else if(totalWeight <= 1.50) result = new BigDecimal(26000);
			else if(totalWeight <= 2.00) result = new BigDecimal(30000);
			else if(totalWeight <= 100.00) result = new BigDecimal(5000.0 * totalWeight);
			else result = new BigDecimal(3200.0 * totalWeight);
		}
		return result;
	}

}
