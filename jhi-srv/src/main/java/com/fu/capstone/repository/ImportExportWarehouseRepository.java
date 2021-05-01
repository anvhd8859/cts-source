package com.fu.capstone.repository;

import com.fu.capstone.domain.ImportExportWarehouse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Spring Data repository for the ImportExportWarehouse entity.
 */
@Repository
public interface ImportExportWarehouseRepository extends JpaRepository<ImportExportWarehouse, Long> {

	@Query(value = "SELECT i FROM ImportExportWarehouse i "
				 + " WHERE i.officeId = :oid "
				 + " AND (:eid IS NULL OR :eid = i.employeeId) "
				 + " AND (:cf IS NULL OR :cf = i.keeperConfirm) "
				 + " AND (:type = '' OR :type = i.type) ")
	Page<ImportExportWarehouse> getImportExportWarehouseByFilter(@RequestParam("eid") Long eid,
			@RequestParam("oid") Long oid, @RequestParam("type") String type, @RequestParam("cf") Boolean cf, Pageable pageable);

}
