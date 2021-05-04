package com.fu.capstone.service.impl;

import com.fu.capstone.service.ImportExportWarehouseService;
import com.fu.capstone.domain.ImportExportWarehouse;
import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.domain.InvoicePackage;
import com.fu.capstone.domain.PersonalShipment;
import com.fu.capstone.domain.RequestDetails;
import com.fu.capstone.repository.ImportExportWarehouseRepository;
import com.fu.capstone.repository.InvoicePackageRepository;
import com.fu.capstone.repository.PersonalShipmentRepository;
import com.fu.capstone.repository.InvoiceHeaderRepository;
import com.fu.capstone.repository.RequestDetailsRepository;
import com.fu.capstone.service.dto.DetailsImportExportDTO;
import com.fu.capstone.service.dto.ImportExportWarehouseDTO;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;
import com.fu.capstone.service.dto.InvoicePackageDTO;
import com.fu.capstone.service.dto.InvoicePackageDetailDTO;
import com.fu.capstone.service.dto.PackageDetailsDTO;
import com.fu.capstone.service.dto.PersonalShipmentDTO;
import com.fu.capstone.service.dto.PersonalShipmentInvoiceDTO;
import com.fu.capstone.service.dto.RequestDetailsDTO;
import com.fu.capstone.service.mapper.ImportExportWarehouseMapper;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import com.fu.capstone.service.mapper.InvoicePackageMapper;
import com.fu.capstone.service.mapper.PersonalShipmentMapper;
import com.fu.capstone.service.mapper.RequestDetailsMapper;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing ImportExportWarehouse.
 */
@Service
@Transactional
public class ImportExportWarehouseServiceImpl implements ImportExportWarehouseService {

	private final Logger log = LoggerFactory.getLogger(ImportExportWarehouseServiceImpl.class);

	private ImportExportWarehouseRepository importExportWarehouseRepository;

	private ImportExportWarehouseMapper importExportWarehouseMapper;

	private RequestDetailsRepository requestDetailsRepository;

	private RequestDetailsMapper requestDetailsMapper;

	private InvoicePackageRepository invoicePackageRepository;

	private InvoicePackageMapper invoicePackageMapper;

	private InvoiceHeaderRepository invoiceHeaderRepository;

	private InvoiceHeaderMapper invoiceHeaderMapper;

	private PersonalShipmentRepository personalShipmentRepository;

	private PersonalShipmentMapper personalShipmentMapper;

	public ImportExportWarehouseServiceImpl(ImportExportWarehouseRepository importExportWarehouseRepository,
			ImportExportWarehouseMapper importExportWarehouseMapper, RequestDetailsRepository requestDetailsRepository,
			RequestDetailsMapper requestDetailsMapper, InvoicePackageRepository invoicePackageRepository,
			InvoicePackageMapper invoicePackageMapper, InvoiceHeaderRepository invoiceHeaderRepository,
			InvoiceHeaderMapper invoiceHeaderMapper, PersonalShipmentRepository personalShipmentRepository,
			PersonalShipmentMapper personalShipmentMapper) {
		this.importExportWarehouseRepository = importExportWarehouseRepository;
		this.importExportWarehouseMapper = importExportWarehouseMapper;
		this.requestDetailsRepository = requestDetailsRepository;
		this.requestDetailsMapper = requestDetailsMapper;
		this.invoicePackageRepository = invoicePackageRepository;
		this.invoicePackageMapper = invoicePackageMapper;
		this.invoiceHeaderRepository = invoiceHeaderRepository;
		this.invoiceHeaderMapper = invoiceHeaderMapper;
		this.personalShipmentRepository = personalShipmentRepository;
		this.personalShipmentMapper = personalShipmentMapper;
	}

	/**
	 * Save a importExportWarehouse.
	 *
	 * @param importExportWarehouseDTO
	 *            the entity to save
	 * @return the persisted entity
	 */
	@Override
	public ImportExportWarehouseDTO save(ImportExportWarehouseDTO importExportWarehouseDTO) {
		log.debug("Request to save ImportExportWarehouse : {}", importExportWarehouseDTO);

		ImportExportWarehouse importExportWarehouse = importExportWarehouseMapper.toEntity(importExportWarehouseDTO);
		importExportWarehouse = importExportWarehouseRepository.save(importExportWarehouse);
		return importExportWarehouseMapper.toDto(importExportWarehouse);
	}

	/**
	 * Get all the importExportWarehouses.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the list of entities
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<ImportExportWarehouseDTO> findAll(Pageable pageable) {
		log.debug("Request to get all ImportExportWarehouses");
		return importExportWarehouseRepository.findAll(pageable).map(importExportWarehouseMapper::toDto);
	}

	/**
	 * Get one importExportWarehouse by id.
	 *
	 * @param id
	 *            the id of the entity
	 * @return the entity
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<ImportExportWarehouseDTO> findOne(Long id) {
		log.debug("Request to get ImportExportWarehouse : {}", id);
		return importExportWarehouseRepository.findById(id).map(importExportWarehouseMapper::toDto);
	}

	/**
	 * Delete the importExportWarehouse by id.
	 *
	 * @param id
	 *            the id of the entity
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request to delete ImportExportWarehouse : {}", id);
		importExportWarehouseRepository.deleteById(id);
	}

	@Override
	public ImportExportWarehouseDTO createImportWarehouse(DetailsImportExportDTO importExportWarehouseDTO) {
		List<Long> list = new ArrayList<>();
		for (RequestDetailsDTO rd : importExportWarehouseDTO.getRequestDetailsList()) {
			list.add(rd.getShipmentId());
		}
		List<InvoiceHeader> lst = invoiceHeaderRepository.getInvoiceHeaderByListShipmentId(list);
		for(InvoiceHeader i : lst){
			if(!i.getFinish()) {
//				throw new BadRequestAlertException("Invalid ", "invoice", " is import ");
			}
			i.setFinish(false);
		}
		ImportExportWarehouse header = importExportWarehouseRepository
				.save(importExportWarehouseMapper.toEntity(importExportWarehouseDTO.getRequestHeader()));
		Instant instant = Instant.now();
		header.setCreateDate(instant);
		header.setUpdateDate(instant);
		header.setType("import");
		header.setShipperConfirm(true);
		header.setNote("");
		for (RequestDetailsDTO rd : importExportWarehouseDTO.getRequestDetailsList()) {
			rd.setIeWarehouseId(header.getId());
			rd.setCreateDate(instant);
			rd.setUpdateDate(instant);
		}
		for(InvoiceHeader i : lst){
			i.setFinish(false);
		}
		invoiceHeaderRepository.saveAll(lst);
		requestDetailsRepository
				.saveAll(requestDetailsMapper.toEntity(importExportWarehouseDTO.getRequestDetailsList()));
		return importExportWarehouseMapper.toDto(importExportWarehouseRepository.save(header));
	}

	@Override
	public ImportExportWarehouseDTO createExportWarehouse(DetailsImportExportDTO importExportWarehouseDTO) {
		List<Long> list = new ArrayList<>();
		for (RequestDetailsDTO rd : importExportWarehouseDTO.getRequestDetailsList()) {
			list.add(rd.getShipmentId());
		}
		List<InvoiceHeader> lst = invoiceHeaderRepository.getInvoiceHeaderByListShipmentId(list);
		for(InvoiceHeader i : lst){
			if(i.getFinish()) {
//				throw new BadRequestAlertException("Invalid ", "invoice", " is exported ");
			}
			i.setFinish(true);
		}
		ImportExportWarehouse header = importExportWarehouseRepository
				.save(importExportWarehouseMapper.toEntity(importExportWarehouseDTO.getRequestHeader()));
		Instant instant = Instant.now();
		header.setCreateDate(instant);
		header.setUpdateDate(instant);
		header.setType("export");
		header.setShipperConfirm(true);
		header.setNote("");
		for (RequestDetailsDTO rd : importExportWarehouseDTO.getRequestDetailsList()) {
			rd.setIeWarehouseId(header.getId());
			rd.setCreateDate(instant);
			rd.setUpdateDate(instant);
		}

		for(InvoiceHeader i : lst){
			i.setFinish(false);
		}

		requestDetailsRepository
				.saveAll(requestDetailsMapper.toEntity(importExportWarehouseDTO.getRequestDetailsList()));
		return importExportWarehouseMapper.toDto(importExportWarehouseRepository.save(header));
	}

	@Override
	public Page<ImportExportWarehouseDTO> getImportExportWarehouseByFilter(Long eid, Long oid, String type, String cf,
			Pageable pageable) {
		Boolean confirm = null;
		if (cf.equals("1"))
			confirm = true;
		else
			confirm = false;
		Page<ImportExportWarehouse> page = importExportWarehouseRepository.getImportExportWarehouseByFilter(eid, oid,
				type, confirm, pageable);
		return page.map(importExportWarehouseMapper::toDto);
	}

	@Override
	public ImportExportWarehouseDTO updateImportExportByKeeper(Long id, List<PersonalShipmentInvoiceDTO> list) {
		ImportExportWarehouse dto = importExportWarehouseRepository.getOne(id);
		System.out.println("\n\n\n====\n" + dto + "\n====\n\n\n");
		for(PersonalShipmentInvoiceDTO ipd : list) {
			System.out.println("\n\n====\n" + ipd.getInvoiceHeaderDTO() + "\n====\n\n");
			System.out.println("\n\n====\n" + ipd.getPersonalShipmentDTO() + "\n====\n\n");
		}
		dto.setKeeperConfirm(true);
		dto.setShipperConfirm(true);
		dto.setShipDate(Instant.now());
		dto.setUpdateDate(Instant.now());
		List<RequestDetails> listRD = requestDetailsRepository.getRequestDetailsByHeaderId(id);
		for (RequestDetails rd : listRD) {
			rd.setKeeperConfirm(true);
			rd.setShipperConfirm(true);
		}
		System.out.println("\n\n====\n" + listRD);
		dto.setKeeperConfirm(true);
		dto.setUpdateDate(Instant.now());
		dto.setShipDate(Instant.now());
		List<InvoiceHeaderDTO> invList = new ArrayList<>();
		List<InvoicePackageDTO> ipkList = new ArrayList<>();
		List<PersonalShipmentDTO> psdList = new ArrayList<>();
		if (dto.getType().equals("import")) {
			for (PersonalShipmentInvoiceDTO ipd : list) {
				InvoiceHeaderDTO i = ipd.getInvoiceHeaderDTO();
				List<InvoicePackage> pdList = invoicePackageRepository.getInvoicePackageByHeaderId(i.getId());
				if (i.getStatus().equals("collected")) {
					// shipment set status finish
					PersonalShipmentDTO psCollect = ipd.getPersonalShipmentDTO();
					psCollect.setStatus("finish");
					i.setStatus("first_import");
					for(InvoicePackage ip : pdList) {
						ip.setStatus("first_import");
						ip.setUpdateDate(Instant.now());
						ipkList.add(invoicePackageMapper.toDto(ip));
					}
					psdList.add(psCollect);
				}
				if (i.getStatus().equals("delivering")) {
					i.setStatus("last_import");
					// shipment set status 
					PersonalShipmentDTO psDeli = ipd.getPersonalShipmentDTO();
					i.setStatus("last_import");
					for(InvoicePackage ip : pdList) {
						ip.setStatus("last_import");
						ip.setUpdateDate(Instant.now());
						ipkList.add(invoicePackageMapper.toDto(ip));
					}
					psdList.add(psDeli);
				}
				i.setFinish(false);
				invList.add(i);
			}
		} else {
			for (PersonalShipmentInvoiceDTO ipd : list) {
				InvoiceHeaderDTO i = ipd.getInvoiceHeaderDTO();
				List<InvoicePackage> pdList = invoicePackageRepository.getInvoicePackageByHeaderId(i.getId());
				if (i.getStatus().equals("last_import")) {
					// shipment set status 
					PersonalShipmentDTO ps = ipd.getPersonalShipmentDTO();
					i.setStatus("delivering");
					ps.setStatus("delivering");
					for(InvoicePackage ip : pdList) {
						ip.setStatus("first_import");
						ip.setUpdateDate(Instant.now());
						ipkList.add(invoicePackageMapper.toDto(ip));
					}
					psdList.add(ps);
				}
				i.setFinish(true);
				invList.add(i);
			}
		}
		requestDetailsRepository.saveAll(listRD);
		invoiceHeaderRepository.saveAll(invoiceHeaderMapper.toEntity(invList));
		invoicePackageRepository.saveAll(invoicePackageMapper.toEntity(ipkList));
		personalShipmentRepository.saveAll(personalShipmentMapper.toEntity(psdList));
		dto = importExportWarehouseRepository.save(dto);
		return importExportWarehouseMapper.toDto(dto);
	}

	@Override
	public Page<ImportExportWarehouseDTO> getImportExportWarehouseForShipper(Long eid, String type, String cf,
			Pageable pageable) {
		Boolean confirm = null;
		if (cf.equals("1"))
			confirm = true;
		if (cf.equals("0"))
			confirm = false;
		Page<ImportExportWarehouse> page = importExportWarehouseRepository.getImportExportWarehouseForShipper(eid, type, confirm, pageable);
		return page.map(importExportWarehouseMapper::toDto);
	}
}
