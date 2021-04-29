package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.RequestDetailsService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.service.dto.RequestDetailsDTO;
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
 * REST controller for managing RequestDetails.
 */
@RestController
@RequestMapping("/api")
public class RequestDetailsResource {

    private final Logger log = LoggerFactory.getLogger(RequestDetailsResource.class);

    private static final String ENTITY_NAME = "ctsmicroserviceRequestDetails";

    private RequestDetailsService requestDetailsService;

    public RequestDetailsResource(RequestDetailsService requestDetailsService) {
        this.requestDetailsService = requestDetailsService;
    }

    /**
     * POST  /request-details : Create a new requestDetails.
     *
     * @param requestDetailsDTO the requestDetailsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new requestDetailsDTO, or with status 400 (Bad Request) if the requestDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/request-details")
    @Timed
    public ResponseEntity<RequestDetailsDTO> createRequestDetails(@RequestBody RequestDetailsDTO requestDetailsDTO) throws URISyntaxException {
        log.debug("REST request to save RequestDetails : {}", requestDetailsDTO);
        if (requestDetailsDTO.getId() != null) {
            throw new BadRequestAlertException("A new requestDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RequestDetailsDTO result = requestDetailsService.save(requestDetailsDTO);
        return ResponseEntity.created(new URI("/api/request-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /request-details : Updates an existing requestDetails.
     *
     * @param requestDetailsDTO the requestDetailsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated requestDetailsDTO,
     * or with status 400 (Bad Request) if the requestDetailsDTO is not valid,
     * or with status 500 (Internal Server Error) if the requestDetailsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/request-details")
    @Timed
    public ResponseEntity<RequestDetailsDTO> updateRequestDetails(@RequestBody RequestDetailsDTO requestDetailsDTO) throws URISyntaxException {
        log.debug("REST request to update RequestDetails : {}", requestDetailsDTO);
        if (requestDetailsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RequestDetailsDTO result = requestDetailsService.save(requestDetailsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, requestDetailsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /request-details : get all the requestDetails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of requestDetails in body
     */
    @GetMapping("/request-details")
    @Timed
    public List<RequestDetailsDTO> getAllRequestDetails() {
        log.debug("REST request to get all RequestDetails");
        return requestDetailsService.findAll();
    }

    /**
     * GET  /request-details/:id : get the "id" requestDetails.
     *
     * @param id the id of the requestDetailsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the requestDetailsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/request-details/{id}")
    @Timed
    public ResponseEntity<RequestDetailsDTO> getRequestDetails(@PathVariable Long id) {
        log.debug("REST request to get RequestDetails : {}", id);
        Optional<RequestDetailsDTO> requestDetailsDTO = requestDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(requestDetailsDTO);
    }

    /**
     * DELETE  /request-details/:id : delete the "id" requestDetails.
     *
     * @param id the id of the requestDetailsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/request-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteRequestDetails(@PathVariable Long id) {
        log.debug("REST request to delete RequestDetails : {}", id);
        requestDetailsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
