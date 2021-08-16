package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.WarehouseTransferRequestService;
import com.fu.capstone.service.dto.TransferDetailsInvoiceDTO;
import com.fu.capstone.service.dto.TransferInvoicePackageDTO;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.service.dto.WarehouseTransferRequestDTO;
import com.fu.capstone.web.rest.util.PaginationUtil;
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
 * REST controller for managing WarehouseTransferRequest.
 */
@RestController
@RequestMapping("/api")
public class WarehouseTransferRequestResource {

	private final Logger log = LoggerFactory.getLogger(WarehouseTransferRequestResource.class);

	private static final String ENTITY_NAME = "ctsmicroserviceWarehouseTransferRequest";

	private WarehouseTransferRequestService warehouseTransferRequestService;

	public WarehouseTransferRequestResource(WarehouseTransferRequestService warehouseTransferRequestService) {
		this.warehouseTransferRequestService = warehouseTransferRequestService;
	}

	/**
	 * POST  /warehouse-transfer-requests : Create a new warehouseTransferRequest.
	 *
	 * @param warehouseTransferRequestDTO the warehouseTransferRequestDTO to create
	 * @return the ResponseEntity with status 201 (Created) and with body the new warehouseTransferRequestDTO, or with status 400 (Bad Request) if the warehouseTransferRequest has already an ID
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PostMapping("/warehouse-transfer-requests")
	@Timed
	public ResponseEntity<WarehouseTransferRequestDTO> createWarehouseTransferRequest(
			@RequestBody WarehouseTransferRequestDTO warehouseTransferRequestDTO) throws URISyntaxException {
		log.debug("REST request to save WarehouseTransferRequest : {}", warehouseTransferRequestDTO);
		if (warehouseTransferRequestDTO.getId() != null) {
			throw new BadRequestAlertException("A new warehouseTransferRequest cannot already have an ID", ENTITY_NAME, "idexists");
		}
		WarehouseTransferRequestDTO result = warehouseTransferRequestService.save(warehouseTransferRequestDTO);
		return ResponseEntity.created(new URI("/api/warehouse-transfer-requests/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * PUT  /warehouse-transfer-requests : Updates an existing warehouseTransferRequest.
	 *
	 * @param warehouseTransferRequestDTO the warehouseTransferRequestDTO to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated warehouseTransferRequestDTO,
	 * or with status 400 (Bad Request) if the warehouseTransferRequestDTO is not valid,
	 * or with status 500 (Internal Server Error) if the warehouseTransferRequestDTO couldn't be updated
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PutMapping("/warehouse-transfer-requests")
	@Timed
	public ResponseEntity<WarehouseTransferRequestDTO> updateWarehouseTransferRequest(
			@RequestBody WarehouseTransferRequestDTO warehouseTransferRequestDTO) throws URISyntaxException {
		log.debug("REST request to update WarehouseTransferRequest : {}", warehouseTransferRequestDTO);
		if (warehouseTransferRequestDTO.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		WarehouseTransferRequestDTO result = warehouseTransferRequestService.save(warehouseTransferRequestDTO);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, warehouseTransferRequestDTO.getId().toString()))
				.body(result);
	}

	/**
	 * GET  /warehouse-transfer-requests : get all the warehouseTransferRequests.
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of warehouseTransferRequests in body
	 */
	@GetMapping("/warehouse-transfer-requests")
	@Timed
	public List<WarehouseTransferRequestDTO> getAllWarehouseTransferRequests() {
		log.debug("REST request to get all WarehouseTransferRequests");
		return warehouseTransferRequestService.findAll();
	}

	/**
	 * GET  /warehouse-transfer-requests/:id : get the "id" warehouseTransferRequest.
	 *
	 * @param id the id of the warehouseTransferRequestDTO to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the warehouseTransferRequestDTO, or with status 404 (Not Found)
	 */
	@GetMapping("/warehouse-transfer-requests/{id}")
	@Timed
	public ResponseEntity<WarehouseTransferRequestDTO> getWarehouseTransferRequest(@PathVariable Long id) {
		log.debug("REST request to get WarehouseTransferRequest : {}", id);
		Optional<WarehouseTransferRequestDTO> warehouseTransferRequestDTO = warehouseTransferRequestService.findOne(id);
		return ResponseUtil.wrapOrNotFound(warehouseTransferRequestDTO);
	}

	/**
	 * DELETE  /warehouse-transfer-requests/:id : delete the "id" warehouseTransferRequest.
	 *
	 * @param id the id of the warehouseTransferRequestDTO to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/warehouse-transfer-requests/{id}")
	@Timed
	public ResponseEntity<Void> deleteWarehouseTransferRequest(@PathVariable Long id) {
		log.debug("REST request to delete WarehouseTransferRequest : {}", id);
		warehouseTransferRequestService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

	// v2
	@PostMapping("/warehouse-transfer-requests/export-package")
	@Timed
	public ResponseEntity<WarehouseTransferRequestDTO> createTransferRequest(
			@RequestBody TransferInvoicePackageDTO body) throws URISyntaxException {
		log.debug("REST request to save WarehouseTransferRequest");
		WarehouseTransferRequestDTO result = warehouseTransferRequestService.createTransferRequest(body);
		return ResponseEntity.created(new URI("/api/warehouse-transfer-requests/export-package" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	@GetMapping("/warehouse-transfer-requests/office")
	@Timed
	public ResponseEntity<List<TransferInvoicePackageDTO>> getWarehouseTransferByOffice(@RequestParam Long id,
			Pageable pageable) {
		Page<TransferInvoicePackageDTO> page = warehouseTransferRequestService.getWarehouseTransferByOffice(id, pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/warehouse-transfer-requests/office");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	@GetMapping("/warehouse-transfer-requests/full-detail/{id}")
	@Timed
	public ResponseEntity<List<TransferDetailsInvoiceDTO>> getWarehouseTransferData(@PathVariable Long id) {
		List<TransferDetailsInvoiceDTO> data = warehouseTransferRequestService.getWarehouseTransferData(id);
		return new ResponseEntity<>(data, HttpStatus.OK);
	}

	@PostMapping("/warehouse-transfer-requests/approve")
	@Timed
	public ResponseEntity<WarehouseTransferRequestDTO> approveTransferRequest(
			@RequestBody List<TransferDetailsInvoiceDTO> body) throws URISyntaxException {
		WarehouseTransferRequestDTO result = warehouseTransferRequestService.approveTransferRequest(body);
		return ResponseEntity.created(new URI("/api/warehouse-transfer-requests/approve" + result.getId()))
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}
}
