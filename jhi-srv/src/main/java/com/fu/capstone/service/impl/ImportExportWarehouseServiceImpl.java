package com.fu.capstone.service.impl;

import com.fu.capstone.domain.*;
import com.fu.capstone.repository.*;
import com.fu.capstone.service.ImportExportWarehouseService;
import com.fu.capstone.service.dto.*;
import com.fu.capstone.service.dto.ImportExportRequestDTO;
import com.fu.capstone.service.mapper.ImportExportWarehouseMapper;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import com.fu.capstone.service.mapper.InvoicePackageMapper;
import com.fu.capstone.service.mapper.PersonalShipmentMapper;
import com.fu.capstone.service.mapper.RequestDetailsMapper;

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

	private WarehouseRepository warehouseRepository;

	public ImportExportWarehouseServiceImpl(ImportExportWarehouseRepository importExportWarehouseRepository,
			ImportExportWarehouseMapper importExportWarehouseMapper, RequestDetailsRepository requestDetailsRepository,
			RequestDetailsMapper requestDetailsMapper, InvoicePackageRepository invoicePackageRepository,
			InvoicePackageMapper invoicePackageMapper, InvoiceHeaderRepository invoiceHeaderRepository,
			InvoiceHeaderMapper invoiceHeaderMapper, PersonalShipmentRepository personalShipmentRepository,
			PersonalShipmentMapper personalShipmentMapper,
			WarehouseRepository warehouseRepository) {
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
		this.warehouseRepository = warehouseRepository;
	}

	/**
	 * Save a importExportWarehouse.
	 *
	 * @param importExportRequestDTO the entity to save
	 * @return the persisted entity
	 */
	@Override
	public ImportExportRequestDTO save(ImportExportRequestDTO importExportRequestDTO) {
		log.debug("Request to save ImportExportWarehouse : {}", importExportRequestDTO);

		ImportExportRequest importExportRequest = importExportWarehouseMapper.toEntity(importExportRequestDTO);
		importExportRequest = importExportWarehouseRepository.save(importExportRequest);
		return importExportWarehouseMapper.toDto(importExportRequest);
	}

	/**
	 * Get all the importExportWarehouses.
	 *
	 * @param pageable the pagination information
	 * @return the list of entities
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<ImportExportRequestDTO> findAll(Pageable pageable) {
		log.debug("Request to get all ImportExportWarehouses");
		return importExportWarehouseRepository.findAll(pageable).map(importExportWarehouseMapper::toDto);
	}

	/**
	 * Get one importExportWarehouse by id.
	 *
	 * @param id the id of the entity
	 * @return the entity
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<ImportExportRequestDTO> findOne(Long id) {
		log.debug("Request to get ImportExportWarehouse : {}", id);
		return importExportWarehouseRepository.findById(id).map(importExportWarehouseMapper::toDto);
	}

	/**
	 * Delete the importExportWarehouse by id.
	 *
	 * @param id the id of the entity
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request to delete ImportExportWarehouse : {}", id);
		importExportWarehouseRepository.deleteById(id);
	}

	@Override
	public ImportExportRequestDTO createImportWarehouse(DetailsImportExportDTO importExportWarehouseDTO) {
		// get invoice Id list
		List<Long> list = new ArrayList<>();
		for (RequestDetailsDTO rd : importExportWarehouseDTO.getRequestDetailsList()) {
			list.add(rd.getInvoicePackageId());
		}
		// set warehouse id from office id
		Warehouse warehouse = warehouseRepository.getWarehouseByOfficeId(importExportWarehouseDTO.getRequestHeader().getWarehouseId());
		importExportWarehouseDTO.getRequestHeader().setWarehouseId(warehouse.getId());

		// get packages
		List<InvoicePackage> packageList = invoicePackageRepository.getInvoicePackageByHeaderList(list);
		Instant instant = Instant.now();

		// ie warehouse
		ImportExportRequest header = importExportWarehouseRepository
				.save(importExportWarehouseMapper.toEntity(importExportWarehouseDTO.getRequestHeader()));
		header.setCreateDate(instant);
		header.setUpdateDate(instant);
		header.setType("import");
		header.setShipperConfirm(true);
		header.setStatus("");

		// RequestDetails list
		List<RequestDetails> rdList = new ArrayList<>();
		for (Long id : list) {
			RequestDetails rd = new RequestDetails();
			rd.setRequestId(header.getId());
			rd.setInvoicePackageId(id);
			rd.setShipperConfirm(true);
			rd.setStatus(false);
			rd.setCreateDate(instant);
			rd.setUpdateDate(instant);
			rdList.add(rd);
		}

		// packages -> warehouse
		packageList.forEach(p -> {
			p.setWarehouseId(warehouse.getId());
			p.setUpdateDate(instant);
		});

		invoicePackageRepository.saveAll(packageList);
		requestDetailsRepository.saveAll(rdList);
		return importExportWarehouseMapper.toDto(importExportWarehouseRepository.save(header));
	}

	@Override
	public ImportExportRequestDTO createExportWarehouse(DetailsImportExportDTO importExportWarehouseDTO) {
		List<Long> list = new ArrayList<>();
		for (RequestDetailsDTO rd : importExportWarehouseDTO.getRequestDetailsList()) {
			list.add(rd.getInvoicePackageId());
		}
		List<InvoiceHeader> lst = invoiceHeaderRepository.getInvoiceHeaderByListShipmentId(list);
		for (InvoiceHeader i : lst) {
			if (i.getFinish()) {
				//				throw new BadRequestAlertException("Invalid ", "invoice", " is exported ");
			}
			i.setFinish(true);
		}
		ImportExportRequest header = importExportWarehouseRepository
				.save(importExportWarehouseMapper.toEntity(importExportWarehouseDTO.getRequestHeader()));
		Instant instant = Instant.now();
		header.setCreateDate(instant);
		header.setUpdateDate(instant);
		header.setType("export");
		header.setShipperConfirm(true);
		header.setStatus("");
		for (RequestDetailsDTO rd : importExportWarehouseDTO.getRequestDetailsList()) {
			rd.setRequestId(header.getId());
			rd.setCreateDate(instant);
			rd.setUpdateDate(instant);
		}

		for (InvoiceHeader i : lst) {
			i.setFinish(false);
		}

		requestDetailsRepository
				.saveAll(requestDetailsMapper.toEntity(importExportWarehouseDTO.getRequestDetailsList()));
		return importExportWarehouseMapper.toDto(importExportWarehouseRepository.save(header));
	}

	@Override
	public Page<ImportExportRequestDTO> getImportExportWarehouseByFilter(Long eid, Long oid, String type, String cf,
			Pageable pageable) {
		Boolean confirm = cf.equals("1");
		Warehouse warehouse = warehouseRepository.getWarehouseByOfficeId(oid);
		Page<ImportExportRequest> page = importExportWarehouseRepository.getImportExportWarehouseByFilter(eid, warehouse.getId(),
				type, confirm, pageable);
		return page.map(importExportWarehouseMapper::toDto);
	}

	@Override
	public ImportExportRequestDTO updateImportExportByKeeper(Long id, List<PersonalShipmentInvoiceDTO> list) {
		ImportExportRequest dto = importExportWarehouseRepository.getOne(id);
		dto.setKeeperConfirm(true);
		dto.setShipperConfirm(true);
		dto.setShipDate(Instant.now());
		dto.setUpdateDate(Instant.now());

		List<RequestDetails> listRD = requestDetailsRepository.getRequestDetailsByHeaderId(id);
		for (RequestDetails rd : listRD) {
			rd.setKeeperConfirm(true);
			rd.setShipperConfirm(true);
		}

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
					for (InvoicePackage ip : pdList) {
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
					for (InvoicePackage ip : pdList) {
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
					for (InvoicePackage ip : pdList) {
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
	public Page<ImportExportRequestDTO> getImportExportWarehouseForShipper(Long eid, String type, String cf,
			Pageable pageable) {
		Boolean confirm = null;
		if (cf.equals("1"))
			confirm = true;
		if (cf.equals("0"))
			confirm = false;
		Page<ImportExportRequest> page = importExportWarehouseRepository.getImportExportWarehouseForShipper(eid, type, confirm, pageable);
		return page.map(importExportWarehouseMapper::toDto);
	}

	@Override
	public ImportExportRequestDTO approveWarehouseRequest(IERequestDetailDTO body) {
		Instant instant = Instant.now();
		ImportExportRequestDTO request = body.getImportExportWarehouse();
		Warehouse warehouse = warehouseRepository.getOne(request.getWarehouseId());
		List<RequestDetailsDTO> rdList = new ArrayList<>();
		List<InvoiceHeaderDTO> ihList = new ArrayList<>();
		List<InvoicePackageDTO> ipList = new ArrayList<>();

		List<RequestDetailInvoiceDTO> requestDetails = body.getRequestDetailsList();
		request.setKeeperConfirm(true);
		request.setStatus("approve");
		request.setUpdateDate(instant);
		int[] count = new int[]{0, 0};
		requestDetails.forEach(rd -> {
			if (rd.getRequestDetails().getStatus()) {
				if (request.getType().equals("import")) rd.getInvoiceHeader().setStatus("first_import");
				else rd.getInvoiceHeader().setStatus("last_import");
				rd.getInvoiceHeader().setOfficeId(warehouse.getOfficeId());
				rd.getPackageList().forEach(ip -> {
					ip.setWarehouseId(request.getWarehouseId());
				});
				ihList.add(rd.getInvoiceHeader());
				ipList.addAll(rd.getPackageList());
				count[0]++;
			}
			rdList.add(rd.getRequestDetails());
			count[1]++;
		});
		request.setNote(String.format("%d/%d", count[0], count[1]));

		requestDetailsRepository.saveAll(requestDetailsMapper.toEntity(rdList));
		invoiceHeaderRepository.saveAll(invoiceHeaderMapper.toEntity(ihList));
		invoicePackageRepository.saveAll(invoicePackageMapper.toEntity(ipList));
		return importExportWarehouseMapper
				.toDto(importExportWarehouseRepository.save(importExportWarehouseMapper.toEntity(request)));
	}

	@Override
	public ImportExportRequestDTO rejectWarehouseRequest(IERequestDetailDTO body) {
		Instant instant = Instant.now();
		ImportExportRequestDTO request = body.getImportExportWarehouse();
		List<RequestDetailsDTO> rdList = new ArrayList<>();

		List<RequestDetailInvoiceDTO> requestDetails = body.getRequestDetailsList();

		request.setKeeperConfirm(true);
		request.setStatus("reject");
		request.setUpdateDate(instant);
		requestDetails.forEach(rd -> {

		});

		return null;
	}
}
