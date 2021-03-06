package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.service.PaymentService;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import com.fu.capstone.web.rest.util.PaginationUtil;
import com.fu.capstone.service.dto.PaymentDTO;
import com.fu.capstone.service.dto.PaymentInvoiceDTO;

import io.github.jhipster.web.util.ResponseUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Payment.
 */
@RestController
@RequestMapping("/api")
public class PaymentResource {

	private final Logger log = LoggerFactory.getLogger(PaymentResource.class);

	private static final String ENTITY_NAME = "ctsmicroservicePayment";

	private PaymentService paymentService;

	public PaymentResource(PaymentService paymentService) {
		this.paymentService = paymentService;
	}

	/**
	 * POST /payments : Create a new payment.
	 *
	 * @param paymentDTO
	 *            the paymentDTO to create
	 * @return the ResponseEntity with status 201 (Created) and with body the
	 *         new paymentDTO, or with status 400 (Bad Request) if the payment
	 *         has already an ID
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PostMapping("/payments")
	@Timed
	public ResponseEntity<PaymentDTO> createPayment(@RequestBody PaymentDTO paymentDTO) throws URISyntaxException {
		log.debug("REST request to save Payment : {}", paymentDTO);
		if (paymentDTO.getId() != null) {
			throw new BadRequestAlertException("A new payment cannot already have an ID", ENTITY_NAME, "idexists");
		}
		PaymentDTO result = paymentService.save(paymentDTO);
		return ResponseEntity.created(new URI("/api/payments/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /payments : Updates an existing payment.
	 *
	 * @param paymentDTO
	 *            the paymentDTO to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated
	 *         paymentDTO, or with status 400 (Bad Request) if the paymentDTO is
	 *         not valid, or with status 500 (Internal Server Error) if the
	 *         paymentDTO couldn't be updated
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PutMapping("/payments")
	@Timed
	public ResponseEntity<PaymentDTO> updatePayment(@RequestBody PaymentDTO paymentDTO) throws URISyntaxException {
		log.debug("REST request to update Payment : {}", paymentDTO);
		if (paymentDTO.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		PaymentDTO result = paymentService.save(paymentDTO);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, paymentDTO.getId().toString())).body(result);
	}

	/**
	 * GET /payments : get all the payments.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the ResponseEntity with status 200 (OK) and the list of payments
	 *         in body
	 */
	@GetMapping("/payments")
	@Timed
	public ResponseEntity<List<PaymentDTO>> getAllPayments(Pageable pageable) {
		log.debug("REST request to get a page of Payments");
		Page<PaymentDTO> page = paymentService.findAll(pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/payments");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	/**
	 * GET /payments/:id : get the "id" payment.
	 *
	 * @param id
	 *            the id of the paymentDTO to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the
	 *         paymentDTO, or with status 404 (Not Found)
	 */
	@GetMapping("/payments/{id}")
	@Timed
	public ResponseEntity<PaymentDTO> getPayment(@PathVariable Long id) {
		log.debug("REST request to get Payment : {}", id);
		Optional<PaymentDTO> paymentDTO = paymentService.findOne(id);
		return ResponseUtil.wrapOrNotFound(paymentDTO);
	}

	/**
	 * DELETE /payments/:id : delete the "id" payment.
	 *
	 * @param id
	 *            the id of the paymentDTO to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/payments/{id}")
	@Timed
	public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
		log.debug("REST request to delete Payment : {}", id);
		paymentService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

	/**
	 * GET /payment/by-invoice-header?:id : get the payment by header id.
	 *
	 * @param id
	 *            HeaderId
	 */
	@GetMapping("/payments/by-invoice-header")
	@Timed
	public ResponseEntity<List<PaymentDTO>> findPaymentListByHeaderId(@RequestParam("id") Long id, Pageable pageable) {
		List<PaymentDTO> page = paymentService.findPaymentListByHeaderId(id, pageable);
		return new ResponseEntity<>(page, HttpStatus.OK);
	}

	@GetMapping("/payments/by-params")
	@Timed
	public ResponseEntity<List<PaymentInvoiceDTO>> getPaymentInvoiceByParams(
			@RequestParam("eid") Long id, @RequestParam("invoiceNo") String invoiceNo,
			@RequestParam("type") String type, @RequestParam("receiveFrom") String receiveFrom,
			@RequestParam("receiveTo") String receiveTo, @RequestParam("createFrom") String createFrom,
			@RequestParam("createTo") String createTo, Pageable pageable) {
		Page<PaymentInvoiceDTO> page = paymentService.getPaymentInvoiceByParams(id, invoiceNo, type, receiveFrom, receiveTo,
				createFrom, createTo, pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/payments/by-params");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	@PostMapping("/payments/excel")
	@Timed
	public ResponseEntity<InputStreamResource> createPaymentReport(@RequestBody List<PaymentInvoiceDTO> body) throws IOException {
		ByteArrayInputStream res = paymentService.createPaymentReport(body);
		HttpHeaders header = new HttpHeaders();
		header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "report.xlsx");
		return ResponseEntity.ok().headers(header).body(new InputStreamResource(res));
	}

	@GetMapping("/payments/invoice")
	@Timed
	public ResponseEntity<PaymentDTO> findPaymentByHeaderId(@RequestParam("id") Long id) {
		PaymentDTO page = paymentService.findPaymentByHeaderId(id);
		return new ResponseEntity<>(page, HttpStatus.OK);
	}

    @GetMapping("/payments/shipper")
    @Timed
    public ResponseEntity<List<PaymentInvoiceDTO>> findPaymentByShipperId(@RequestParam("id") Long id) {
        List<PaymentInvoiceDTO> page = paymentService.findPaymentByShipperId(id);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @PutMapping("/payments/officer")
    @Timed
    public ResponseEntity<List<PaymentDTO>> approveAllPaymentsByOfficer(@RequestBody List<PaymentDTO> body) {
        List<PaymentDTO> page = paymentService.approveAllPaymentsByOfficer(body);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }
}
