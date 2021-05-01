package com.fu.capstone.repository;

import com.fu.capstone.domain.UserProfile;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserProfile entity.
 */
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

	@Query(value = "SELECT profile FROM UserProfile profile WHERE profile.userId = :id ")
	Optional<UserProfile> findByUserId(@Param("id")Long id);

	@Query(value = "SELECT p FROM UserProfile p WHERE p.officeId = :id ")
	List<UserProfile> getKeeperByOfficeID(@Param("id")Long id);

	@Query(value = "SELECT DISTINCT p FROM UserProfile p JOIN User u JOIN u.authorities a "
				 + " WHERE p.userId = u.id AND a.name = :role ")
	List<UserProfile> getemployeeByRole(@Param("role") String role);

}
