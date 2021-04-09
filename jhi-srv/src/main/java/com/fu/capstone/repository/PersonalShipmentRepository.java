package com.fu.capstone.repository;

import com.fu.capstone.domain.PersonalShipment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PersonalShipment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonalShipmentRepository extends JpaRepository<PersonalShipment, Long> {

}
