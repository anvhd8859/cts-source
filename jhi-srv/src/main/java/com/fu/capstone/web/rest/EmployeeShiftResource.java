package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.EmployeeShiftService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.service.dto.EmployeeShiftDTO;
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
 * REST controller for managing EmployeeShift.
 */
@RestController
@RequestMapping("/api")
public class EmployeeShiftResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeShiftResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceEmployeeShift";

    private EmployeeShiftService employeeShiftService;

    public EmployeeShiftResource(EmployeeShiftService employeeShiftService) {
        this.employeeShiftService = employeeShiftService;
    }

    /**
     * POST  /employee-shifts : Create a new employeeShift.
     *
     * @param employeeShiftDTO the employeeShiftDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new employeeShiftDTO, or with status 400 (Bad Request) if the employeeShift has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/employee-shifts")
    @Timed
    public ResponseEntity<EmployeeShiftDTO> createEmployeeShift(@RequestBody EmployeeShiftDTO employeeShiftDTO) throws URISyntaxException {
        log.debug("REST request to save EmployeeShift : {}", employeeShiftDTO);
        if (employeeShiftDTO.getId() != null) {
            throw new BadRequestAlertException("A new employeeShift cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmployeeShiftDTO result = employeeShiftService.save(employeeShiftDTO);
        return ResponseEntity.created(new URI("/api/employee-shifts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /employee-shifts : Updates an existing employeeShift.
     *
     * @param employeeShiftDTO the employeeShiftDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated employeeShiftDTO,
     * or with status 400 (Bad Request) if the employeeShiftDTO is not valid,
     * or with status 500 (Internal Server Error) if the employeeShiftDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/employee-shifts")
    @Timed
    public ResponseEntity<EmployeeShiftDTO> updateEmployeeShift(@RequestBody EmployeeShiftDTO employeeShiftDTO) throws URISyntaxException {
        log.debug("REST request to update EmployeeShift : {}", employeeShiftDTO);
        if (employeeShiftDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EmployeeShiftDTO result = employeeShiftService.save(employeeShiftDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, employeeShiftDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /employee-shifts : get all the employeeShifts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of employeeShifts in body
     */
    @GetMapping("/employee-shifts")
    @Timed
    public List<EmployeeShiftDTO> getAllEmployeeShifts() {
        log.debug("REST request to get all EmployeeShifts");
        return employeeShiftService.findAll();
    }

    /**
     * GET  /employee-shifts/:id : get the "id" employeeShift.
     *
     * @param id the id of the employeeShiftDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the employeeShiftDTO, or with status 404 (Not Found)
     */
    @GetMapping("/employee-shifts/{id}")
    @Timed
    public ResponseEntity<EmployeeShiftDTO> getEmployeeShift(@PathVariable Long id) {
        log.debug("REST request to get EmployeeShift : {}", id);
        Optional<EmployeeShiftDTO> employeeShiftDTO = employeeShiftService.findOne(id);
        return ResponseUtil.wrapOrNotFound(employeeShiftDTO);
    }

    /**
     * DELETE  /employee-shifts/:id : delete the "id" employeeShift.
     *
     * @param id the id of the employeeShiftDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/employee-shifts/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmployeeShift(@PathVariable Long id) {
        log.debug("REST request to delete EmployeeShift : {}", id);
        employeeShiftService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
