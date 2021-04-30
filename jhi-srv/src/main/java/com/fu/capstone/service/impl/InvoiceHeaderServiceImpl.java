package com.fu.capstone.service.impl;

import com.fu.capstone.service.InvoiceHeaderService;
import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.domain.InvoicePackage;
import com.fu.capstone.domain.Office;
import com.fu.capstone.domain.PersonalShipment;
import com.fu.capstone.domain.Street;
import com.fu.capstone.domain.WorkingArea;
import com.fu.capstone.repository.InvoiceDetailsRepository;
import com.fu.capstone.repository.InvoiceHeaderRepository;
import com.fu.capstone.repository.InvoicePackageRepository;
import com.fu.capstone.repository.OfficeRepository;
import com.fu.capstone.repository.PersonalShipmentRepository;
import com.fu.capstone.repository.StreetRepository;
import com.fu.capstone.repository.WorkingAreaRepository;
import com.fu.capstone.service.dto.InvoiceDetailsDTO;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;
import com.fu.capstone.service.dto.InvoicePackageDTO;
import com.fu.capstone.service.dto.InvoicePackageDetailDTO;
import com.fu.capstone.service.dto.InvoiceShipmentDTO;
import com.fu.capstone.service.dto.PackageDetailsDTO;
import com.fu.capstone.service.dto.PersonalShipmentDTO;
import com.fu.capstone.service.mapper.InvoiceDetailsMapper;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import com.fu.capstone.service.mapper.InvoicePackageMapper;
import com.fu.capstone.service.mapper.PersonalShipmentMapper;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;

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

	private WorkingAreaRepository workingAreaRepository;

	private InvoiceHeaderMapper invoiceHeaderMapper;

	private InvoiceDetailsMapper invoiceDetailsMapper;

	private InvoicePackageMapper invoicePackageMapper;

	private PersonalShipmentMapper personalShipmentMapper;

	public InvoiceHeaderServiceImpl(InvoiceHeaderRepository invoiceHeaderRepository,
			InvoiceHeaderMapper invoiceHeaderMapper, InvoiceDetailsRepository invoiceDetailsRepository,
			InvoiceDetailsMapper invoiceDetailsMapper, InvoicePackageRepository invoicePackageRepository,
			InvoicePackageMapper invoicePackageMapper, PersonalShipmentRepository personalShipmentRepository,
			PersonalShipmentMapper personalShipmentMapper, StreetRepository streetRepository,
			OfficeRepository officeRepository, WorkingAreaRepository workingAreaRepository) {
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
		this.workingAreaRepository = workingAreaRepository;
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
		if (invoiceHeader.getId() == null) {
			invoiceHeader.setCreateDate(instant);
			invoiceHeader.setUpdateDate(instant);
			invoiceHeader.setDueDate(instant.plus(7, ChronoUnit.DAYS));
		} else
			invoiceHeader.setUpdateDate(instant);
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
		Page<InvoiceHeaderDTO> invoicePage = invoiceHeaderRepository
				.getInvoiceHeadersByShipper(id, invNo, type, pageable).map(invoiceHeaderMapper::toDto);
		Page<InvoiceShipmentDTO> dtoPage = invoicePage.map(this::convert);
		return dtoPage;
	}

	// convert
	private InvoiceShipmentDTO convert(InvoiceHeaderDTO value) {
		InvoiceShipmentDTO isDTO = new InvoiceShipmentDTO();
		List<PersonalShipmentDTO> psDTO = personalShipmentMapper
				.toDto(personalShipmentRepository.getShipmentByInvoice(value.getId()));
		isDTO.setInvoiceHeader(value);
		isDTO.setPersonalShipmentList(psDTO);
		return isDTO;
	}
	// end function

	@Override
	public Page<InvoiceHeaderDTO> getInvoiceHeadersRequestCancel(Pageable pageable) {
		return invoiceHeaderRepository.getInvoiceHeadersRequestCancel(pageable).map(invoiceHeaderMapper::toDto);
	}

	@Override
	public InvoiceHeaderDTO createInvoiceHeaderDetailPackage(InvoicePackageDetailDTO invoicePackageDetailDTO,
			int check) {
		// get data from web
		InvoiceHeaderDTO invoiceHeaderDTO = invoicePackageDetailDTO.getInvoice();
		List<PackageDetailsDTO> lstPackageDetails = invoicePackageDetailDTO.getPackageList();
		List<InvoiceDetailsDTO> lstDetailDTO = new ArrayList<>();
		Street fromStreet = streetRepository.getFullAddressByStreetId(invoiceHeaderDTO.getStartStreetId());
		Street toStreet = streetRepository.getFullAddressByStreetId(invoiceHeaderDTO.getDestinationStreetId());

		// get destination office id
		if (invoiceHeaderDTO.getId() == null) {
			Office ofc = officeRepository.searchOfficeNearby(toStreet.getId(), toStreet.getSubDistrictId().getId(),
					toStreet.getSubDistrictId().getDistrictId().getId(),
					toStreet.getSubDistrictId().getDistrictId().getProvinceId().getId());
			invoiceHeaderDTO.setDestinationOfficeId(ofc.getId());
			invoiceHeaderDTO.setStatus("waiting");
		}

		// check online of offline create invoice
		if (invoiceHeaderDTO.getEmployeeId() != null)
			invoiceHeaderDTO.setStatus("collected");

		// create invoice and get invoice with ID
		invoiceHeaderDTO = this.save(invoiceHeaderDTO);
		List<PersonalShipment> lstShipment = new ArrayList<>();

		// set invoice id for package and detail
		Instant instant = Instant.now();
		for (PackageDetailsDTO i : lstPackageDetails) {
			InvoicePackageDTO ip = i.getInvPackage();
			ip.setInvoiceHeaderId(invoiceHeaderDTO.getId());
			if (ip.getId() == null) {
				ip.setCreateDate(instant);
				ip.setUpdateDate(instant);
			} else
				ip.setUpdateDate(instant);
			ip = invoicePackageMapper.toDto(invoicePackageRepository.save(invoicePackageMapper.toEntity(ip)));
			for (InvoiceDetailsDTO id : i.getItemList()) {
				id.setInvoiceHeaderId(invoiceHeaderDTO.getId());
				id.setInvoicePackageId(ip.getId());
				if (id.getId() == null) {
					id.setCreateDate(instant);
					id.setUpdateDate(instant);
				} else
					id.setUpdateDate(instant);
				lstDetailDTO.add(id);
			}
		}

		// process data
		BigDecimal subTotal = calculateSubTotal(lstPackageDetails, fromStreet, toStreet);
		invoiceHeaderDTO.setSubTotal(subTotal);
		if (check > 0) {
			// find near office
			Office ofc = officeRepository.searchOfficeNearby(fromStreet.getId(), fromStreet.getSubDistrictId().getId(),
					fromStreet.getSubDistrictId().getDistrictId().getId(),
					fromStreet.getSubDistrictId().getDistrictId().getProvinceId().getId());
			invoiceHeaderDTO.setOfficeId(ofc.getId());

			// process collect shipment and sub total fee
			PersonalShipment ps = new PersonalShipment();
			ps.setInvoiceHeaderId(invoiceHeaderDTO.getId());
			ps.setShipmentType("collect");
			ps.setStatus("new");
			ps.setCreateDate(instant);
			ps.setUpdateDate(instant);

			// get employee and add to shipment
			WorkingArea wa = workingAreaRepository.getEmployeeNearBy(fromStreet.getId(),
					fromStreet.getSubDistrictId().getId(), fromStreet.getSubDistrictId().getDistrictId().getId(),
					fromStreet.getSubDistrictId().getDistrictId().getProvinceId().getId());
			ps.setEmployeeId(wa.getEmployeeId());
			subTotal = new BigDecimal(3000).add(subTotal.multiply(new BigDecimal(1.07)));
			lstShipment.add(ps);
		}
		float totalWeight = 0;
		for (PackageDetailsDTO ip : lstPackageDetails) {
			totalWeight += ip.getInvPackage().getWeight();
		}
		invoiceHeaderDTO.setTaxAmount(subTotal.multiply(new BigDecimal(0.1)));
		invoiceHeaderDTO.setTotalDue(subTotal.add(new BigDecimal(1.1)));
		invoiceHeaderDTO.setNote(invoiceHeaderDTO.getNote() + "|total = " + totalWeight);

		// save data
		PersonalShipment psDelivery = new PersonalShipment();
		psDelivery.setInvoiceHeaderId(invoiceHeaderDTO.getId());
		psDelivery.setStatus("new");
		psDelivery.setShipmentType("delivery");
		psDelivery.setCreateDate(instant);
		psDelivery.setUpdateDate(instant);
		WorkingArea wa = workingAreaRepository.getEmployeeNearBy(toStreet.getId(), toStreet.getSubDistrictId().getId(),
				toStreet.getSubDistrictId().getDistrictId().getId(),
				toStreet.getSubDistrictId().getDistrictId().getProvinceId().getId());
		psDelivery.setEmployeeId(wa.getEmployeeId());
		lstShipment.add(psDelivery);

		personalShipmentRepository.saveAll(lstShipment);
		invoiceDetailsRepository.saveAll(invoiceDetailsMapper.toEntity(lstDetailDTO));

		// process invoice header no and save
		String invNo = "INV" + LocalDate.now().getYear() + "-" + String.format("%010d", invoiceHeaderDTO.getId());
		invoiceHeaderDTO.setInvoiceNo(invNo);
		invoiceHeaderDTO = this.save(invoiceHeaderDTO);

		return invoiceHeaderDTO;
	}

	private BigDecimal calculateSubTotal(List<PackageDetailsDTO> lstPackage, Street fromStreet, Street toStreet) {
		BigDecimal result = new BigDecimal(0);
		float totalWeight = 0;
		for (PackageDetailsDTO ip : lstPackage) {
			totalWeight += ip.getInvPackage().getWeight();
		}
		totalWeight /= 1000;
		if (fromStreet.getSubDistrictId().getDistrictId().getProvinceId().getId() == toStreet.getSubDistrictId()
				.getDistrictId().getProvinceId().getId()) {
			if (totalWeight <= 0.25)
				result = new BigDecimal(9000);
			else if (totalWeight <= 0.50)
				result = new BigDecimal(13000);
			else if (totalWeight <= 1.00)
				result = new BigDecimal(16000);
			else if (totalWeight <= 1.50)
				result = new BigDecimal(25000);
			else if (totalWeight <= 2.00)
				result = new BigDecimal(29000);
			else if (totalWeight <= 100.00)
				result = new BigDecimal(2600.0 * totalWeight);
			else
				result = new BigDecimal(1400.0 * totalWeight);
		} else {
			if (totalWeight <= 0.25)
				result = new BigDecimal(10000);
			else if (totalWeight <= 0.50)
				result = new BigDecimal(14000);
			else if (totalWeight <= 1.00)
				result = new BigDecimal(17000);
			else if (totalWeight <= 1.50)
				result = new BigDecimal(26000);
			else if (totalWeight <= 2.00)
				result = new BigDecimal(30000);
			else if (totalWeight <= 100.00)
				result = new BigDecimal(5000.0 * totalWeight);
			else
				result = new BigDecimal(3200.0 * totalWeight);
		}
		return result;
	}

	@Override
	public List<InvoiceHeaderDTO> saveInvoiceHeadersApproved(List<InvoiceHeaderDTO> invoiceHeadersDTO) {
		List<InvoiceHeader> result = invoiceHeaderMapper.toEntity(invoiceHeadersDTO);
		for (InvoiceHeader i : result) {
			i.setUpdateDate(Instant.now());
			i.setChangeNote("approved");
			List<PersonalShipment> shipmentList = personalShipmentRepository.getShipmentByInvoice(i.getId());
			List<InvoicePackage> packageList = invoicePackageRepository.getInvoicePackageByHeaderId(i.getId());
			for (InvoicePackage ii : packageList) {
				if (!ii.getStatus().equalsIgnoreCase("finish"))
					ii.setStatus("cancel");
			}
			for (PersonalShipment ii : shipmentList) {
				if (!ii.getStatus().equalsIgnoreCase("finish"))
					ii.setStatus("cancel");
			}
		}
		result = invoiceHeaderRepository.saveAll(result);
		return invoiceHeaderMapper.toDto(result);
	}

	@Override
	public Page<InvoiceHeaderDTO> getInvoiceHeadersByCustomer(Long id, Pageable pageable) {
		return invoiceHeaderRepository.getInvoiceHeadersByCustomer(id, pageable).map(invoiceHeaderMapper::toDto);
	}

	@Override
	public List<InvoiceHeaderDTO> saveListImportInvoiceHeader(List<InvoiceHeaderDTO> list) {
		List<InvoiceHeader> result = invoiceHeaderMapper.toEntity(list);
		for (InvoiceHeader i : result) {
			i.setUpdateDate(Instant.now());
			i.setStatus("last_import");
		}
		result = invoiceHeaderRepository.saveAll(result);
		return invoiceHeaderMapper.toDto(result);
	}

	@Override
	public InvoiceHeaderDTO updateFinishInvoicePersonalShipment(InvoiceHeaderDTO inv) {
		InvoiceHeader ih = invoiceHeaderRepository.getOne(inv.getId());
		if (!ih.getStatus().equalsIgnoreCase("delivering")) {
			throw new BadRequestAlertException("Invalid status", "InvoiceHeader", "status wrong");
		}
		PersonalShipment ps = personalShipmentRepository.getDeliveryShipmentByInvoice(inv.getId());
		Instant instant = Instant.now();
		ih.setStatus("finish");
		ps.setStatus("finish");
		ih.setFinishDate(instant);
		ih.setUpdateDate(instant);
		ps.setFinishTime(instant);
		ps.setUpdateDate(instant);
		personalShipmentRepository.save(ps);

		return invoiceHeaderMapper.toDto(invoiceHeaderRepository.save(ih));
	}

	@Override
	public Page<InvoicePackageDetailDTO> getInvoiceHeadersWaitingReview(Long id, Pageable pageable) {
		Page<InvoiceHeader> page = invoiceHeaderRepository.getInvoiceHeadersWaitingReview(id, pageable);
		return page.map(this::converterInvoicePackageDetailDTO);
	}

	private InvoicePackageDetailDTO converterInvoicePackageDetailDTO(InvoiceHeader inv) {
		InvoicePackageDetailDTO dto = new InvoicePackageDetailDTO();
		dto.setInvoice(invoiceHeaderMapper.toDto(inv));
		List<PackageDetailsDTO> packageList = new ArrayList<>();
		List<InvoicePackageDTO> pkDtoList = invoicePackageMapper
				.toDto(invoicePackageRepository.getInvoicePackageByHeaderId(inv.getId()));
		List<InvoiceDetailsDTO> idDtoList = invoiceDetailsMapper
				.toDto(invoiceDetailsRepository.getInvoiceDetailsByHeaderId(inv.getId()));
		for (InvoicePackageDTO ip : pkDtoList) {
			PackageDetailsDTO p = new PackageDetailsDTO();
			p.setInvPackage(ip);
			p.setItemList(new ArrayList<>());
			for (InvoiceDetailsDTO id : idDtoList) {
				if (id.getInvoicePackageId() == ip.getId())
					p.getItemList().add(id);
			}
			packageList.add(p);
		}
		dto.setPackageList(packageList);
		return dto;
	}

	@Override
	public InvoiceHeaderDTO updateInvoiceHeadersReview(InvoicePackageDetailDTO invoice) {
		InvoiceHeader entity = invoiceHeaderMapper.toEntity(invoice.getInvoice());
		if (invoicePackageRepository.getInvoicePackageByHeaderId(entity.getId()).size() == 2) {
			entity.setStatus("collect");
		}
		else {
			entity.setStatus("receive");
		}
		entity.setUpdateDate(Instant.now());
		entity.setReviewDate(Instant.now());
		return invoiceHeaderMapper.toDto(invoiceHeaderRepository.save(entity));
	}

}
