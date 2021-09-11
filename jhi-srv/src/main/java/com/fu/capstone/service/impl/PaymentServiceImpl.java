package com.fu.capstone.service.impl;

import com.fu.capstone.service.PaymentService;
import com.fu.capstone.domain.InvoiceHeader;
import com.fu.capstone.domain.Payment;
import com.fu.capstone.repository.InvoiceHeaderRepository;
import com.fu.capstone.repository.PaymentRepository;
import com.fu.capstone.service.dto.InvoiceHeaderDTO;
import com.fu.capstone.service.dto.PaymentDTO;
import com.fu.capstone.service.dto.PaymentInvoiceDTO;
import com.fu.capstone.service.mapper.PaymentMapper;
import com.fu.capstone.service.mapper.InvoiceHeaderMapper;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
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
	public List<PaymentDTO> findPaymentListByHeaderId(Long id, Pageable pageable) {
		return paymentMapper.toDto(paymentRepository.findPaymentListByHeaderId(id, pageable));
	}
	// END TuyenVNT 16/04/2021

	@Override
	public Page<PaymentInvoiceDTO> getPaymentInvoiceByParams(Long id, String invoiceNo, String type, String receiveFrom,
                                                             String receiveTo, String createFrom, String createTo, Pageable pageable) {
		Boolean tp = null;
		if(type.equals("1")) tp = true;
		if(type.equals("0")) tp = false;
		Page<Payment> page = paymentRepository.getPaymentInvoiceByParams(id, invoiceNo, tp, receiveFrom, receiveTo,
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

	@Override
	public ByteArrayInputStream createPaymentReport(List<PaymentInvoiceDTO> body) throws IOException {
		String[] HEADERS = { "Payment Id", "Invoice Id", "Invoice No", "Payer", "Total Due", "Total Paid", "Amount Due",
				"Paid Date", "Invoice Create Date" };
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet("Payment report");

		XSSFRow headerRow = sheet.createRow(0);
		for (int col = 0; col < HEADERS.length; col++) {
			XSSFCell cell = headerRow.createCell(col);
			cell.setCellValue(HEADERS[col]);
		}
		int rowIdx = 1;
		for (PaymentInvoiceDTO dto : body) {
			XSSFRow row = sheet.createRow(rowIdx++);
			InvoiceHeaderDTO i = dto.getInvoice();
			PaymentDTO p = dto.getPayment();

			row.createCell(0).setCellValue(p.getId());
	        row.createCell(1).setCellValue(i.getId());
	        row.createCell(2).setCellValue(i.getInvoiceNo());
	        if(i.getReceiverPay() == null) row.createCell(3).setCellValue("Missing");
	        else row.createCell(3).setCellValue(i.getReceiverPay() ? "Receiver paid" : "Sender paid");
	        row.createCell(4).setCellValue(i.getTotalDue().intValue());
	        row.createCell(5).setCellValue(p.getAmountPaid().intValue());
	        row.createCell(6).setCellValue(p.getAmountDue().intValue());
	        row.createCell(7).setCellValue(p.getCreateDate().toString());
	        row.createCell(8).setCellValue(i.getCreateDate().toString());
		}
		ByteArrayOutputStream os = new ByteArrayOutputStream();
		workbook.write(os);
		os.close();
		workbook.close();
		return new ByteArrayInputStream(os.toByteArray());
	}

	@Override
	public PaymentDTO findPaymentByHeaderId(Long id) {
		return paymentMapper.toDto(paymentRepository.findPaymentByHeaderId(id));
	}

    @Override
    public List<PaymentInvoiceDTO> findPaymentByShipperId(Long id) {
	    String time = Instant.now().toString();
	    time = time.substring(0, time.indexOf("T"));
	    List<Payment> payments = paymentRepository.findAllByEmployeeId(id, time);
	    if (payments == null || payments.isEmpty()) return new ArrayList<>();
	    List<Long> headers = new ArrayList<>();
	    payments.forEach(p -> {
            headers.add(p.getInvoiceHeaderId());
        });
        List<InvoiceHeader> invoices = invoiceHeaderRepository.findAllById(headers);
        List<PaymentInvoiceDTO> results = new ArrayList<>();
        payments.parallelStream().forEach(p -> {
            PaymentInvoiceDTO dto = new PaymentInvoiceDTO();
            for (InvoiceHeader i : invoices) {
                if (i.getId().longValue() == p.getInvoiceHeaderId().longValue()) {
                    dto.setInvoice(invoiceHeaderMapper.toDto(i));
                    break;
                }
            }
            dto.setPayment(paymentMapper.toDto(p));
            results.add(dto);
        });
        return results;
    }

    @Override
    public List<PaymentDTO> approveAllPaymentsByOfficer(List<PaymentDTO> body) {
        return paymentMapper.toDto(paymentRepository.saveAll(paymentMapper.toEntity(body)));
    }
}
