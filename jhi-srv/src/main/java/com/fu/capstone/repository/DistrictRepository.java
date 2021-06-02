package com.fu.capstone.repository;

import com.fu.capstone.domain.District;
import com.fu.capstone.service.dto.DistrictDTO;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the District entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DistrictRepository extends JpaRepository<District, Long> {

	@Query(name = "get-district-by")
	List<District> getDistrictByProvinceId(@Param("id") Long id);
	
	@Query(name = "get-all-district")
	Page<District> getAll(Pageable pageable);

	@Query(value="SELECT d.* FROM district d, sub_district sd ,street s "
			+ " WHERE d.id = sd.district_id_id AND sd.id = s.sub_district_id_id AND s.id = :id",
			nativeQuery = true)
	District getDistrictByStreetId(@Param("id") Long id);

}
