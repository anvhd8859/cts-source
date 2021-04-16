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
					+ " WHERE d.id = sd.district_id_id AND sd.id = s.sub_district_id_id AND s.id = 3 )")
	Office getOfficeByStreetId(@Param("id")Long id);

}
