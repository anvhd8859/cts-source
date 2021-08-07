package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.TransferDetailsService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.web.rest.util.PaginationUtil;
import com.fu.capstone.service.dto.TransferDetailsDTO;
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
 * REST controller for managing TransferDetails.
 */
@RestController
@RequestMapping("/api")
public class TransferDetailsResource {

    private final Logger log = LoggerFactory.getLogger(TransferDetailsResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceTransferDetails";

    private TransferDetailsService transferDetailsService;

    public TransferDetailsResource(TransferDetailsService transferDetailsService) {
        this.transferDetailsService = transferDetailsService;
    }

    /**
     * POST  /transfer-details : Create a new transferDetails.
     *
     * @param transferDetailsDTO the transferDetailsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transferDetailsDTO, or with status 400 (Bad Request) if the transferDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transfer-details")
    @Timed
    public ResponseEntity<TransferDetailsDTO> createTransferDetails(@RequestBody TransferDetailsDTO transferDetailsDTO) throws URISyntaxException {
        log.debug("REST request to save TransferDetails : {}", transferDetailsDTO);
        if (transferDetailsDTO.getId() != null) {
            throw new BadRequestAlertException("A new transferDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransferDetailsDTO result = transferDetailsService.save(transferDetailsDTO);
        return ResponseEntity.created(new URI("/api/transfer-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transfer-details : Updates an existing transferDetails.
     *
     * @param transferDetailsDTO the transferDetailsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transferDetailsDTO,
     * or with status 400 (Bad Request) if the transferDetailsDTO is not valid,
     * or with status 500 (Internal Server Error) if the transferDetailsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transfer-details")
    @Timed
    public ResponseEntity<TransferDetailsDTO> updateTransferDetails(@RequestBody TransferDetailsDTO transferDetailsDTO) throws URISyntaxException {
        log.debug("REST request to update TransferDetails : {}", transferDetailsDTO);
        if (transferDetailsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransferDetailsDTO result = transferDetailsService.save(transferDetailsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transferDetailsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transfer-details : get all the transferDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of transferDetails in body
     */
    @GetMapping("/transfer-details")
    @Timed
    public ResponseEntity<List<TransferDetailsDTO>> getAllTransferDetails(Pageable pageable) {
        log.debug("REST request to get a page of TransferDetails");
        Page<TransferDetailsDTO> page = transferDetailsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/transfer-details");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /transfer-details/:id : get the "id" transferDetails.
     *
     * @param id the id of the transferDetailsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transferDetailsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transfer-details/{id}")
    @Timed
    public ResponseEntity<TransferDetailsDTO> getTransferDetails(@PathVariable Long id) {
        log.debug("REST request to get TransferDetails : {}", id);
        Optional<TransferDetailsDTO> transferDetailsDTO = transferDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transferDetailsDTO);
    }

    /**
     * DELETE  /transfer-details/:id : delete the "id" transferDetails.
     *
     * @param id the id of the transferDetailsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transfer-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransferDetails(@PathVariable Long id) {
        log.debug("REST request to delete TransferDetails : {}", id);
        transferDetailsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
