package com.fu.capstone.repository;

import com.fu.capstone.domain.EmployeeShift;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EmployeeShift entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeShiftRepository extends JpaRepository<EmployeeShift, Long> {

}
