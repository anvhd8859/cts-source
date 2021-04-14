package com.fu.capstone.repository;

import com.fu.capstone.domain.TransferVehicle;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransferVehicle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransferVehicleRepository extends JpaRepository<TransferVehicle, Long> {

}
