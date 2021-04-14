package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.ShiftService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.service.dto.ShiftDTO;
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
 * REST controller for managing Shift.
 */
@RestController
@RequestMapping("/api")
public class ShiftResource {

    private final Logger log = LoggerFactory.getLogger(ShiftResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceShift";

    private ShiftService shiftService;

    public ShiftResource(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    /**
     * POST  /shifts : Create a new shift.
     *
     * @param shiftDTO the shiftDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new shiftDTO, or with status 400 (Bad Request) if the shift has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/shifts")
    @Timed
    public ResponseEntity<ShiftDTO> createShift(@RequestBody ShiftDTO shiftDTO) throws URISyntaxException {
        log.debug("REST request to save Shift : {}", shiftDTO);
        if (shiftDTO.getId() != null) {
            throw new BadRequestAlertException("A new shift cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ShiftDTO result = shiftService.save(shiftDTO);
        return ResponseEntity.created(new URI("/api/shifts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /shifts : Updates an existing shift.
     *
     * @param shiftDTO the shiftDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated shiftDTO,
     * or with status 400 (Bad Request) if the shiftDTO is not valid,
     * or with status 500 (Internal Server Error) if the shiftDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/shifts")
    @Timed
    public ResponseEntity<ShiftDTO> updateShift(@RequestBody ShiftDTO shiftDTO) throws URISyntaxException {
        log.debug("REST request to update Shift : {}", shiftDTO);
        if (shiftDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ShiftDTO result = shiftService.save(shiftDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shiftDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /shifts : get all the shifts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of shifts in body
     */
    @GetMapping("/shifts")
    @Timed
    public List<ShiftDTO> getAllShifts() {
        log.debug("REST request to get all Shifts");
        return shiftService.findAll();
    }

    /**
     * GET  /shifts/:id : get the "id" shift.
     *
     * @param id the id of the shiftDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shiftDTO, or with status 404 (Not Found)
     */
    @GetMapping("/shifts/{id}")
    @Timed
    public ResponseEntity<ShiftDTO> getShift(@PathVariable Long id) {
        log.debug("REST request to get Shift : {}", id);
        Optional<ShiftDTO> shiftDTO = shiftService.findOne(id);
        return ResponseUtil.wrapOrNotFound(shiftDTO);
    }

    /**
     * DELETE  /shifts/:id : delete the "id" shift.
     *
     * @param id the id of the shiftDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shifts/{id}")
    @Timed
    public ResponseEntity<Void> deleteShift(@PathVariable Long id) {
        log.debug("REST request to delete Shift : {}", id);
        shiftService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
