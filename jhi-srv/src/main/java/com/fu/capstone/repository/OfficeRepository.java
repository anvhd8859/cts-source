package com.fu.capstone.repository;

import com.fu.capstone.domain.Office;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Office entity.
 */
@Repository
public interface OfficeRepository extends JpaRepository<Office, Long> {

	@Query( value =   " SELECT DISTINCT o.* FROM office o, street s, district d, sub_district sd "
					+ " WHERE o.street_id = s.id AND d.id = sd.district_id_id AND sd.id = s.sub_district_id_id AND d.id = "
					+ " ( SELECT d.id FROM district d, sub_district sd ,street s "
					+ " WHERE d.id = sd.district_id_id AND sd.id = s.sub_district_id_id AND s.id = :id LIMIT 1)",
					nativeQuery = true)
	Office getOfficeByStreetId(@Param("id")Long id);
	
	@Query( value = " SELECT o.* FROM office o, street s, district d, sub_district sd, province p "
				  + " WHERE o.street_id = s.id AND s.sub_district_id_id = sd.id "
				  + " AND sd.district_id_id = d.id AND d.province_id_id = p.id "
				  + " AND ( s.id = :streetId OR sd.id = :subDistrictId OR d.id = :districtId) LIMIT 1",
			nativeQuery = true)
	Office searchOfficeNearby(@Param("streetId") Long streetId, @Param("subDistrictId") Long subDistrictId,
			@Param("districtId") Long districtId);

}
