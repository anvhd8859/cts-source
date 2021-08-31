package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.InvoiceHeaderService;
import com.fu.capstone.service.dto.InvoicePackageShipmentDTO;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.web.rest.util.PaginationUtil;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;
import com.fu.capstone.service.dto.InvoicePackageDetailDTO;
import com.fu.capstone.service.dto.InvoiceShipmentDTO;

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
 * REST controller for managing InvoiceHeader.
 */
@RestController
@RequestMapping("/api")
public class InvoiceHeaderResource {

	private final Logger log = LoggerFactory.getLogger(InvoiceHeaderResource.class);

	private static final String ENTITY_NAME = "ctsmicroserviceInvoiceHeader";

	private InvoiceHeaderService invoiceHeaderService;

	public InvoiceHeaderResource(InvoiceHeaderService invoiceHeaderService) {
		this.invoiceHeaderService = invoiceHeaderService;
	}

	/**
	 * POST /invoice-headers : Create a new invoiceHeader.
	 *
	 * @param invoiceHeaderDTO the invoiceHeaderDTO to create
	 * @return the ResponseEntity with status 201 (Created) and with body the
	 * new invoiceHeaderDTO, or with status 400 (Bad Request) if the
	 * invoiceHeader has already an ID
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PostMapping("/invoice-headers")
	@Timed
	public ResponseEntity<InvoiceHeaderDTO> createInvoiceHeader(@RequestBody InvoiceHeaderDTO invoiceHeaderDTO)
			throws URISyntaxException {
		if (invoiceHeaderDTO.getId() != null) {
			throw new BadRequestAlertException("A new invoiceHeader cannot already have an ID", ENTITY_NAME,
					"idexists");
		}
		InvoiceHeaderDTO result = invoiceHeaderService.createNewInvoice(invoiceHeaderDTO);
		return ResponseEntity.created(new URI("/api/invoice-headers/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /invoice-headers : Updates an existing invoiceHeader.
	 *
	 * @param invoiceHeaderDTO the invoiceHeaderDTO to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated invoiceHeaderDTO,
	 * or with status 400 (Bad Request) if the invoiceHeaderDTO is not valid,
	 * or with status 500 (Internal Server Error) if the invoiceHeaderDTO couldn't be updated
	 */
	@PutMapping("/invoice-headers")
	@Timed
	public ResponseEntity<InvoiceHeaderDTO> updateInvoiceHeader(@RequestBody InvoiceHeaderDTO invoiceHeaderDTO) {
		if (invoiceHeaderDTO.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		InvoiceHeaderDTO result = invoiceHeaderService.save(invoiceHeaderDTO);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, invoiceHeaderDTO.getId().toString()))
				.body(result);
	}

	/**
	 * GET /invoice-headers : get all the invoiceHeaders.
	 *
	 * @param pageable the pagination information
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 * invoiceHeaders in body
	 */
	@GetMapping("/invoice-headers")
	@Timed
	public ResponseEntity<List<InvoiceHeaderDTO>> getAllInvoiceHeaders(Pageable pageable) {
		log.debug("REST request to get a page of InvoiceHeaders");
		Page<InvoiceHeaderDTO> page = invoiceHeaderService.findAll(pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-headers");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	/**
	 * GET /invoice-headers/:id : get the "id" invoiceHeader.
	 *
	 * @param id the id of the invoiceHeaderDTO to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the
	 * invoiceHeaderDTO, or with status 404 (Not Found)
	 */
	@GetMapping("/invoice-headers/{id}")
	@Timed
	public ResponseEntity<InvoiceHeaderDTO> getInvoiceHeader(@PathVariable Long id) {
		log.debug("REST request to get InvoiceHeader : {}", id);
		Optional<InvoiceHeaderDTO> invoiceHeaderDTO = invoiceHeaderService.findOne(id);
		return ResponseUtil.wrapOrNotFound(invoiceHeaderDTO);
	}

	/**
	 * DELETE /invoice-headers/:id : delete the "id" invoiceHeader.
	 *
	 * @param id the id of the invoiceHeaderDTO to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/invoice-headers/{id}")
	@Timed
	public ResponseEntity<Void> deleteInvoiceHeader(@PathVariable Long id) {
		log.debug("REST request to delete InvoiceHeader : {}", id);
		invoiceHeaderService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

	// AnhVD new code

	/**
	 * GET /invoice-headers/search : get all the invoiceHeaders by filter.
	 *
	 * @param pageable the pagination information
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 * invoiceHeaders in body
	 */
	@GetMapping("/invoice-headers/search")
	@Timed
	public ResponseEntity<List<InvoiceHeaderDTO>> getInvoiceHeadersByParams(@RequestParam("invoiceNo") String invoiceNo,
			@RequestParam("status") String status, @RequestParam("receiveDate") String receiveDate,
			@RequestParam("createDate") String createDate, @RequestParam("updateDate") String updateDate,
			Pageable pageable) {
		Page<InvoiceHeaderDTO> page = invoiceHeaderService.getInvoiceHeadersByParams(invoiceNo, status, receiveDate,
				createDate, updateDate, pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-headers/search");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	@GetMapping("/invoice-headers/by-shipper")
	@Timed
	public ResponseEntity<List<InvoiceShipmentDTO>> getInvoiceHeadersByShipper(@RequestParam("id") Long id,
			@RequestParam("invNo") String invNo, @RequestParam("type") String type, Pageable pageable) {
		Page<InvoiceShipmentDTO> page = invoiceHeaderService.getInvoiceHeadersByShipper(id, invNo, type, pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-headers/by-shipper");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	@GetMapping("/invoice-headers/request-cancel")
	@Timed
	public ResponseEntity<List<InvoiceHeaderDTO>> getInvoiceHeadersRequestCancel(Pageable pageable) {
		Page<InvoiceHeaderDTO> page = invoiceHeaderService.getInvoiceHeadersRequestCancel(pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-headers/request-cancel");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	@PostMapping("/invoice-headers/invoice-detail/{check}")
	@Timed
	public ResponseEntity<InvoiceHeaderDTO> createInvoiceHeaderDetailPackage(
			@RequestBody InvoicePackageDetailDTO invoiceHeaderDTO, @PathVariable int check) throws URISyntaxException {
		if (invoiceHeaderDTO.getInvoice().getId() != null) {
			throw new BadRequestAlertException("A new invoiceHeader cannot already have an ID", ENTITY_NAME,
					" exists");
		}
		InvoiceHeaderDTO result = invoiceHeaderService.createInvoiceHeaderDetailPackage(invoiceHeaderDTO, check);
		return ResponseEntity.created(new URI("/api/invoice-headers/invoice-detail/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	@PutMapping("/invoice-headers/invoice-detail")
	@Timed
	public ResponseEntity<InvoiceHeaderDTO> saveInvoiceHeaderDetailPackage(
			@RequestBody InvoicePackageDetailDTO invoiceHeaderDTO) {
		if (invoiceHeaderDTO.getInvoice().getId() == null) {
			throw new BadRequestAlertException("A new invoiceHeader cannot already have an ID", ENTITY_NAME, "idnull");
		}
		InvoiceHeaderDTO result = invoiceHeaderService.saveInvoiceHeaderDetailPackage(invoiceHeaderDTO);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	@PutMapping("/invoice-headers/approve-invoices")
	@Timed
	public ResponseEntity<List<InvoiceHeaderDTO>> saveInvoiceHeadersApproved(
			@RequestBody List<InvoiceHeaderDTO> invoiceHeadersDTO) {
		List<InvoiceHeaderDTO> result = invoiceHeaderService.saveInvoiceHeadersApproved(invoiceHeadersDTO);
		String rs = "";
		for (InvoiceHeaderDTO i : result)
			rs += i.getId() + ",";
		rs = rs.substring(0, rs.length() - 1);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rs)).body(result);
	}

	@GetMapping("/invoice-headers/by-customer")
	@Timed
	public ResponseEntity<List<InvoiceHeaderDTO>> getInvoiceHeadersByCustomer(@RequestParam("id") Long id,
			Pageable pageable) {
		Page<InvoiceHeaderDTO> page = invoiceHeaderService.getInvoiceHeadersByCustomer(id, pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-headers/by-customer");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	@PutMapping("/invoice-headers/import-invoices")
	@Timed
	public ResponseEntity<List<InvoiceHeaderDTO>> saveListImportInvoiceHeader(
			@RequestBody List<InvoiceHeaderDTO> list) {
		List<InvoiceHeaderDTO> result = invoiceHeaderService.saveListImportInvoiceHeader(list);
		String rs = "";
		for (InvoiceHeaderDTO i : result)
			rs += i.getId() + ",";
		rs = rs.substring(0, rs.length() - 1);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rs)).body(result);
	}

	@PutMapping("/invoice-headers/finish")
	@Timed
	public ResponseEntity<InvoiceHeaderDTO> updateFinishInvoicePersonalShipment(@RequestBody InvoiceHeaderDTO invoice) {
		InvoiceHeaderDTO result = invoiceHeaderService.updateFinishInvoicePersonalShipment(invoice);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	@GetMapping("/invoice-headers/get-waiting")
	@Timed
	public ResponseEntity<List<InvoiceHeaderDTO>> getInvoiceHeadersWaitingReview(
			@RequestParam("id") Long id, @RequestParam("invoiceNo") String invoiceNo,
			@RequestParam("receiveDate") String receiveDate, @RequestParam("createDate") String createDate,
			@RequestParam("updateDate") String updateDate, Pageable pageable) {
		Page<InvoiceHeaderDTO> page = invoiceHeaderService.getInvoiceHeadersWaitingReview(id, invoiceNo,
				receiveDate, createDate, updateDate, pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-headers/get-waiting");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	@PutMapping("/invoice-headers/approve-review")
	@Timed
	public ResponseEntity<InvoiceHeaderDTO> updateInvoiceHeadersApproveReview(@RequestBody InvoiceHeaderDTO invoice) {
		if (invoice.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		InvoiceHeaderDTO result = invoiceHeaderService.updateInvoiceHeadersReview(invoice);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	@PutMapping("/invoice-headers/reject-review")
	@Timed
	public ResponseEntity<InvoiceHeaderDTO> updateInvoiceHeadersRejectReview(@RequestBody InvoiceHeaderDTO invoice) {
		if (invoice.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		InvoiceHeaderDTO result = invoiceHeaderService.updateInvoiceHeadersReview(invoice);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	@GetMapping("/invoice-headers/by-payment")
	@Timed
	public ResponseEntity<List<InvoicePackageDetailDTO>> getFullInvoiceByPayment(@RequestParam("id") Long id,
			@RequestParam("invoiceNo") String invoiceNo, @RequestParam("status") String status,
			@RequestParam("receiveFrom") String receiveFrom, @RequestParam("receiveTo") String receiveTo,
			@RequestParam("createFrom") String createFrom, @RequestParam("createTo") String createTo,
			Pageable pageable) {
		Page<InvoicePackageDetailDTO> page = invoiceHeaderService.getFullInvoiceByPayment(id, invoiceNo, status,
				receiveFrom, receiveTo, createFrom, createTo, pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-headers/by-payment");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	// v2
	@GetMapping("/invoice-headers/import/by-officer")
	@Timed
	public ResponseEntity<List<InvoicePackageShipmentDTO>> getImportInvoiceByOfficer(
			@RequestParam("id") Long id, @RequestParam("oid") Long oid, @RequestParam("invNo") String invNo,
			@RequestParam("from") String from, @RequestParam("to") String to, Pageable pageable) {
		Page<InvoicePackageShipmentDTO> page = invoiceHeaderService.getImportInvoiceByOfficer(id, oid, invNo, from, to, pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-headers/import/by-officer");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	@GetMapping("/invoice-headers/warehouse")
	@Timed
	public ResponseEntity<List<InvoicePackageShipmentDTO>> getInvoiceByWarehouse(
			@RequestParam("id") Long id, @RequestParam("invNo") String invNo, Pageable pageable) {
		Page<InvoicePackageShipmentDTO> page = invoiceHeaderService.getInvoiceByWarehouse(id, invNo, pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/invoice-headers/warehouse");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	@PutMapping("/invoice-headers/approve-cancel")
	@Timed
	public ResponseEntity<InvoiceHeaderDTO> approveCancelInvoiceHeaders(@RequestBody Long id) {
		InvoiceHeaderDTO data = invoiceHeaderService.approveCancelInvoiceHeaders(id);
		return ResponseEntity.ok(data);
	}
}
