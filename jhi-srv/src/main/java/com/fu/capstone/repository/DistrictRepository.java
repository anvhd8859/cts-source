package com.fu.capstone.repository;

import com.fu.capstone.domain.District;
import com.fu.capstone.service.dto.DistrictDTO;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the District entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DistrictRepository extends JpaRepository<District, Long> {

	@Query(value="SELECT d FROM District d WHERE d.provinceId.id = :provinceId")
	List<District> getDistrictByProvinceId(@Param("provinceId")Long id);

}
