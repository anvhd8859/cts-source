package com.fu.capstone.service.impl;

import com.fu.capstone.service.ReceiptNoteService;
import com.fu.capstone.domain.InvoiceDetails;
import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.domain.InvoicePackage;
import com.fu.capstone.domain.PersonalShipment;
import com.fu.capstone.domain.ReceiptNote;
import com.fu.capstone.repository.InvoiceDetailsRepository;
import com.fu.capstone.repository.InvoiceHeaderRepository;
import com.fu.capstone.repository.InvoicePackageRepository;
import com.fu.capstone.repository.PersonalShipmentRepository;
import com.fu.capstone.repository.ReceiptNoteRepository;
import com.fu.capstone.service.dto.ReceiptInvoiceDTO;
import com.fu.capstone.service.dto.DetailPackageDTO;
import com.fu.capstone.service.dto.InvoiceDetailsDTO;
import com.fu.capstone.service.dto.InvoicePackageDTO;
import com.fu.capstone.service.dto.ReceiptDetailPackageDTO;
import com.fu.capstone.service.dto.ReceiptNoteDTO;
import com.fu.capstone.service.mapper.InvoiceDetailsMapper;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import com.fu.capstone.service.mapper.InvoicePackageMapper;
import com.fu.capstone.service.mapper.ReceiptNoteMapper;

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
 * Service Implementation for managing ReceiptNote.
 */
@Service
@Transactional
public class ReceiptNoteServiceImpl implements ReceiptNoteService {

    private final Logger log = LoggerFactory.getLogger(ReceiptNoteServiceImpl.class);

    private ReceiptNoteRepository receiptNoteRepository;

    private ReceiptNoteMapper receiptNoteMapper;

    private InvoiceHeaderRepository invoiceHeaderRepository;

    private InvoiceHeaderMapper invoiceHeaderMapper;

    private InvoicePackageRepository invoicePackageRepository;

    private InvoicePackageMapper invoicePackageMapper;

    private InvoiceDetailsRepository invoiceDetailsRepository;

    private InvoiceDetailsMapper invoiceDetailsMapper;

    private PersonalShipmentRepository personalShipmentRepository;

    public ReceiptNoteServiceImpl(ReceiptNoteRepository receiptNoteRepository, ReceiptNoteMapper receiptNoteMapper,
    		InvoiceHeaderRepository invoiceHeaderRepository, InvoiceHeaderMapper invoiceHeaderMapper,
    		InvoicePackageRepository invoicePackageRepository, InvoicePackageMapper invoicePackageMapper,
    		InvoiceDetailsRepository invoiceDetailsRepository, InvoiceDetailsMapper invoiceDetailsMapper,
    		PersonalShipmentRepository personalShipmentRepository) {
        this.receiptNoteRepository = receiptNoteRepository;
        this.receiptNoteMapper = receiptNoteMapper;
        this.invoiceHeaderRepository = invoiceHeaderRepository;
        this.invoiceHeaderMapper = invoiceHeaderMapper;
        this.invoicePackageRepository = invoicePackageRepository;
        this.invoicePackageMapper = invoicePackageMapper;
        this.invoiceDetailsRepository = invoiceDetailsRepository;
        this.invoiceDetailsMapper = invoiceDetailsMapper;
        this.personalShipmentRepository = personalShipmentRepository;
    }

    /**
     * Save a receiptNote.
     *
     * @param receiptNoteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ReceiptNoteDTO save(ReceiptNoteDTO receiptNoteDTO) {
        log.debug("Request to save ReceiptNote : {}", receiptNoteDTO);

        ReceiptNote receiptNote = receiptNoteMapper.toEntity(receiptNoteDTO);
		Instant instant = Instant.now();
		if(receiptNote.getId() == null){
			receiptNote.setCreateDate(instant);
			receiptNote.setUpdateDate(instant);
		}
		else {
			receiptNote.setUpdateDate(instant);
	        receiptNote = receiptNoteRepository.save(receiptNote);
	        InvoiceHeader inv = invoiceHeaderRepository.getOne(receiptNote.getInvoiceHeaderId());
	        PersonalShipment ps = personalShipmentRepository.getCollectShipmentByInvoice(receiptNote.getInvoiceHeaderId());
	        ps.setFinishTime(instant);
	        inv.setUpdateDate(instant);
	        ps.setUpdateDate(instant);
	        inv.setStatus("collected");
	        ps.setStatus("finish");
	        invoiceHeaderRepository.save(inv);
	        personalShipmentRepository.save(ps);
		}
        return receiptNoteMapper.toDto(receiptNote);
    }

    /**
     * Get all the receiptNotes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ReceiptNoteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ReceiptNotes");
        return receiptNoteRepository.findAll(pageable)
            .map(receiptNoteMapper::toDto);
    }


    /**
     * Get one receiptNote by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ReceiptNoteDTO> findOne(Long id) {
        log.debug("Request to get ReceiptNote : {}", id);
        return receiptNoteRepository.findById(id)
            .map(receiptNoteMapper::toDto);
    }

    /**
     * Delete the receiptNote by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ReceiptNote : {}", id);
        receiptNoteRepository.deleteById(id);
    }

	@Override
	public Optional<ReceiptNoteDTO> getReceiptNoteByHeaderId(Long id) {
		return receiptNoteRepository.getReceiptNoteByHeaderId(id)
	            .map(receiptNoteMapper::toDto);
	}

	@Override
	public List<ReceiptInvoiceDTO> getAllReceiptInvoiceByUser(Long id, Pageable pageable) {
		List<ReceiptInvoiceDTO> list = new ArrayList<>();
		List<ReceiptNote> noteList = receiptNoteRepository.getAllReceiptNotConfirm(id, pageable);
		for(ReceiptNote r : noteList) {
			ReceiptInvoiceDTO riDto = new ReceiptInvoiceDTO();
			InvoiceHeader inv = invoiceHeaderRepository.getOne(r.getInvoiceHeaderId());
			riDto.setReceiptNote(receiptNoteMapper.toDto(r));
			riDto.setInvoiceHeader(invoiceHeaderMapper.toDto(inv));
			list.add(riDto);
		}
		return list;
	}

	@Override
	public DetailPackageDTO getReceiptItemPackage(Long id) {
		List<InvoicePackage> pgkList = invoicePackageRepository.getInvoicePackageByHeaderId(id);
		List<InvoiceDetails> idtList = invoiceDetailsRepository.getInvoiceDetailsByHeaderId(id);
		DetailPackageDTO rs = new DetailPackageDTO();
		rs.setInvoicePackageList(invoicePackageMapper.toDto(pgkList));
		rs.setInvoiceDetailList(invoiceDetailsMapper.toDto(idtList));
		return rs;
	}

	@Override
	public ReceiptNoteDTO createReceiptNoteAndShipmentInvoice(ReceiptDetailPackageDTO data) {
		Instant instant = Instant.now();
		if(data.getReceipt().getId() != null)data.getReceipt().setCreateDate(instant);
		data.getReceipt().setUpdateDate(instant);
		data.getReceipt().setCustomerConfirm(false);
		for(InvoicePackageDTO ip : data.getInvoicePackageList()) {
			ip.setUpdateDate(instant);
		}
		for(InvoiceDetailsDTO ip : data.getInvoiceDetailList()) {
			ip.setUpdateDate(instant);
		}
		PersonalShipment ps = personalShipmentRepository.getCollectShipmentByInvoice(data.getReceipt().getInvoiceHeaderId());
		ps.setStatus("finish");
		ps.setShipTime(instant);
		ps.setFinishTime(instant);
		ps.setUpdateDate(instant);
		personalShipmentRepository.save(ps);
		invoicePackageRepository.saveAll(invoicePackageMapper.toEntity(data.getInvoicePackageList()));
		invoiceDetailsRepository.saveAll(invoiceDetailsMapper.toEntity(data.getInvoiceDetailList()));
		return receiptNoteMapper.toDto(receiptNoteRepository.save(data.getReceipt()));
	}
}
