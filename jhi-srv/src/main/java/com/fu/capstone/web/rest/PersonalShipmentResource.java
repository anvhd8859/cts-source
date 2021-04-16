package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.PersonalShipmentService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.web.rest.util.PaginationUtil;
import com.fu.capstone.service.dto.PersonalShipmentDTO;
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
 * REST controller for managing PersonalShipment.
 */
@RestController
@RequestMapping("/api")
public class PersonalShipmentResource {

    private final Logger log = LoggerFactory.getLogger(PersonalShipmentResource.class);

    private static final String ENTITY_NAME = "ctsmicroservicePersonalShipment";

    private PersonalShipmentService personalShipmentService;

    public PersonalShipmentResource(PersonalShipmentService personalShipmentService) {
        this.personalShipmentService = personalShipmentService;
    }

    /**
     * POST  /personal-shipments : Create a new personalShipment.
     *
     * @param personalShipmentDTO the personalShipmentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new personalShipmentDTO, or with status 400 (Bad Request) if the personalShipment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/personal-shipments")
    @Timed
    public ResponseEntity<PersonalShipmentDTO> createPersonalShipment(@RequestBody PersonalShipmentDTO personalShipmentDTO) throws URISyntaxException {
        log.debug("REST request to save PersonalShipment : {}", personalShipmentDTO);
        if (personalShipmentDTO.getId() != null) {
            throw new BadRequestAlertException("A new personalShipment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PersonalShipmentDTO result = personalShipmentService.save(personalShipmentDTO);
        return ResponseEntity.created(new URI("/api/personal-shipments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /personal-shipments : Updates an existing personalShipment.
     *
     * @param personalShipmentDTO the personalShipmentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated personalShipmentDTO,
     * or with status 400 (Bad Request) if the personalShipmentDTO is not valid,
     * or with status 500 (Internal Server Error) if the personalShipmentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/personal-shipments")
    @Timed
    public ResponseEntity<PersonalShipmentDTO> updatePersonalShipment(@RequestBody PersonalShipmentDTO personalShipmentDTO) throws URISyntaxException {
        log.debug("REST request to update PersonalShipment : {}", personalShipmentDTO);
        if (personalShipmentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PersonalShipmentDTO result = personalShipmentService.save(personalShipmentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, personalShipmentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /personal-shipments : get all the personalShipments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of personalShipments in body
     */
    @GetMapping("/personal-shipments")
    @Timed
    public ResponseEntity<List<PersonalShipmentDTO>> getAllPersonalShipments(Pageable pageable) {
        log.debug("REST request to get a page of PersonalShipments");
        Page<PersonalShipmentDTO> page = personalShipmentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/personal-shipments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /personal-shipments/:id : get the "id" personalShipment.
     *
     * @param id the id of the personalShipmentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personalShipmentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/personal-shipments/{id}")
    @Timed
    public ResponseEntity<PersonalShipmentDTO> getPersonalShipment(@PathVariable Long id) {
        log.debug("REST request to get PersonalShipment : {}", id);
        Optional<PersonalShipmentDTO> personalShipmentDTO = personalShipmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(personalShipmentDTO);
    }

    /**
     * DELETE  /personal-shipments/:id : delete the "id" personalShipment.
     *
     * @param id the id of the personalShipmentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/personal-shipments/{id}")
    @Timed
    public ResponseEntity<Void> deletePersonalShipment(@PathVariable Long id) {
        log.debug("REST request to delete PersonalShipment : {}", id);
        personalShipmentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    // START TuyenVNT 14/04/2021
    /**
     * GET  /personal-shipment/by-invoice-header?:id : get the personalShipment by header id.
     *
     * @param id the id of the invoice header to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personalShipmentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/personal-shipments/by-invoice-header")
    @Timed
    public ResponseEntity<List<PersonalShipmentDTO>> getPersonalShipmentByHeaderId(@RequestParam("id") Long id, Pageable pageable) {
    	Page<PersonalShipmentDTO> page = personalShipmentService.getPersonalShipmentByHeaderId(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/personal-shipments/by-invoice-header");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    // END TuyenVNT 16/04/2021
    
    // START TuyenVNT 16/04/2021
    @GetMapping("/personal-shipments/not-assigned")
    @Timed
    public ResponseEntity<List<PersonalShipmentDTO>> getPersonalShipmentNotAssigned(Pageable pageable) {
    	Page<PersonalShipmentDTO> page = personalShipmentService.getPersonalShipmentNotAssigned(pageable);
    	HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/personal-shipments/not-assigned");
        
    }
    // END TuyenVNT 16/04/2021
}
