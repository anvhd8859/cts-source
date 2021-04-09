package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.TransferVehicleService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.web.rest.util.PaginationUtil;
import com.fu.capstone.service.dto.TransferVehicleDTO;
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
 * REST controller for managing TransferVehicle.
 */
@RestController
@RequestMapping("/api")
public class TransferVehicleResource {

    private final Logger log = LoggerFactory.getLogger(TransferVehicleResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceTransferVehicle";

    private TransferVehicleService transferVehicleService;

    public TransferVehicleResource(TransferVehicleService transferVehicleService) {
        this.transferVehicleService = transferVehicleService;
    }

    /**
     * POST  /transfer-vehicles : Create a new transferVehicle.
     *
     * @param transferVehicleDTO the transferVehicleDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transferVehicleDTO, or with status 400 (Bad Request) if the transferVehicle has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transfer-vehicles")
    @Timed
    public ResponseEntity<TransferVehicleDTO> createTransferVehicle(@RequestBody TransferVehicleDTO transferVehicleDTO) throws URISyntaxException {
        log.debug("REST request to save TransferVehicle : {}", transferVehicleDTO);
        if (transferVehicleDTO.getId() != null) {
            throw new BadRequestAlertException("A new transferVehicle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransferVehicleDTO result = transferVehicleService.save(transferVehicleDTO);
        return ResponseEntity.created(new URI("/api/transfer-vehicles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transfer-vehicles : Updates an existing transferVehicle.
     *
     * @param transferVehicleDTO the transferVehicleDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transferVehicleDTO,
     * or with status 400 (Bad Request) if the transferVehicleDTO is not valid,
     * or with status 500 (Internal Server Error) if the transferVehicleDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transfer-vehicles")
    @Timed
    public ResponseEntity<TransferVehicleDTO> updateTransferVehicle(@RequestBody TransferVehicleDTO transferVehicleDTO) throws URISyntaxException {
        log.debug("REST request to update TransferVehicle : {}", transferVehicleDTO);
        if (transferVehicleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransferVehicleDTO result = transferVehicleService.save(transferVehicleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transferVehicleDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transfer-vehicles : get all the transferVehicles.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of transferVehicles in body
     */
    @GetMapping("/transfer-vehicles")
    @Timed
    public ResponseEntity<List<TransferVehicleDTO>> getAllTransferVehicles(Pageable pageable) {
        log.debug("REST request to get a page of TransferVehicles");
        Page<TransferVehicleDTO> page = transferVehicleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/transfer-vehicles");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /transfer-vehicles/:id : get the "id" transferVehicle.
     *
     * @param id the id of the transferVehicleDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transferVehicleDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transfer-vehicles/{id}")
    @Timed
    public ResponseEntity<TransferVehicleDTO> getTransferVehicle(@PathVariable Long id) {
        log.debug("REST request to get TransferVehicle : {}", id);
        Optional<TransferVehicleDTO> transferVehicleDTO = transferVehicleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transferVehicleDTO);
    }

    /**
     * DELETE  /transfer-vehicles/:id : delete the "id" transferVehicle.
     *
     * @param id the id of the transferVehicleDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transfer-vehicles/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransferVehicle(@PathVariable Long id) {
        log.debug("REST request to delete TransferVehicle : {}", id);
        transferVehicleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
