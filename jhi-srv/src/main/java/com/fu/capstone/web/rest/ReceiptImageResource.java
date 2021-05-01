package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.ReceiptImageService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.service.dto.ReceiptImageDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ReceiptImage.
 */
@RestController
@RequestMapping("/api")
public class ReceiptImageResource {

    private final Logger log = LoggerFactory.getLogger(ReceiptImageResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceReceiptImage";

    private ReceiptImageService receiptImageService;

    public ReceiptImageResource(ReceiptImageService receiptImageService) {
        this.receiptImageService = receiptImageService;
    }

    /**
     * POST  /receipt-images : Create a new receiptImage.
     *
     * @param receiptImageDTO the receiptImageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new receiptImageDTO, or with status 400 (Bad Request) if the receiptImage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/receipt-images")
    @Timed
    public ResponseEntity<ReceiptImageDTO> createReceiptImage(@RequestBody ReceiptImageDTO receiptImageDTO) throws URISyntaxException {
        log.debug("REST request to save ReceiptImage : {}", receiptImageDTO);
        if (receiptImageDTO.getId() != null) {
            throw new BadRequestAlertException("A new receiptImage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReceiptImageDTO result = receiptImageService.save(receiptImageDTO);
        return ResponseEntity.created(new URI("/api/receipt-images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /receipt-images : Updates an existing receiptImage.
     *
     * @param receiptImageDTO the receiptImageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated receiptImageDTO,
     * or with status 400 (Bad Request) if the receiptImageDTO is not valid,
     * or with status 500 (Internal Server Error) if the receiptImageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/receipt-images")
    @Timed
    public ResponseEntity<ReceiptImageDTO> updateReceiptImage(@RequestBody ReceiptImageDTO receiptImageDTO) throws URISyntaxException {
        log.debug("REST request to update ReceiptImage : {}", receiptImageDTO);
        if (receiptImageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReceiptImageDTO result = receiptImageService.save(receiptImageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, receiptImageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /receipt-images : get all the receiptImages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of receiptImages in body
     */
    @GetMapping("/receipt-images")
    @Timed
    public List<ReceiptImageDTO> getAllReceiptImages() {
        log.debug("REST request to get all ReceiptImages");
        return receiptImageService.findAll();
    }

    /**
     * GET  /receipt-images/:id : get the "id" receiptImage.
     *
     * @param id the id of the receiptImageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the receiptImageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/receipt-images/{id}")
    @Timed
    public ResponseEntity<ReceiptImageDTO> getReceiptImage(@PathVariable Long id) {
        log.debug("REST request to get ReceiptImage : {}", id);
        Optional<ReceiptImageDTO> receiptImageDTO = receiptImageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(receiptImageDTO);
    }

    /**
     * DELETE  /receipt-images/:id : delete the "id" receiptImage.
     *
     * @param id the id of the receiptImageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/receipt-images/{id}")
    @Timed
    public ResponseEntity<Void> deleteReceiptImage(@PathVariable Long id) {
        log.debug("REST request to delete ReceiptImage : {}", id);
        receiptImageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
