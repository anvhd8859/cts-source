package com.fu.capstone.repository;

import com.fu.capstone.domain.Street;
import com.fu.capstone.service.dto.StreetDTO;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the Street entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StreetRepository extends JpaRepository<Street, Long> {

	@Query( value = "SELECT * FROM street WHERE sub_district_id_id = :subDistrictId",
			countQuery = "SELECT count(*) FROM street WHERE sub_district_id_id = :subDistrictId", 
			nativeQuery = true)
	Page<Street> getAllStreetsBySubDistrictId(@Param("subDistrictId") Long id,Pageable pageable);

	@Query( value = "SELECT s FROM Street s WHERE s.id = :id")
	Street getFullAddressByStreetId(@Param("id") Long id);

}
