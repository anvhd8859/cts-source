package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.InvoiceDetailsService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.web.rest.util.PaginationUtil;
import com.fu.capstone.service.dto.InvoiceDetailsDTO;
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
 * REST controller for managing InvoiceDetails.
 */
@RestController
@RequestMapping("/api")
public class InvoiceDetailsResource {

    private final Logger log = LoggerFactory.getLogger(InvoiceDetailsResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceInvoiceDetails";

    private InvoiceDetailsService invoiceDetailsService;

    public InvoiceDetailsResource(InvoiceDetailsService invoiceDetailsService) {
        this.invoiceDetailsService = invoiceDetailsService;
    }

    /**
     * POST  /invoice-details : Create a new invoiceDetails.
     *
     * @param invoiceDetailsDTO the invoiceDetailsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new invoiceDetailsDTO, or with status 400 (Bad Request) if the invoiceDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/invoice-details")
    @Timed
    public ResponseEntity<InvoiceDetailsDTO> createInvoiceDetails(@RequestBody InvoiceDetailsDTO invoiceDetailsDTO) throws URISyntaxException {
        if (invoiceDetailsDTO.getId() != null) {
            throw new BadRequestAlertException("A new invoiceDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InvoiceDetailsDTO result = invoiceDetailsService.save(invoiceDetailsDTO);
        return ResponseEntity.created(new URI("/api/invoice-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /invoice-details : Updates an existing invoiceDetails.
     *
     * @param invoiceDetailsDTO the invoiceDetailsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated invoiceDetailsDTO,
     * or with status 400 (Bad Request) if the invoiceDetailsDTO is not valid,
     * or with status 500 (Internal Server Error) if the invoiceDetailsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/invoice-details")
    @Timed
    public ResponseEntity<InvoiceDetailsDTO> updateInvoiceDetails(@RequestBody InvoiceDetailsDTO invoiceDetailsDTO) throws URISyntaxException {
        if (invoiceDetailsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InvoiceDetailsDTO result = invoiceDetailsService.save(invoiceDetailsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, invoiceDetailsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /invoice-details : get all the invoiceDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of invoiceDetails in body
     */
    @GetMapping("/invoice-details")
    @Timed
    public ResponseEntity<List<InvoiceDetailsDTO>> getAllInvoiceDetails(Pageable pageable) {
        log.debug("REST request to get a page of InvoiceDetails");
        Page<InvoiceDetailsDTO> page = invoiceDetailsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-details");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /invoice-details/:id : get the "id" invoiceDetails.
     *
     * @param id the id of the invoiceDetailsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the invoiceDetailsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/invoice-details/{id}")
    @Timed
    public ResponseEntity<InvoiceDetailsDTO> getInvoiceDetails(@PathVariable Long id) {
        log.debug("REST request to get InvoiceDetails : {}", id);
        Optional<InvoiceDetailsDTO> invoiceDetailsDTO = invoiceDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(invoiceDetailsDTO);
    }

    /**
     * DELETE  /invoice-details/:id : delete the "id" invoiceDetails.
     *
     * @param id the id of the invoiceDetailsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/invoice-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteInvoiceDetails(@PathVariable Long id) {
        log.debug("REST request to delete InvoiceDetails : {}", id);
        invoiceDetailsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    // AnhVD new code
    /**
     * GET  /invoice-details/by-invoice-header?id=:id : get the invoiceDetails by header Id.
     *
     * @param id the id of the invoice header to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the invoiceDetailsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/invoice-details/by-invoice-header")
    @Timed
    public ResponseEntity<List<InvoiceDetailsDTO>> getInvoiceDetailsByHeaderId(@RequestParam("id") Long id) {
    	List<InvoiceDetailsDTO> invoiceDetailsDTO = invoiceDetailsService.getInvoiceDetailsByHeaderId(id);
        return new ResponseEntity<>(invoiceDetailsDTO, HttpStatus.OK);
    }
}
