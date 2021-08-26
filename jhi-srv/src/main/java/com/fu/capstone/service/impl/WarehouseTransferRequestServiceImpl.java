package com.fu.capstone.service.impl;

import com.fu.capstone.domain.*;
import com.fu.capstone.repository.*;
import com.fu.capstone.service.WarehouseTransferRequestService;
import com.fu.capstone.service.dto.*;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import com.fu.capstone.service.mapper.InvoicePackageMapper;
import com.fu.capstone.service.mapper.TransferDetailsMapper;
import com.fu.capstone.service.mapper.WarehouseTransferRequestMapper;
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
 * Service Implementation for managing WarehouseTransferRequest.
 */
@Service
@Transactional
public class WarehouseTransferRequestServiceImpl implements WarehouseTransferRequestService {

	private final Logger log = LoggerFactory.getLogger(WarehouseTransferRequestServiceImpl.class);

	private WarehouseTransferRequestRepository warehouseTransferRequestRepository;

	private WarehouseTransferRequestMapper warehouseTransferRequestMapper;

	private WarehouseRepository warehouseRepository;

	private TransferDetailsRepository transferDetailsRepository;

	private InvoiceHeaderRepository invoiceHeaderRepository;

	private InvoicePackageRepository invoicePackageRepository;

	private InvoiceHeaderMapper invoiceHeaderMapper;

	private InvoicePackageMapper invoicePackageMapper;

	private TransferDetailsMapper transferDetailsMapper;

	private PersonalShipmentRepository personalShipmentRepository;

	public WarehouseTransferRequestServiceImpl(WarehouseTransferRequestRepository warehouseTransferRequestRepository,
			WarehouseTransferRequestMapper warehouseTransferRequestMapper,
			WarehouseRepository warehouseRepository,
			TransferDetailsRepository transferDetailsRepository,TransferDetailsMapper transferDetailsMapper,
			InvoiceHeaderRepository invoiceHeaderRepository, InvoiceHeaderMapper invoiceHeaderMapper,
			InvoicePackageRepository invoicePackageRepository, InvoicePackageMapper invoicePackageMapper,
			PersonalShipmentRepository personalShipmentRepository) {
		this.warehouseTransferRequestRepository = warehouseTransferRequestRepository;
		this.warehouseTransferRequestMapper = warehouseTransferRequestMapper;
		this.warehouseRepository = warehouseRepository;
		this.transferDetailsRepository = transferDetailsRepository;
		this.invoiceHeaderRepository = invoiceHeaderRepository;
		this.invoicePackageRepository = invoicePackageRepository;
		this.transferDetailsMapper = transferDetailsMapper;
		this.invoiceHeaderMapper = invoiceHeaderMapper;
		this.invoicePackageMapper = invoicePackageMapper;
		this.personalShipmentRepository = personalShipmentRepository;
	}

	/**
	 * Save a warehouseTransferRequest.
	 *
	 * @param warehouseTransferRequestDTO the entity to save
	 * @return the persisted entity
	 */
	@Override
	public WarehouseTransferRequestDTO save(WarehouseTransferRequestDTO warehouseTransferRequestDTO) {
		log.debug("Request to save WarehouseTransferRequest : {}", warehouseTransferRequestDTO);

		WarehouseTransferRequest warehouseTransferRequest = warehouseTransferRequestMapper.toEntity(warehouseTransferRequestDTO);
		warehouseTransferRequest = warehouseTransferRequestRepository.save(warehouseTransferRequest);
		return warehouseTransferRequestMapper.toDto(warehouseTransferRequest);
	}

	/**
	 * Get all the warehouseTransferRequests.
	 *
	 * @return the list of entities
	 */
	@Override
	@Transactional(readOnly = true)
	public List<WarehouseTransferRequestDTO> findAll() {
		log.debug("Request to get all WarehouseTransferRequests");
		return warehouseTransferRequestRepository.findAll().stream()
				.map(warehouseTransferRequestMapper::toDto)
				.collect(Collectors.toCollection(LinkedList::new));
	}


	/**
	 * Get one warehouseTransferRequest by id.
	 *
	 * @param id the id of the entity
	 * @return the entity
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<WarehouseTransferRequestDTO> findOne(Long id) {
		log.debug("Request to get WarehouseTransferRequest : {}", id);
		return warehouseTransferRequestRepository.findById(id)
				.map(warehouseTransferRequestMapper::toDto);
	}

	/**
	 * Delete the warehouseTransferRequest by id.
	 *
	 * @param id the id of the entity
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request to delete WarehouseTransferRequest : {}", id);
		warehouseTransferRequestRepository.deleteById(id);
	}

	@Override
	public WarehouseTransferRequestDTO createTransferRequest(TransferInvoicePackageDTO body) {
		Instant instant = Instant.now();
		WarehouseTransferRequest entity = warehouseTransferRequestMapper.toEntity(body.getTransferRequest());
		Warehouse from = warehouseRepository.getWarehouseByKeeperId(entity.getFromKeeperId());

		entity.setFromWarehouseId(from.getId());
		entity.setCreateDate(instant);
		entity.setUpdateDate(instant);
		entity = warehouseTransferRequestRepository.save(entity);

		List<TransferDetails> tdList = new ArrayList<>();
		List<InvoiceHeader> invList = new ArrayList<>();
        List<InvoicePackage> ipList = new ArrayList<>();
		List<InvoicePackageShipmentDTO> data = body.getInvoicePackageList();
		for (InvoicePackageShipmentDTO ips : data) {
			TransferDetails td = new TransferDetails();
			InvoiceHeader inv = invoiceHeaderMapper.toEntity(ips.getInvoiceHeader());
			inv.setStatus("transporting");
			td.setTransferId(entity.getId());
			td.setInvoicePackageId(ips.getInvoiceHeader().getId());
			td.setStatus(false);
			td.setCreateDate(instant);
			td.setUpdateDate(instant);

			tdList.add(td);
			invList.add(inv);
            ipList.addAll(invoicePackageMapper.toEntity(ips.getInvoicePackageList()));
		}

		ipList.forEach(x -> {
		   x.setWarehouseId(null);
        });

		transferDetailsRepository.saveAll(tdList);
		invoiceHeaderRepository.saveAll(invList);
		invoicePackageRepository.saveAll(ipList);
		return warehouseTransferRequestMapper.toDto(entity);
	}

	@Override
	public Page<TransferInvoicePackageDTO> getWarehouseTransferByOffice(Long id, Pageable pageable) {
		return warehouseTransferRequestRepository.getWarehouseTransferByOffice(id, pageable)
				.map(this::toTransferInvoicePackageDTO);
	}

	@Override
	public List<TransferDetailsInvoiceDTO> getWarehouseTransferData(Long id) {
		List<TransferDetails> list = transferDetailsRepository.findAllByTransferId(id);
		List<TransferDetailsInvoiceDTO> rs = new ArrayList<>();
		list.forEach(x -> {
			rs.add(toTransferInvoicePackageDTO(x));
		});
		return rs;
	}

	@Override
	public WarehouseTransferRequestDTO approveTransferRequest(List<TransferDetailsInvoiceDTO> body) {
		Instant instant = Instant.now();
		WarehouseTransferRequest rs = warehouseTransferRequestRepository.getOne(body.get(0).getTransferDetails().getTransferId());
		List<Long> invoiceIds = new ArrayList<>();
		List<TransferDetailsDTO> tdList = new ArrayList<>();
		List<InvoiceHeaderDTO> ihList = new ArrayList<>();
		List<InvoicePackageDTO> ipList = new ArrayList<>();
		body.forEach(obj -> {
            InvoiceHeaderDTO inv = obj.getInvoiceHeader();
            if (obj.getTransferDetails().getStatus()) {
                inv.setStatus("last_import");
				inv.setUpdateDate(instant);
				List<InvoicePackageDTO> innerIpList = obj.getInvoicePackageList();
				ipList.addAll(innerIpList);
                invoiceIds.add(inv.getId());
			}
            else {
                inv.setStatus("lost");
                inv.setNote(obj.getTransferDetails().getNote());
                inv.setUpdateDate(instant);
            }
            ihList.add(inv);
            tdList.add(obj.getTransferDetails());
		});

		ipList.forEach(invoicePackageDTO -> {
			invoicePackageDTO.setWarehouseId(rs.getToWarehouseId());
			invoicePackageDTO.setUpdateDate(instant);
		});

		rs.setStatus("approve");
		rs.setReceiveDate(instant);
		rs.setUpdateDate(instant);

		List<PersonalShipment> psList = personalShipmentRepository.getDeliveryShipmentByHeaderIds( invoiceIds);
		psList.forEach(personalShipment -> {
			personalShipment.setStatus("new");
			personalShipment.setUpdateDate(instant);
		});

		transferDetailsRepository.saveAll(transferDetailsMapper.toEntity(tdList));
		invoiceHeaderRepository.saveAll(invoiceHeaderMapper.toEntity(ihList));
		invoicePackageRepository.saveAll(invoicePackageMapper.toEntity(ipList));
		personalShipmentRepository.saveAll(psList);
		return warehouseTransferRequestMapper.toDto(warehouseTransferRequestRepository.save(rs));
	}

	private TransferDetailsInvoiceDTO toTransferInvoicePackageDTO(TransferDetails from) {
		TransferDetailsInvoiceDTO toDTO = new TransferDetailsInvoiceDTO();
		toDTO.setTransferDetails(transferDetailsMapper.toDto(from));
		toDTO.setInvoiceHeader(invoiceHeaderMapper.toDto(invoiceHeaderRepository.getOne(from.getInvoicePackageId())));
		toDTO.setInvoicePackageList(invoicePackageMapper.toDto(invoicePackageRepository.getInvoicePackageByHeaderId(from.getInvoicePackageId())));
		return toDTO;
	}

	private TransferInvoicePackageDTO toTransferInvoicePackageDTO(WarehouseTransferRequest from) {
		TransferInvoicePackageDTO toDTO = new TransferInvoicePackageDTO();
		toDTO.setTransferRequest(warehouseTransferRequestMapper.toDto(from));
		List<InvoiceHeader> ihList = invoiceHeaderRepository.getInvoiceHeaderByTransferId(from.getId());

		List<InvoicePackageShipmentDTO> list = new ArrayList<>();
		for (InvoiceHeader inv : ihList) {
			InvoicePackageShipmentDTO data = new InvoicePackageShipmentDTO();
			data.setInvoiceHeader(invoiceHeaderMapper.toDto(inv));
			data.setInvoicePackageList(invoicePackageMapper.toDto(invoicePackageRepository.getInvoicePackageByHeaderId(inv.getId())));
			list.add(data);
		}

		toDTO.setInvoicePackageList(list);
		return toDTO;
	}
}
