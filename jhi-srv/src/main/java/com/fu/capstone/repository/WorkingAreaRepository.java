package com.fu.capstone.repository;

import com.fu.capstone.domain.WorkingArea;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the WorkingArea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkingAreaRepository extends JpaRepository<WorkingArea, Long> {

}
