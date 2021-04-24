package com.fu.capstone.service.impl;

import com.fu.capstone.service.InvoiceHeaderService;
import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.domain.Office;
import com.fu.capstone.domain.PersonalShipment;
import com.fu.capstone.domain.Street;
import com.fu.capstone.repository.InvoiceDetailsRepository;
import com.fu.capstone.repository.InvoiceHeaderRepository;
import com.fu.capstone.repository.InvoicePackageRepository;
import com.fu.capstone.repository.OfficeRepository;
import com.fu.capstone.repository.PersonalShipmentRepository;
import com.fu.capstone.repository.StreetRepository;
import com.fu.capstone.service.dto.InvoiceDetailsDTO;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;
import com.fu.capstone.service.dto.InvoicePackageDTO;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
	
	private OfficeRepository officeRepository;
	
	private InvoiceHeaderMapper invoiceHeaderMapper;
	
	private InvoiceDetailsMapper invoiceDetailsMapper;
	
	private InvoicePackageMapper invoicePackageMapper;
	
	private PersonalShipmentMapper personalShipmentMapper;

	public InvoiceHeaderServiceImpl(InvoiceHeaderRepository invoiceHeaderRepository, InvoiceHeaderMapper invoiceHeaderMapper, 
			InvoiceDetailsRepository invoiceDetailsRepository, InvoiceDetailsMapper invoiceDetailsMapper, 
			InvoicePackageRepository invoicePackageRepository, InvoicePackageMapper invoicePackageMapper,
			PersonalShipmentRepository personalShipmentRepository, PersonalShipmentMapper personalShipmentMapper,
			StreetRepository streetRepository, OfficeRepository officeRepository) {
		this.invoiceHeaderRepository = invoiceHeaderRepository;
		this.invoiceHeaderMapper = invoiceHeaderMapper;
		this.invoiceDetailsRepository = invoiceDetailsRepository;
		this.invoiceDetailsMapper = invoiceDetailsMapper;
		this.invoicePackageRepository = invoicePackageRepository;
		this.invoicePackageMapper = invoicePackageMapper;
		this.personalShipmentRepository = personalShipmentRepository;
		this.personalShipmentMapper = personalShipmentMapper;
		this.streetRepository = streetRepository;
		this.officeRepository = officeRepository;
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
		Instant instant = Instant.now();
		if(invoiceHeader.getId() == null){
			invoiceHeader.setCreateDate(instant);
			invoiceHeader.setUpdateDate(instant);
			invoiceHeader.setDueDate(instant.plus(7, ChronoUnit.DAYS));
		}
		else invoiceHeader.setUpdateDate(instant);
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
		InvoiceHeaderDTO invoiceHeaderDTO = invoicePackageDetailDTO.getHeader();
		List<InvoiceDetailsDTO> lstDetailDTO = invoicePackageDetailDTO.getLstDetail();
		List<InvoicePackageDTO> lstPackageDTO = invoicePackageDetailDTO.getLstPackage();
		Street fromStreet = streetRepository.getFullAddressByStreetId(invoiceHeaderDTO.getStartStreetId());
		Street toStreet = streetRepository.getFullAddressByStreetId(invoiceHeaderDTO.getDestinationStreetId());
		
		// create invoice and get invoice with ID
		invoiceHeaderDTO = this.save(invoiceHeaderDTO);		
		
		// set invoice id for package and detail
		Instant instant = Instant.now();
		for(InvoiceDetailsDTO i : lstDetailDTO) {
			i.setInvoiceHeaderId(invoiceHeaderDTO.getId());
			if(i.getId() == null){
				i.setCreateDate(instant);
				i.setUpdateDate(instant);
			}
			else i.setUpdateDate(instant);
		}
		for(InvoicePackageDTO i : lstPackageDTO) {
			i.setInvoiceHeaderId(invoiceHeaderDTO.getId());
			if(i.getId() == null){
				i.setCreateDate(instant);
				i.setUpdateDate(instant);
			}
			else i.setUpdateDate(instant);
		}
		
		// process data
		BigDecimal subTotal = calculateSubTotal(lstPackageDTO, fromStreet, toStreet);
		invoiceHeaderDTO.setSubTotal(subTotal);
		invoiceHeaderDTO.setTaxAmount(subTotal.multiply(new BigDecimal(0.1)));
		invoiceHeaderDTO.setTotalDue(subTotal.add(invoiceHeaderDTO.getTaxAmount()));
		
		// get employee id
		if (invoiceHeaderDTO.getId() == null) {
			Office ofc = officeRepository.searchOfficeNearby(fromStreet.getId(), 
					fromStreet.getSubDistrictId().getId(), 
					fromStreet.getSubDistrictId().getDistrictId().getId(), 
					fromStreet.getSubDistrictId().getDistrictId().getProvinceId().getId());
			if(ofc != null) invoiceHeaderDTO.setOfficeId(ofc.getId());
		}
		
		// save data
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
		invoiceDetailsRepository.saveAll(invoiceDetailsMapper.toEntity(lstDetailDTO));
		invoicePackageRepository.saveAll(invoicePackageMapper.toEntity(lstPackageDTO));
		
		// process invoice header no and save
		String invNo = "INV" + LocalDate.now().getYear() + "-" + String.format("%010d", invoiceHeaderDTO.getId());
		invoiceHeaderDTO.setInvoiceNo(invNo);
		invoiceHeaderDTO = this.save(invoiceHeaderDTO);
		
		return invoiceHeaderDTO;
	}
	
	private BigDecimal calculateSubTotal(List<InvoicePackageDTO> lstPackage, Street fromStreet, Street toStreet) {
		BigDecimal result = new BigDecimal(0);
		float totalWeight = 0;
		for (InvoicePackageDTO ip : lstPackage) {
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

	@Override
	public List<InvoiceHeaderDTO> saveInvoiceHeadersApproved(List<InvoiceHeaderDTO> invoiceHeadersDTO) {
		List<InvoiceHeader> result = invoiceHeaderMapper.toEntity(invoiceHeadersDTO);
		for(InvoiceHeader i : result) i.setUpdateDate(Instant.now());
		result = invoiceHeaderRepository.saveAll(result);
		return invoiceHeaderMapper.toDto(result);
	}

	@Override
	public Page<InvoiceHeaderDTO> getInvoiceHeadersByCustomer(Long id, Pageable pageable) {
		return invoiceHeaderRepository.getInvoiceHeadersByCustomer(id, pageable).map(invoiceHeaderMapper::toDto);
	}

}
