package com.fu.capstone.repository;

import com.fu.capstone.domain.UserProfile;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

	@Query(value = "SELECT profile FROM UserProfile profile WHERE profile.userId = :id ")
	Optional<UserProfile> findByUserId(@Param("id")Long id);

}
