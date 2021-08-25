package com.fu.capstone.service;

import com.fu.capstone.domain.Price;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Price.
 */
public interface PriceService {

    /**
     * Save a price.
     *
     * @param price the entity to save
     * @return the persisted entity
     */
    Price save(Price price);

    /**
     * Get all the prices.
     *
     * @return the list of entities
     */
    List<Price> findAll();


    /**
     * Get the "id" price.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Price> findOne(Long id);

    /**
     * Delete the "id" price.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
