package com.fu.capstone.repository;

import com.fu.capstone.domain.SubDistrict;
import com.fu.capstone.service.dto.SubDistrictDTO;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SubDistrict entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubDistrictRepository extends JpaRepository<SubDistrict, Long> {
	
	@Query(name = "get-all-sub_district", nativeQuery = true)
	Page<SubDistrict> getAll(Pageable pageable);

	@Query(name = "get-sub_district-by", nativeQuery = true)
	List<SubDistrict> getAllSubDistrictsByDistrictId(@Param("id")Long id);

}
