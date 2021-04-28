package com.fu.capstone.repository;

import com.fu.capstone.domain.WorkingArea;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the WorkingArea entity.
 */
@Repository
public interface WorkingAreaRepository extends JpaRepository<WorkingArea, Long> {

	@Query(value = "SELECT w.* FROM working_area w, street s, sub_district sd, district d, province p WHERE "
				 + " w.street_id = s.id AND s.sub_district_id_id = sd.id AND sd.district_id_id = d.id AND d.province_id_id = p.id "
				 + " AND (s.id = :sid OR sd.id = :sdid OR d.id = :did OR p.id = :pid) LIMIT 1",
		   nativeQuery = true)
	WorkingArea getEmployeeNearBy(@Param("sid") Long id, @Param("sdid") Long id2, @Param("did") Long id3, @Param("pid") Long id4);
	
	@Query(value = "SELECT w FROM WorkingArea w, Street s WHERE w.streetId = s.id "
				 + " AND (:sid IS NULL OR :sid = w.streetId) "
				 + " AND (:eid IS NULL OR :eid = w.employeeId)")
	Page<WorkingArea> getWorkingAreaByFilter(@Param("sid") Long sid, @Param("eid") Long eid, Pageable pageable);

}
