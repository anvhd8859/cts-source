package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.TransferPackingService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.web.rest.util.PaginationUtil;
import com.fu.capstone.service.dto.TransferPackingDTO;
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
 * REST controller for managing TransferPacking.
 */
@RestController
@RequestMapping("/api")
public class TransferPackingResource {

    private final Logger log = LoggerFactory.getLogger(TransferPackingResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceTransferPacking";

    private TransferPackingService transferPackingService;

    public TransferPackingResource(TransferPackingService transferPackingService) {
        this.transferPackingService = transferPackingService;
    }

    /**
     * POST  /transfer-packings : Create a new transferPacking.
     *
     * @param transferPackingDTO the transferPackingDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transferPackingDTO, or with status 400 (Bad Request) if the transferPacking has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transfer-packings")
    @Timed
    public ResponseEntity<TransferPackingDTO> createTransferPacking(@RequestBody TransferPackingDTO transferPackingDTO) throws URISyntaxException {
        log.debug("REST request to save TransferPacking : {}", transferPackingDTO);
        if (transferPackingDTO.getId() != null) {
            throw new BadRequestAlertException("A new transferPacking cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransferPackingDTO result = transferPackingService.save(transferPackingDTO);
        return ResponseEntity.created(new URI("/api/transfer-packings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transfer-packings : Updates an existing transferPacking.
     *
     * @param transferPackingDTO the transferPackingDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transferPackingDTO,
     * or with status 400 (Bad Request) if the transferPackingDTO is not valid,
     * or with status 500 (Internal Server Error) if the transferPackingDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transfer-packings")
    @Timed
    public ResponseEntity<TransferPackingDTO> updateTransferPacking(@RequestBody TransferPackingDTO transferPackingDTO) throws URISyntaxException {
        log.debug("REST request to update TransferPacking : {}", transferPackingDTO);
        if (transferPackingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransferPackingDTO result = transferPackingService.save(transferPackingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transferPackingDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transfer-packings : get all the transferPackings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of transferPackings in body
     */
    @GetMapping("/transfer-packings")
    @Timed
    public ResponseEntity<List<TransferPackingDTO>> getAllTransferPackings(Pageable pageable) {
        log.debug("REST request to get a page of TransferPackings");
        Page<TransferPackingDTO> page = transferPackingService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/transfer-packings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /transfer-packings/:id : get the "id" transferPacking.
     *
     * @param id the id of the transferPackingDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transferPackingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transfer-packings/{id}")
    @Timed
    public ResponseEntity<TransferPackingDTO> getTransferPacking(@PathVariable Long id) {
        log.debug("REST request to get TransferPacking : {}", id);
        Optional<TransferPackingDTO> transferPackingDTO = transferPackingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transferPackingDTO);
    }

    /**
     * DELETE  /transfer-packings/:id : delete the "id" transferPacking.
     *
     * @param id the id of the transferPackingDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transfer-packings/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransferPacking(@PathVariable Long id) {
        log.debug("REST request to delete TransferPacking : {}", id);
        transferPackingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }


    // AnhVD new code

    /**
     * GET  /transfer-packings/invoice-header?id=:id : get the "id" invoice header.
     *
     * @param id the id of the invoice header to retrieve TransferPacking
     * @return the ResponseEntity with status 200 (OK) and with body the transferPackingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transfer-packings/invoice-header")
    @Timed
    public ResponseEntity<List<TransferPackingDTO>> getTransferPackingByInvoiceHeaderId(@RequestParam("id") Long id) {
        List<TransferPackingDTO> transferPackingDTO = transferPackingService.getTransferPackingByInvoiceHeaderId(id);
        return new ResponseEntity<>(transferPackingDTO, HttpStatus.OK);
    }
}
