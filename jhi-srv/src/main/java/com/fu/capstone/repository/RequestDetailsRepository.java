package com.fu.capstone.repository;

import com.fu.capstone.domain.RequestDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RequestDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequestDetailsRepository extends JpaRepository<RequestDetails, Long> {

}
