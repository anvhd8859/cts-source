package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.WorkingAreaService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.web.rest.util.PaginationUtil;
import com.fu.capstone.service.dto.WorkingAreaDTO;
import com.fu.capstone.service.dto.WorkingAreaStreetDTO;

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
 * REST controller for managing WorkingArea.
 */
@RestController
@RequestMapping("/api")
public class WorkingAreaResource {

    private final Logger log = LoggerFactory.getLogger(WorkingAreaResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceWorkingArea";

    private WorkingAreaService workingAreaService;

    public WorkingAreaResource(WorkingAreaService workingAreaService) {
        this.workingAreaService = workingAreaService;
    }

    /**
     * POST  /working-areas : Create a new workingArea.
     *
     * @param workingAreaDTO the workingAreaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new workingAreaDTO, or with status 400 (Bad Request) if the workingArea has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/working-areas")
    @Timed
    public ResponseEntity<WorkingAreaDTO> createWorkingArea(@RequestBody WorkingAreaDTO workingAreaDTO) throws URISyntaxException {
        log.debug("REST request to save WorkingArea : {}", workingAreaDTO);
        if (workingAreaDTO.getId() != null) {
            throw new BadRequestAlertException("A new workingArea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WorkingAreaDTO result = workingAreaService.save(workingAreaDTO);
        return ResponseEntity.created(new URI("/api/working-areas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /working-areas : Updates an existing workingArea.
     *
     * @param workingAreaDTO the workingAreaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated workingAreaDTO,
     * or with status 400 (Bad Request) if the workingAreaDTO is not valid,
     * or with status 500 (Internal Server Error) if the workingAreaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/working-areas")
    @Timed
    public ResponseEntity<WorkingAreaDTO> updateWorkingArea(@RequestBody WorkingAreaDTO workingAreaDTO) throws URISyntaxException {
        log.debug("REST request to update WorkingArea : {}", workingAreaDTO);
        if (workingAreaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WorkingAreaDTO result = workingAreaService.save(workingAreaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, workingAreaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /working-areas : get all the workingAreas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of workingAreas in body
     */
    @GetMapping("/working-areas")
    @Timed
    public List<WorkingAreaDTO> getAllWorkingAreas() {
        log.debug("REST request to get all WorkingAreas");
        return workingAreaService.findAll();
    }

    /**
     * GET  /working-areas/:id : get the "id" workingArea.
     *
     * @param id the id of the workingAreaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the workingAreaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/working-areas/{id}")
    @Timed
    public ResponseEntity<WorkingAreaDTO> getWorkingArea(@PathVariable Long id) {
        log.debug("REST request to get WorkingArea : {}", id);
        Optional<WorkingAreaDTO> workingAreaDTO = workingAreaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(workingAreaDTO);
    }

    /**
     * DELETE  /working-areas/:id : delete the "id" workingArea.
     *
     * @param id the id of the workingAreaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/working-areas/{id}")
    @Timed
    public ResponseEntity<Void> deleteWorkingArea(@PathVariable Long id) {
        log.debug("REST request to delete WorkingArea : {}", id);
        workingAreaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/working-areas/filter")
    @Timed
    public ResponseEntity<List<WorkingAreaStreetDTO>> getWorkingAreaByFilter(@RequestParam("sid") Long sid, @RequestParam("eid") Long eid, Pageable pageable) {
        Page<WorkingAreaStreetDTO> page = workingAreaService.getWorkingAreaByFilter(sid, eid, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/working-areas/filter");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
