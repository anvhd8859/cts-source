package com.fu.capstone.service.impl;

import com.fu.capstone.service.PaymentService;
import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.domain.Payment;
import com.fu.capstone.repository.InvoiceHeaderRepository;
import com.fu.capstone.repository.PaymentRepository;
import com.fu.capstone.service.dto.PaymentDTO;
import com.fu.capstone.service.dto.PaymentInvoiceDTO;
import com.fu.capstone.service.mapper.PaymentMapper;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Payment.
 */
@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

	private final Logger log = LoggerFactory.getLogger(PaymentServiceImpl.class);

	private PaymentRepository paymentRepository;

	private PaymentMapper paymentMapper;

	private InvoiceHeaderRepository invoiceHeaderRepository;

	private InvoiceHeaderMapper invoiceHeaderMapper;

	public PaymentServiceImpl(PaymentRepository paymentRepository, PaymentMapper paymentMapper,
			InvoiceHeaderRepository invoiceHeaderRepository, InvoiceHeaderMapper invoiceHeaderMapper) {
		this.paymentRepository = paymentRepository;
		this.paymentMapper = paymentMapper;
		this.invoiceHeaderRepository = invoiceHeaderRepository;
		this.invoiceHeaderMapper = invoiceHeaderMapper;
	}

	/**
	 * Save a payment.
	 *
	 * @param paymentDTO
	 *            the entity to save
	 * @return the persisted entity
	 */
	@Override
	public PaymentDTO save(PaymentDTO paymentDTO) {
		log.debug("Request to save Payment : {}", paymentDTO);

		Payment payment = paymentMapper.toEntity(paymentDTO);
		payment = paymentRepository.save(payment);
		return paymentMapper.toDto(payment);
	}

	/**
	 * Get all the payments.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the list of entities
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<PaymentDTO> findAll(Pageable pageable) {
		log.debug("Request to get all Payments");
		return paymentRepository.findAll(pageable).map(paymentMapper::toDto);
	}

	/**
	 * Get one payment by id.
	 *
	 * @param id
	 *            the id of the entity
	 * @return the entity
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<PaymentDTO> findOne(Long id) {
		log.debug("Request to get Payment : {}", id);
		return paymentRepository.findById(id).map(paymentMapper::toDto);
	}

	/**
	 * Delete the payment by id.
	 *
	 * @param id
	 *            the id of the entity
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request to delete Payment : {}", id);
		paymentRepository.deleteById(id);
	}

	// START TuyenVNT 14/04/2021
	@Override
	public List<PaymentDTO> getPaymentByHeaderId(Long id, Pageable pageable) {
		return paymentMapper.toDto(paymentRepository.getPaymentByHeaderId(id, pageable));
	}
	// END TuyenVNT 16/04/2021

	@Override
	public Page<PaymentInvoiceDTO> getPaymentInvoceByParams(String invoiceNo, String type, String receiveFrom,
			String receiveTo, String createFrom, String createTo, Pageable pageable) {
		Page<Payment> page = paymentRepository.getPaymentInvoceByParams(invoiceNo, type, receiveFrom, receiveTo,
				createFrom, createTo, pageable);
		return page.map(this::convert);
	}

	private PaymentInvoiceDTO convert(Payment entity) {
		PaymentInvoiceDTO pmDto = new PaymentInvoiceDTO();
		pmDto.setPayment(paymentMapper.toDto(entity));
		InvoiceHeader inv = invoiceHeaderRepository.getOne(entity.getInvoiceHeaderId());
		pmDto.setInvoice(invoiceHeaderMapper.toDto(inv));
		return pmDto;
	}
}
