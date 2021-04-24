package com.fu.capstone.service.impl;

import com.fu.capstone.service.ReceiptNoteService;
import com.fu.capstone.domain.ReceiptNote;
import com.fu.capstone.repository.ReceiptNoteRepository;
import com.fu.capstone.service.dto.ReceiptNoteDTO;
import com.fu.capstone.service.mapper.ReceiptNoteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
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

    public ReceiptNoteServiceImpl(ReceiptNoteRepository receiptNoteRepository, ReceiptNoteMapper receiptNoteMapper) {
        this.receiptNoteRepository = receiptNoteRepository;
        this.receiptNoteMapper = receiptNoteMapper;
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
		else receiptNote.setUpdateDate(instant);
        receiptNote = receiptNoteRepository.save(receiptNote);
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
}
