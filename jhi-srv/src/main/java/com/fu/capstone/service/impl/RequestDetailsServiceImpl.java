package com.fu.capstone.service.impl;

import com.fu.capstone.service.RequestDetailsService;
import com.fu.capstone.domain.PersonalShipment;
import com.fu.capstone.domain.RequestDetails;
import com.fu.capstone.repository.InvoiceDetailsRepository;
import com.fu.capstone.repository.InvoiceHeaderRepository;
import com.fu.capstone.repository.InvoicePackageRepository;
import com.fu.capstone.repository.PersonalShipmentRepository;
import com.fu.capstone.repository.RequestDetailsRepository;
import com.fu.capstone.service.dto.InvoicePackageDetailDTO;
import com.fu.capstone.service.dto.PersonalShipmentInvoiceDTO;
import com.fu.capstone.service.dto.RequestDetailInvoiceDTO;
import com.fu.capstone.service.dto.RequestDetailsDTO;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import com.fu.capstone.service.mapper.InvoicePackageMapper;
import com.fu.capstone.service.mapper.PersonalShipmentMapper;
import com.fu.capstone.service.mapper.RequestDetailsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing RequestDetails.
 */
@Service
@Transactional
public class RequestDetailsServiceImpl implements RequestDetailsService {

	private final Logger log = LoggerFactory.getLogger(RequestDetailsServiceImpl.class);

	private RequestDetailsRepository requestDetailsRepository;

	private InvoiceHeaderRepository invoiceHeaderRepository;

	private InvoiceDetailsRepository invoiceDetailsRepository;

	private InvoicePackageRepository invoicePackageRepository;

	private PersonalShipmentRepository personalShipmentRepository;

	private RequestDetailsMapper requestDetailsMapper;

	private InvoiceHeaderMapper invoiceHeaderMapper;

	private PersonalShipmentMapper personalShipmentMapper;

	private InvoicePackageMapper invoicePackageMapper;

	public RequestDetailsServiceImpl(RequestDetailsRepository requestDetailsRepository, RequestDetailsMapper requestDetailsMapper,
			InvoiceHeaderRepository invoiceHeaderRepository, InvoiceHeaderMapper invoiceHeaderMapper,
			InvoiceDetailsRepository invoiceDetailsRepository, PersonalShipmentMapper personalShipmentMapper,
			InvoicePackageRepository invoicePackageRepository, InvoicePackageMapper invoicePackageMapper,
			PersonalShipmentRepository personalShipmentRepository) {
		this.requestDetailsRepository = requestDetailsRepository;
		this.requestDetailsMapper = requestDetailsMapper;
		this.invoiceHeaderRepository = invoiceHeaderRepository;
		this.invoiceHeaderMapper = invoiceHeaderMapper;
		this.invoiceDetailsRepository = invoiceDetailsRepository;
		this.personalShipmentMapper = personalShipmentMapper;
		this.invoicePackageRepository = invoicePackageRepository;
		this.invoicePackageMapper = invoicePackageMapper;
		this.personalShipmentRepository = personalShipmentRepository;
	}

	/**
	 * Save a requestDetails.
	 *
	 * @param requestDetailsDTO
	 *            the entity to save
	 * @return the persisted entity
	 */
	@Override
	public RequestDetailsDTO save(RequestDetailsDTO requestDetailsDTO) {
		log.debug("Request to save RequestDetails : {}", requestDetailsDTO);

		RequestDetails requestDetails = requestDetailsMapper.toEntity(requestDetailsDTO);
		requestDetails = requestDetailsRepository.save(requestDetails);
		return requestDetailsMapper.toDto(requestDetails);
	}

	/**
	 * Get all the requestDetails.
	 *
	 * @return the list of entities
	 */
	@Override
	@Transactional(readOnly = true)
	public List<RequestDetailsDTO> findAll() {
		log.debug("Request to get all RequestDetails");
		return requestDetailsRepository.findAll().stream().map(requestDetailsMapper::toDto)
				.collect(Collectors.toCollection(LinkedList::new));
	}

	/**
	 * Get one requestDetails by id.
	 *
	 * @param id
	 *            the id of the entity
	 * @return the entity
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<RequestDetailsDTO> findOne(Long id) {
		log.debug("Request to get RequestDetails : {}", id);
		return requestDetailsRepository.findById(id).map(requestDetailsMapper::toDto);
	}

	/**
	 * Delete the requestDetails by id.
	 *
	 * @param id
	 *            the id of the entity
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request to delete RequestDetails : {}", id);
		requestDetailsRepository.deleteById(id);
	}

	@Override
	public List<RequestDetailInvoiceDTO> getRequestDetailsByHeaderId(Long id) {
		List<RequestDetails> list = requestDetailsRepository.getRequestDetailsByHeaderId(id);
		List<RequestDetailInvoiceDTO> rs = new ArrayList<>();
		for (RequestDetails rd : list) {
			RequestDetailInvoiceDTO dto = new RequestDetailInvoiceDTO();
			dto.setRequestDetails(requestDetailsMapper.toDto(rd));
			dto.setInvoiceHeader(invoiceHeaderMapper.toDto(invoiceHeaderRepository.getOne(rd.getInvoicePackageId())));
			dto.setPackageList(invoicePackageMapper.toDto(invoicePackageRepository.getInvoicePackageByHeaderId(rd.getInvoicePackageId())));
			rs.add(dto);
		}

		return rs;
	}

	@Override
	public RequestDetailsDTO updateImportExportByKeeper(Long id, Long wid, List<InvoicePackageDetailDTO> body) {
		List<RequestDetails> rdList = requestDetailsRepository.getRequestDetailsByHeaderId(wid);
		List<PersonalShipment> psList = personalShipmentRepository.getPersonalShipmentByRequestId(wid);
		for(InvoicePackageDetailDTO o : body) {
			for(PersonalShipment ps : psList) {
				if(o.getInvoice().getId().longValue() == ps.getInvoiceHeaderId().longValue()) {
					for(RequestDetails rd : rdList) {
						if(ps.getId() == rd.getInvoicePackageId()){
							rd.setKeeperConfirm(true);
							rd.setShipperConfirm(true);
							rd.setStatus(true);
						}
					}
				}
			}
		}
		for(RequestDetails rd : rdList){
			if(rd.getStatus() == null || !rd.getStatus()) {
				rd.setKeeperConfirm(true);
				rd.setShipperConfirm(true);
				rd.setStatus(false);
			}
		}
		requestDetailsRepository.saveAll(rdList);
		RequestDetails rd = rdList.get(0) != null ? rdList.get(0) : null;
		return requestDetailsMapper.toDto(rd);
	}
}
