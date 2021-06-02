package com.fu.capstone.repository;

import com.fu.capstone.domain.Province;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Province entity.
 */
@Repository
public interface ProvinceRepository extends JpaRepository<Province, Long> {

	@Query(name = "get-all-province", nativeQuery = true)
	Page<Province> getAll(Pageable pageable);

}
