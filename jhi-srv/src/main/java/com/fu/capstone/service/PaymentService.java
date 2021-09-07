package com.fu.capstone.service;

import com.fu.capstone.service.dto.PaymentDTO;
import com.fu.capstone.service.dto.PaymentInvoiceDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Payment.
 */
public interface PaymentService {

    /**
     * Save a payment.
     *
     * @param paymentDTO the entity to save
     * @return the persisted entity
     */
    PaymentDTO save(PaymentDTO paymentDTO);

    /**
     * Get all the payments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PaymentDTO> findAll(Pageable pageable);


    /**
     * Get the "id" payment.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PaymentDTO> findOne(Long id);

    /**
     * Delete the "id" payment.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Get the payment by headerId
     *
     * @param id the headerId
     */
    List<PaymentDTO> findPaymentListByHeaderId(Long id, Pageable pageable);

    Page<PaymentInvoiceDTO> getPaymentInvoiceByParams(Long id, String invoiceNo, String type, String receiveFrom,
        String receiveTo, String createFrom, String createTo, Pageable pageable);

    ByteArrayInputStream createPaymentReport(List<PaymentInvoiceDTO> body) throws IOException;

    PaymentDTO findPaymentByHeaderId(Long id);

    List<PaymentInvoiceDTO> findPaymentByShipperId(Long id);

    List<PaymentDTO> approveAllPaymentsByOfficer(List<PaymentDTO> body);
}
