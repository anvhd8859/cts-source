package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.SubDistrictService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.web.rest.util.PaginationUtil;
import com.fu.capstone.service.dto.SubDistrictDTO;
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
 * REST controller for managing SubDistrict.
 */
@RestController
@RequestMapping("/api")
public class SubDistrictResource {

    private final Logger log = LoggerFactory.getLogger(SubDistrictResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceSubDistrict";

    private SubDistrictService subDistrictService;

    public SubDistrictResource(SubDistrictService subDistrictService) {
        this.subDistrictService = subDistrictService;
    }

    /**
     * POST  /sub-districts : Create a new subDistrict.
     *
     * @param subDistrictDTO the subDistrictDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subDistrictDTO, or with status 400 (Bad Request) if the subDistrict has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sub-districts")
    @Timed
    public ResponseEntity<SubDistrictDTO> createSubDistrict(@RequestBody SubDistrictDTO subDistrictDTO) throws URISyntaxException {
        log.debug("REST request to save SubDistrict : {}", subDistrictDTO);
        if (subDistrictDTO.getId() != null) {
            throw new BadRequestAlertException("A new subDistrict cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubDistrictDTO result = subDistrictService.save(subDistrictDTO);
        return ResponseEntity.created(new URI("/api/sub-districts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sub-districts : Updates an existing subDistrict.
     *
     * @param subDistrictDTO the subDistrictDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subDistrictDTO,
     * or with status 400 (Bad Request) if the subDistrictDTO is not valid,
     * or with status 500 (Internal Server Error) if the subDistrictDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sub-districts")
    @Timed
    public ResponseEntity<SubDistrictDTO> updateSubDistrict(@RequestBody SubDistrictDTO subDistrictDTO) throws URISyntaxException {
        log.debug("REST request to update SubDistrict : {}", subDistrictDTO);
        if (subDistrictDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubDistrictDTO result = subDistrictService.save(subDistrictDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subDistrictDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sub-districts : get all the subDistricts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of subDistricts in body
     */
    @GetMapping("/sub-districts")
    @Timed
    public ResponseEntity<List<SubDistrictDTO>> getAllSubDistricts(Pageable pageable) {
        log.debug("REST request to get a page of SubDistricts");
        Page<SubDistrictDTO> page = subDistrictService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sub-districts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sub-districts/:id : get the "id" subDistrict.
     *
     * @param id the id of the subDistrictDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subDistrictDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sub-districts/{id}")
    @Timed
    public ResponseEntity<SubDistrictDTO> getSubDistrict(@PathVariable Long id) {
        log.debug("REST request to get SubDistrict : {}", id);
        Optional<SubDistrictDTO> subDistrictDTO = subDistrictService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subDistrictDTO);
    }

    /**
     * DELETE  /sub-districts/:id : delete the "id" subDistrict.
     *
     * @param id the id of the subDistrictDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sub-districts/{id}")
    @Timed
    public ResponseEntity<Void> deleteSubDistrict(@PathVariable Long id) {
        log.debug("REST request to delete SubDistrict : {}", id);
        subDistrictService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    
    /**
     * GET  /sub-districts/by-district-id : get all the subDistricts by district id.
     *
     * @param id the id of district
     * @return the ResponseEntity with status 200 (OK) and the list of subDistricts in body
     */
    @GetMapping("/sub-districts/by-district-id")
    @Timed
    public ResponseEntity<List<SubDistrictDTO>> getAllSubDistrictsByDistrictId(@RequestParam("id")Long id) {
        List<SubDistrictDTO> page = subDistrictService.getAllSubDistrictsByDistrictId(id);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }
}
