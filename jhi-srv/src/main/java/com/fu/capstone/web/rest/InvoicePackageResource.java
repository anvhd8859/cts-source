package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.InvoicePackageService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.service.dto.InvoicePackageDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing InvoicePackage.
 */
@RestController
@RequestMapping("/api")
public class InvoicePackageResource {

    private final Logger log = LoggerFactory.getLogger(InvoicePackageResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceInvoicePackage";

    private InvoicePackageService invoicePackageService;

    public InvoicePackageResource(InvoicePackageService invoicePackageService) {
        this.invoicePackageService = invoicePackageService;
    }

    /**
     * POST  /invoice-packages : Create a new invoicePackage.
     *
     * @param invoicePackageDTO the invoicePackageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new invoicePackageDTO, or with status 400 (Bad Request) if the invoicePackage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/invoice-packages")
    @Timed
    public ResponseEntity<InvoicePackageDTO> createInvoicePackage(@RequestBody InvoicePackageDTO invoicePackageDTO) throws URISyntaxException {
        log.debug("REST request to save InvoicePackage : {}", invoicePackageDTO);
        if (invoicePackageDTO.getId() != null) {
            throw new BadRequestAlertException("A new invoicePackage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InvoicePackageDTO result = invoicePackageService.save(invoicePackageDTO);
        return ResponseEntity.created(new URI("/api/invoice-packages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /invoice-packages : Updates an existing invoicePackage.
     *
     * @param invoicePackageDTO the invoicePackageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated invoicePackageDTO,
     * or with status 400 (Bad Request) if the invoicePackageDTO is not valid,
     * or with status 500 (Internal Server Error) if the invoicePackageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/invoice-packages")
    @Timed
    public ResponseEntity<InvoicePackageDTO> updateInvoicePackage(@RequestBody InvoicePackageDTO invoicePackageDTO) throws URISyntaxException {
        log.debug("REST request to update InvoicePackage : {}", invoicePackageDTO);
        if (invoicePackageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InvoicePackageDTO result = invoicePackageService.save(invoicePackageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, invoicePackageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /invoice-packages : get all the invoicePackages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of invoicePackages in body
     */
    @GetMapping("/invoice-packages")
    @Timed
    public List<InvoicePackageDTO> getAllInvoicePackages() {
        log.debug("REST request to get all InvoicePackages");
        return invoicePackageService.findAll();
    }

    /**
     * GET  /invoice-packages/:id : get the "id" invoicePackage.
     *
     * @param id the id of the invoicePackageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the invoicePackageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/invoice-packages/{id}")
    @Timed
    public ResponseEntity<InvoicePackageDTO> getInvoicePackage(@PathVariable Long id) {
        log.debug("REST request to get InvoicePackage : {}", id);
        Optional<InvoicePackageDTO> invoicePackageDTO = invoicePackageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(invoicePackageDTO);
    }

    /**
     * DELETE  /invoice-packages/:id : delete the "id" invoicePackage.
     *
     * @param id the id of the invoicePackageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/invoice-packages/{id}")
    @Timed
    public ResponseEntity<Void> deleteInvoicePackage(@PathVariable Long id) {
        log.debug("REST request to delete InvoicePackage : {}", id);
        invoicePackageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    // AnhVD new code
    /**
     * GET  /invoice-packages/by-invoice-header?:id : get the invoicePackage by header id.
     *
     * @param id the id of the invoice header to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the invoicePackageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/invoice-packages/by-invoice-header")
    @Timed
    public ResponseEntity<List<InvoicePackageDTO>> getInvoicePackageByHeaderId(@RequestParam("id") Long id) {
    	List<InvoicePackageDTO> invoicePackageDTO = invoicePackageService.getInvoicePackageByHeaderId(id);
        return new ResponseEntity<>(invoicePackageDTO, HttpStatus.OK);
    }
}
