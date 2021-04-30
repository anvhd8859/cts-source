package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.ReceiptNoteService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.web.rest.util.PaginationUtil;
import com.fu.capstone.service.dto.ReceiptInvoiceDTO;
import com.fu.capstone.service.dto.PackageDetailsDTO;
import com.fu.capstone.service.dto.ReceiptDetailPackageDTO;
import com.fu.capstone.service.dto.ReceiptNoteDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ReceiptNote.
 */
@RestController
@RequestMapping("/api")
public class ReceiptNoteResource {

    private final Logger log = LoggerFactory.getLogger(ReceiptNoteResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceReceiptNote";

    private ReceiptNoteService receiptNoteService;

    public ReceiptNoteResource(ReceiptNoteService receiptNoteService) {
        this.receiptNoteService = receiptNoteService;
    }

    /**
     * POST  /receipt-notes : Create a new receiptNote.
     *
     * @param receiptNoteDTO the receiptNoteDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new receiptNoteDTO, or with status 400 (Bad Request) if the receiptNote has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/receipt-notes")
    @Timed
    public ResponseEntity<ReceiptNoteDTO> createReceiptNote(@RequestBody ReceiptNoteDTO receiptNoteDTO) throws URISyntaxException {
        log.debug("REST request to save ReceiptNote : {}", receiptNoteDTO);
        if (receiptNoteDTO.getId() != null) {
            throw new BadRequestAlertException("A new receiptNote cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReceiptNoteDTO result = receiptNoteService.save(receiptNoteDTO);
        return ResponseEntity.created(new URI("/api/receipt-notes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /receipt-notes : Updates an existing receiptNote.
     *
     * @param receiptNoteDTO the receiptNoteDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated receiptNoteDTO,
     * or with status 400 (Bad Request) if the receiptNoteDTO is not valid,
     * or with status 500 (Internal Server Error) if the receiptNoteDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/receipt-notes")
    @Timed
    public ResponseEntity<ReceiptNoteDTO> updateReceiptNote(@RequestBody ReceiptNoteDTO receiptNoteDTO) throws URISyntaxException {
        log.debug("REST request to update ReceiptNote : {}", receiptNoteDTO);
        if (receiptNoteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReceiptNoteDTO result = receiptNoteService.save(receiptNoteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, receiptNoteDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /receipt-notes : get all the receiptNotes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of receiptNotes in body
     */
    @GetMapping("/receipt-notes")
    @Timed
    public ResponseEntity<List<ReceiptNoteDTO>> getAllReceiptNotes(Pageable pageable) {
        log.debug("REST request to get a page of ReceiptNotes");
        Page<ReceiptNoteDTO> page = receiptNoteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/receipt-notes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /receipt-notes/:id : get the "id" receiptNote.
     *
     * @param id the id of the receiptNoteDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the receiptNoteDTO, or with status 404 (Not Found)
     */
    @GetMapping("/receipt-notes/{id}")
    @Timed
    public ResponseEntity<ReceiptNoteDTO> getReceiptNote(@PathVariable Long id) {
        log.debug("REST request to get ReceiptNote : {}", id);
        Optional<ReceiptNoteDTO> receiptNoteDTO = receiptNoteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(receiptNoteDTO);
    }

    /**
     * DELETE  /receipt-notes/:id : delete the "id" receiptNote.
     *
     * @param id the id of the receiptNoteDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/receipt-notes/{id}")
    @Timed
    public ResponseEntity<Void> deleteReceiptNote(@PathVariable Long id) {
        log.debug("REST request to delete ReceiptNote : {}", id);
        receiptNoteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    // dongPh new code
    @GetMapping("/receipt-notes/by-header")
    @Timed
    public ResponseEntity<ReceiptNoteDTO> getReceiptNoteByHeaderId(@RequestParam("id") Long id) {
        Optional<ReceiptNoteDTO> receiptNoteDTO = receiptNoteService.getReceiptNoteByHeaderId(id);
        return ResponseEntity.ok(receiptNoteDTO.isPresent() ? receiptNoteDTO.get() : null);
    }
    
    @GetMapping("/receipt-notes/by-user")
    @Timed
    public ResponseEntity<List<ReceiptInvoiceDTO>> getAllReceiptInvoiceByUser(@RequestParam("id") Long id, Pageable pageable) {
    	List<ReceiptInvoiceDTO> page = receiptNoteService.getAllReceiptInvoiceByUser(id, pageable);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }
    
    @PostMapping("/receipt-notes/finish-collect")
    @Timed
    public ResponseEntity<ReceiptNoteDTO> createReceiptNoteColectShipment(@RequestBody ReceiptDetailPackageDTO data) throws URISyntaxException {
        log.debug("REST request to update ReceiptNote : {}", data);
        if (data.getReceipt().getId() != null) {
        	throw new BadRequestAlertException("A new receiptNote cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (data.getInvoicePackageList().size() == 0 ){
        	throw new BadRequestAlertException("A new item and package cannot blank", ENTITY_NAME, "notexist");
        }
        ReceiptNoteDTO result = receiptNoteService.createReceiptNoteColectShipment(data);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    
    @PostMapping("/receipt-notes/finish-delivery")
    @Timed
    public ResponseEntity<ReceiptNoteDTO> createReceiptNoteDeliveryShipment(@RequestBody ReceiptDetailPackageDTO data) throws URISyntaxException {
        log.debug("REST request to update ReceiptNote : {}", data);
        if (data.getReceipt().getId() != null) {
        	throw new BadRequestAlertException("A new receiptNote cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (data.getInvoicePackageList().size() == 0 ){
        	throw new BadRequestAlertException("A new item and package cannot blank", ENTITY_NAME, "notexist");
        }
        ReceiptNoteDTO result = receiptNoteService.createReceiptNoteDeliveryShipment(data);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    
    @GetMapping("/receipt-notes/item-package")
    @Timed
    public ResponseEntity<List<PackageDetailsDTO>> getReceiptItemPackage(@RequestParam("id") Long id) {
    	List<PackageDetailsDTO> page = receiptNoteService.getReceiptItemPackage(id);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }
}
