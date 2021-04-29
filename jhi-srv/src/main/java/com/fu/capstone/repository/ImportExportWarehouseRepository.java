package com.fu.capstone.repository;

import com.fu.capstone.domain.ImportExportWarehouse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ImportExportWarehouse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImportExportWarehouseRepository extends JpaRepository<ImportExportWarehouse, Long> {

}
