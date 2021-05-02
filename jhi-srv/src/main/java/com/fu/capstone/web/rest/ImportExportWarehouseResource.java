package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.ImportExportWarehouseService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.web.rest.util.PaginationUtil;
import com.fu.capstone.service.dto.DetailsImportExportDTO;
import com.fu.capstone.service.dto.ImportExportWarehouseDTO;
import com.fu.capstone.service.dto.InvoicePackageDetailDTO;

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
 * REST controller for managing ImportExportWarehouse.
 */
@RestController
@RequestMapping("/api")
public class ImportExportWarehouseResource {

	private final Logger log = LoggerFactory.getLogger(ImportExportWarehouseResource.class);

	private static final String ENTITY_NAME = "ctsmicroserviceImportExportWarehouse";

	private ImportExportWarehouseService importExportWarehouseService;

	public ImportExportWarehouseResource(ImportExportWarehouseService importExportWarehouseService) {
		this.importExportWarehouseService = importExportWarehouseService;
	}

	/**
	 * POST /import-export-warehouses : Create a new importExportWarehouse.
	 *
	 * @param importExportWarehouseDTO
	 *            the importExportWarehouseDTO to create
	 * @return the ResponseEntity with status 201 (Created) and with body the
	 *         new importExportWarehouseDTO, or with status 400 (Bad Request) if
	 *         the importExportWarehouse has already an ID
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PostMapping("/import-export-warehouses")
	@Timed
	public ResponseEntity<ImportExportWarehouseDTO> createImportExportWarehouse(
			@RequestBody ImportExportWarehouseDTO importExportWarehouseDTO) throws URISyntaxException {
		log.debug("REST request to save ImportExportWarehouse : {}", importExportWarehouseDTO);
		if (importExportWarehouseDTO.getId() != null) {
			throw new BadRequestAlertException("A new importExportWarehouse cannot already have an ID", ENTITY_NAME,
					"idexists");
		}
		ImportExportWarehouseDTO result = importExportWarehouseService.save(importExportWarehouseDTO);
		return ResponseEntity.created(new URI("/api/import-export-warehouses/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /import-export-warehouses : Updates an existing
	 * importExportWarehouse.
	 *
	 * @param importExportWarehouseDTO
	 *            the importExportWarehouseDTO to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated
	 *         importExportWarehouseDTO, or with status 400 (Bad Request) if the
	 *         importExportWarehouseDTO is not valid, or with status 500
	 *         (Internal Server Error) if the importExportWarehouseDTO couldn't
	 *         be updated
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PutMapping("/import-export-warehouses")
	@Timed
	public ResponseEntity<ImportExportWarehouseDTO> updateImportExportWarehouse(
			@RequestBody ImportExportWarehouseDTO importExportWarehouseDTO) throws URISyntaxException {
		log.debug("REST request to update ImportExportWarehouse : {}", importExportWarehouseDTO);
		if (importExportWarehouseDTO.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		ImportExportWarehouseDTO result = importExportWarehouseService.save(importExportWarehouseDTO);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, importExportWarehouseDTO.getId().toString()))
				.body(result);
	}

	/**
	 * GET /import-export-warehouses : get all the importExportWarehouses.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         importExportWarehouses in body
	 */
	@GetMapping("/import-export-warehouses")
	@Timed
	public ResponseEntity<List<ImportExportWarehouseDTO>> getAllImportExportWarehouses(Pageable pageable) {
		log.debug("REST request to get a page of ImportExportWarehouses");
		Page<ImportExportWarehouseDTO> page = importExportWarehouseService.findAll(pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/import-export-warehouses");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	/**
	 * GET /import-export-warehouses/:id : get the "id" importExportWarehouse.
	 *
	 * @param id
	 *            the id of the importExportWarehouseDTO to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the
	 *         importExportWarehouseDTO, or with status 404 (Not Found)
	 */
	@GetMapping("/import-export-warehouses/{id}")
	@Timed
	public ResponseEntity<ImportExportWarehouseDTO> getImportExportWarehouse(@PathVariable Long id) {
		log.debug("REST request to get ImportExportWarehouse : {}", id);
		Optional<ImportExportWarehouseDTO> importExportWarehouseDTO = importExportWarehouseService.findOne(id);
		return ResponseUtil.wrapOrNotFound(importExportWarehouseDTO);
	}

	/**
	 * DELETE /import-export-warehouses/:id : delete the "id"
	 * importExportWarehouse.
	 *
	 * @param id
	 *            the id of the importExportWarehouseDTO to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/import-export-warehouses/{id}")
	@Timed
	public ResponseEntity<Void> deleteImportExportWarehouse(@PathVariable Long id) {
		log.debug("REST request to delete ImportExportWarehouse : {}", id);
		importExportWarehouseService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

	@PostMapping("/import-export-warehouses/request-import")
	@Timed
	public ResponseEntity<ImportExportWarehouseDTO> createImportWarehouse(
			@RequestBody DetailsImportExportDTO importExportWarehouseDTO) throws URISyntaxException {
		log.debug("REST request to save ImportExportWarehouse : {}", importExportWarehouseDTO);
		if (importExportWarehouseDTO.getRequestHeader().getId() != null) {
			throw new BadRequestAlertException("A new importExportWarehouse cannot already have an ID", ENTITY_NAME,
					"idexists");
		}
		ImportExportWarehouseDTO result = importExportWarehouseService.createImportWarehouse(importExportWarehouseDTO);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	@PostMapping("/import-export-warehouses/request-export")
	@Timed
	public ResponseEntity<ImportExportWarehouseDTO> createExportWarehouse(
			@RequestBody DetailsImportExportDTO importExportWarehouseDTO) throws URISyntaxException {
		log.debug("REST request to save ImportExportWarehouse : {}", importExportWarehouseDTO);
		if (importExportWarehouseDTO.getRequestHeader().getId() != null) {
			throw new BadRequestAlertException("A new importExportWarehouse cannot already have an ID", ENTITY_NAME,
					"idexists");
		}
		ImportExportWarehouseDTO result = importExportWarehouseService.createExportWarehouse(importExportWarehouseDTO);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	@GetMapping("/import-export-warehouses/filter")
	@Timed
	public ResponseEntity<List<ImportExportWarehouseDTO>> getImportExportWarehouseByFilter(
			@RequestParam("eid") Long eid, @RequestParam("oid") Long oid, @RequestParam("type") String type,
			@RequestParam("cf") String cf, Pageable pageable) {
		log.debug("REST request to get ImportExportWarehouse filter: ");
		Page<ImportExportWarehouseDTO> page = importExportWarehouseService.getImportExportWarehouseByFilter(eid, oid,
				type, cf, pageable);
		HttpHeaders header = PaginationUtil.generatePaginationHttpHeaders(page, "/api/import-export-warehouses/filter");
		return new ResponseEntity<>(page.getContent(), header, HttpStatus.OK);
	}

	@PutMapping("/import-export-warehouses/by-keeper/{id}")
	@Timed
	public ResponseEntity<ImportExportWarehouseDTO> updateImportExportByKeeper(@PathVariable Long id,
			@RequestBody List<InvoicePackageDetailDTO> InvoicePackageDetailDTO) throws URISyntaxException {
		log.debug("REST request to update ImportExportWarehouse : {}", "");
		ImportExportWarehouseDTO result = importExportWarehouseService
				.updateImportExportByKeeper(id, InvoicePackageDetailDTO);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, id.toString()))
				.body(result);
	}

	@GetMapping("/import-export-warehouses/by-shipper")
	@Timed
	public ResponseEntity<List<ImportExportWarehouseDTO>> getImportExportWarehouseForShipper(
			@RequestParam("eid") Long eid, @RequestParam("type") String type, @RequestParam("cf") String cf,
			Pageable pageable) {
		log.debug("REST request to get ImportExportWarehouse filter: ");
		Page<ImportExportWarehouseDTO> page = importExportWarehouseService.getImportExportWarehouseForShipper(eid, type,
				cf, pageable);
		HttpHeaders header = PaginationUtil.generatePaginationHttpHeaders(page, "/api/import-export-warehouses/filter");
		return new ResponseEntity<>(page.getContent(), header, HttpStatus.OK);
	}
}
