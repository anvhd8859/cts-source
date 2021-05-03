package com.fu.capstone.service;

import com.fu.capstone.service.dto.PaymentDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
    List<PaymentDTO> getPaymentByHeaderId(Long id, Pageable pageable);
    // END TuyenVNT 16/04/2021
}
