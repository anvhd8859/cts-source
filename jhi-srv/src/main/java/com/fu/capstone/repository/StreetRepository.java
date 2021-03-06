package com.fu.capstone.repository;

import com.fu.capstone.domain.Street;
import com.fu.capstone.service.dto.StreetDTO;

import java.util.List;
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

	@Query( name = "get-street-by",
			nativeQuery = true)
	List<Street> getAllStreetsBySubDistrictId(@Param("id") Long id);

	@Query( value = "SELECT s FROM Street s WHERE s.id = :id")
	Street getFullAddressByStreetId(@Param("id") Long id);

	@Query( value = "SELECT s FROM Street s, Office o WHERE s.id = o.streetId AND o.id = :id")
	Street getAddressByOfficeId(@Param("id") Long id);

	@Query( name = "get-street-by-param" ,nativeQuery = true)
	List<Street> getAllStreetByParam(@Param("prvId") Long prvId, @Param("dstId") Long dstId,
			@Param("sdtId") Long sdtId, @Param("strId") Long strId);

	@Query( value = "SELECT s FROM Street s WHERE s.id IN (:ids)")
    List<Street> getAllByIdList(@Param("ids") List<Long> ids);
}
