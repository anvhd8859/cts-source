package com.fu.capstone.service.impl;

import com.fu.capstone.service.ImportExportWarehouseService;
import com.fu.capstone.domain.ImportExportWarehouse;
import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.domain.InvoicePackage;
import com.fu.capstone.repository.ImportExportWarehouseRepository;
import com.fu.capstone.repository.InvoicePackageRepository;
import com.fu.capstone.repository.InvoiceHeaderRepository;
import com.fu.capstone.repository.RequestDetailsRepository;
import com.fu.capstone.service.dto.DetailsImportExportDTO;
import com.fu.capstone.service.dto.ImportExportWarehouseDTO;
import com.fu.capstone.service.dto.RequestDetailsDTO;
import com.fu.capstone.service.mapper.ImportExportWarehouseMapper;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import com.fu.capstone.service.mapper.InvoicePackageMapper;
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

	public ImportExportWarehouseServiceImpl(ImportExportWarehouseRepository importExportWarehouseRepository,
			ImportExportWarehouseMapper importExportWarehouseMapper, RequestDetailsRepository requestDetailsRepository,
			RequestDetailsMapper requestDetailsMapper, InvoicePackageRepository invoicePackageRepository,
			InvoicePackageMapper invoicePackageMapper, InvoiceHeaderRepository invoiceHeaderRepository,
			InvoiceHeaderMapper invoiceHeaderMapper) {
		this.importExportWarehouseRepository = importExportWarehouseRepository;
		this.importExportWarehouseMapper = importExportWarehouseMapper;
		this.requestDetailsRepository = requestDetailsRepository;
		this.requestDetailsMapper = requestDetailsMapper;
		this.invoicePackageRepository = invoicePackageRepository;
		this.invoicePackageMapper = invoicePackageMapper;
		this.invoiceHeaderRepository = invoiceHeaderRepository;
		this.invoiceHeaderMapper = invoiceHeaderMapper;
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

		requestDetailsRepository
				.saveAll(requestDetailsMapper.toEntity(importExportWarehouseDTO.getRequestDetailsList()));
		return importExportWarehouseMapper.toDto(importExportWarehouseRepository.save(header));
	}

	@Override
	public ImportExportWarehouseDTO createExportWarehouse(DetailsImportExportDTO importExportWarehouseDTO) {
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
	public ImportExportWarehouseDTO updateImportExportByKeeper(ImportExportWarehouseDTO dto) {
		List<InvoiceHeader> invList = invoiceHeaderRepository.getInvoiceHeaderByIEID(dto.getId());
		List<Long> invIdList = new ArrayList<Long>();
		for (InvoiceHeader i : invList) {
			invIdList.add(i.getId());
		}
		List<InvoicePackage> ipkList = invoicePackageRepository.getInvoicePackageByHeaderList(invIdList);
		if (dto.getType().equals("import")) {
			for (InvoiceHeader i : invList) {
				if (i.getStatus().equals("collected")) {
					i.setStatus("first_import");
					for (InvoicePackage ip : ipkList) {
						if (ip.getInvoiceHeaderId() == i.getId()) {
							ip.setStatus("first_import");
						}
					}
				}
				if (i.getStatus().equals("delivering")) {
					i.setStatus("last_import");
					for (InvoicePackage ip : ipkList) {
						if (ip.getInvoiceHeaderId() == i.getId()) {
							ip.setStatus("last_import");
						}
					}
				}
			}
		} else {
			for (InvoiceHeader i : invList) {
				if (i.getStatus().equals("last_import")) {
					i.setStatus("delivering");
					for (InvoicePackage ip : ipkList) {
						if (ip.getInvoiceHeaderId() == i.getId()) {
							ip.setStatus("delivering");
						}
					}
				}
				if (i.getStatus().equals("first_import")) {
					i.setStatus("transporting");
					for (InvoicePackage ip : ipkList) {
						if (ip.getInvoiceHeaderId() == i.getId()) {
							ip.setStatus("transporting");
						}
					}
				}
			}
		}
		invoiceHeaderRepository.saveAll(invList);
		invoicePackageRepository.saveAll(ipkList);
		dto = importExportWarehouseMapper
				.toDto(importExportWarehouseRepository.save(importExportWarehouseMapper.toEntity(dto)));
		return dto;
	}
}
