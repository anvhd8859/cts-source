package com.fu.capstone.repository;

import com.fu.capstone.domain.WarehouseTransferRequest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the WarehouseTransferRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WarehouseTransferRequestRepository extends JpaRepository<WarehouseTransferRequest, Long> {

}
