package com.fu.capstone.repository;

import com.fu.capstone.domain.RequestDetails;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RequestDetails entity.
 */
@Repository
public interface RequestDetailsRepository extends JpaRepository<RequestDetails, Long> {

	@Query(value = "SELECT r FROM RequestDetails r WHERE r.requestId = :id")
	List<RequestDetails> getRequestDetailsByHeaderId(@Param("id") Long id);

}
