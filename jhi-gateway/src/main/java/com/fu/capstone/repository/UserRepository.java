package com.fu.capstone.repository;

import com.fu.capstone.domain.User;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.Instant;

/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    String USERS_BY_LOGIN_CACHE = "usersByLogin";

    String USERS_BY_EMAIL_CACHE = "usersByEmail";

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndCreatedDateBefore(Instant dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmailIgnoreCase(String email);

    Optional<User> findOneByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesById(Long id);

    @EntityGraph(attributePaths = "authorities")
    @Cacheable(cacheNames = USERS_BY_LOGIN_CACHE)
    Optional<User> findOneWithAuthoritiesByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    @Cacheable(cacheNames = USERS_BY_EMAIL_CACHE)
    Optional<User> findOneWithAuthoritiesByEmail(String email);

    Page<User> findAllByLoginNot(Pageable pageable, String login);

    @Query(value = "SELECT DISTINCT u FROM User u JOIN u.authorities a "
    			 + " WHERE (:user = '' OR u.login like CONCAT('%', :user, '%')) "
    			 + " AND (:role = '' OR a.name = :role)")
	Page<User> getAllUsersByFilter(@Param("user") String user,@Param("role") String role, Pageable pageable);
    
    @Query(value = "SELECT u FROM User u, UserProfile p WHERE u.id = p.userId AND u.login like CONCAT('%', :user, '%')")
    Page<User> getAllShipperUserByFilter(@Param("user") String user, Pageable pageable);

    @Query(value = "SELECT u FROM User u WHERE u.id = :id")
	Optional<User> findUserById(@Param("id")Long id);

    @Query(value = "SELECT DISTINCT u FROM User u JOIN u.authorities a, UserProfile p "
    			 + " WHERE u.id = p.userId AND p.officeId = :id AND a.name = 'ROLE_KEEPER' ")
	List<User> getAllKeeperUserByOfficeID(@Param("id") Long id);
}
