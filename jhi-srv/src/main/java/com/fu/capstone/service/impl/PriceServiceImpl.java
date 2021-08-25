package com.fu.capstone.service.impl;

import com.fu.capstone.service.PriceService;
import com.fu.capstone.domain.Price;
import com.fu.capstone.repository.PriceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Price.
 */
@Service
@Transactional
public class PriceServiceImpl implements PriceService {

    private final Logger log = LoggerFactory.getLogger(PriceServiceImpl.class);

    private PriceRepository priceRepository;

    public PriceServiceImpl(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    /**
     * Save a price.
     *
     * @param price the entity to save
     * @return the persisted entity
     */
    @Override
    public Price save(Price price) {
        log.debug("Request to save Price : {}", price);
        return priceRepository.save(price);
    }

    /**
     * Get all the prices.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Price> findAll() {
        log.debug("Request to get all Prices");
        return priceRepository.findAll();
    }


    /**
     * Get one price by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Price> findOne(Long id) {
        log.debug("Request to get Price : {}", id);
        return priceRepository.findById(id);
    }

    /**
     * Delete the price by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Price : {}", id);
        priceRepository.deleteById(id);
    }
}
