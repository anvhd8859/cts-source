package com.fu.capstone.repository;

import com.fu.capstone.domain.TransferPacking;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransferPacking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransferPackingRepository extends JpaRepository<TransferPacking, Long> {

}
