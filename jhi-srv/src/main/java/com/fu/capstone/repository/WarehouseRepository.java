package com.fu.capstone.repository;

import com.fu.capstone.domain.Warehouse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Warehouse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
	@Query(name = "get-warehouse-by")
	List<Warehouse> getWarehouseyProvinceId(@Param("id") Long id);
	
	@Query(name = "get-all-warehouse")
	Page<Warehouse> getAll(Pageable pageable);

	@Query(value="SELECT d.* FROM warehouse d, sub_warehouse sd ,street s "
			+ " WHERE d.id = sd.warehouse_id_id AND sd.id = s.sub_warehouse_id_id AND s.id = :id",
			nativeQuery = true)
	Warehouse getWarehouseByStreetId(@Param("id") Long id);
}
 