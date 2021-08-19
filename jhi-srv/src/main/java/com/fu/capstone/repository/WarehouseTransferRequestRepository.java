package com.fu.capstone.repository;

import com.fu.capstone.domain.WarehouseTransferRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the WarehouseTransferRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WarehouseTransferRequestRepository extends JpaRepository<WarehouseTransferRequest, Long> {

	@Query(value = " SELECT wt FROM WarehouseTransferRequest wt, Warehouse w "
				 + " WHERE w.id = wt.toWarehouseId AND w.officeId = :id AND wt.status <>  ")
	Page<WarehouseTransferRequest> getWarehouseTransferByOffice(@Param("id") Long id, Pageable pageable);
}
