package com.fu.capstone.repository;

import com.fu.capstone.domain.Warehouse;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the Warehouse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {

	@Query(value = "SELECT w FROM Warehouse w WHERE w.officeId = :id")
	Warehouse getWarehouseByOfficeId(@Param("id") Long id);

	@Query(value = "SELECT w FROM Warehouse w WHERE w.keeperId = :id")
	Warehouse getWarehouseByKeeperId(@Param("id") Long fromKeeperId);

	Warehouse findDistinctByOfficeId(Long officeId);

	Warehouse findDistinctByKeeperId(Long keeperId);
}
