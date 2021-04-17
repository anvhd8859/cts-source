package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.InvoiceHeaderService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.web.rest.util.PaginationUtil;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing InvoiceHeader.
 */
@RestController
@RequestMapping("/api")
public class InvoiceHeaderResource {

    private final Logger log = LoggerFactory.getLogger(InvoiceHeaderResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceInvoiceHeader";

    private InvoiceHeaderService invoiceHeaderService;

    public InvoiceHeaderResource(InvoiceHeaderService invoiceHeaderService) {
        this.invoiceHeaderService = invoiceHeaderService;
    }

    /**
     * POST  /invoice-headers : Create a new invoiceHeader.
     *
     * @param invoiceHeaderDTO the invoiceHeaderDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new invoiceHeaderDTO, or with status 400 (Bad Request) if the invoiceHeader has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/invoice-headers")
    @Timed
    public ResponseEntity<InvoiceHeaderDTO> createInvoiceHeader(@RequestBody InvoiceHeaderDTO invoiceHeaderDTO) throws URISyntaxException {
        if (invoiceHeaderDTO.getId() != null) {
            throw new BadRequestAlertException("A new invoiceHeader cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InvoiceHeaderDTO result = invoiceHeaderService.createNewInvoice(invoiceHeaderDTO);
        return ResponseEntity.created(new URI("/api/invoice-headers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /invoice-headers : Updates an existing invoiceHeader.
     *
     * @param invoiceHeaderDTO the invoiceHeaderDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated invoiceHeaderDTO,
     * or with status 400 (Bad Request) if the invoiceHeaderDTO is not valid,
     * or with status 500 (Internal Server Error) if the invoiceHeaderDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/invoice-headers")
    @Timed
    public ResponseEntity<InvoiceHeaderDTO> updateInvoiceHeader(@RequestBody InvoiceHeaderDTO invoiceHeaderDTO) throws URISyntaxException {
        if (invoiceHeaderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InvoiceHeaderDTO result = invoiceHeaderService.save(invoiceHeaderDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, invoiceHeaderDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /invoice-headers : get all the invoiceHeaders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of invoiceHeaders in body
     */
    @GetMapping("/invoice-headers")
    @Timed
    public ResponseEntity<List<InvoiceHeaderDTO>> getAllInvoiceHeaders(Pageable pageable) {
        log.debug("REST request to get a page of InvoiceHeaders");
        Page<InvoiceHeaderDTO> page = invoiceHeaderService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-headers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /invoice-headers/:id : get the "id" invoiceHeader.
     *
     * @param id the id of the invoiceHeaderDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the invoiceHeaderDTO, or with status 404 (Not Found)
     */
    @GetMapping("/invoice-headers/{id}")
    @Timed
    public ResponseEntity<InvoiceHeaderDTO> getInvoiceHeader(@PathVariable Long id) {
        log.debug("REST request to get InvoiceHeader : {}", id);
        Optional<InvoiceHeaderDTO> invoiceHeaderDTO = invoiceHeaderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(invoiceHeaderDTO);
    }

    /**
     * DELETE  /invoice-headers/:id : delete the "id" invoiceHeader.
     *
     * @param id the id of the invoiceHeaderDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/invoice-headers/{id}")
    @Timed
    public ResponseEntity<Void> deleteInvoiceHeader(@PathVariable Long id) {
        log.debug("REST request to delete InvoiceHeader : {}", id);
        invoiceHeaderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    // AnhVD new code
    /**
     * GET  /invoice-headers/search : get all the invoiceHeaders by filter.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of invoiceHeaders in body
     */
    @GetMapping("/invoice-headers/search")
    @Timed
    public ResponseEntity<List<InvoiceHeaderDTO>> getInvoiceHeadersByParams(@RequestParam("invoiceNo") String invoiceNo, @RequestParam("status") String status,
    		@RequestParam("receiveDate") String receiveDate, @RequestParam("createDate") String createDate, @RequestParam("updateDate") String updateDate, Pageable pageable) {
        Page<InvoiceHeaderDTO> page = invoiceHeaderService.getInvoiceHeadersByParams(invoiceNo, status, receiveDate, createDate, updateDate, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-headers/search");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    
    @GetMapping("/invoice-headers/by-shipper")
    @Timed
    public ResponseEntity<List<InvoiceHeaderDTO>> getInvoiceHeadersByShipper(@RequestParam("invNo") String invNo, @RequestParam("type") String type, Pageable pageable) {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	String userName = ((User) authentication.getPrincipal()).getUsername();
    	Page<InvoiceHeaderDTO> page = invoiceHeaderService.getInvoiceHeadersByShipper(userName, invNo, type, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-headers/by-shipper");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }   
}
