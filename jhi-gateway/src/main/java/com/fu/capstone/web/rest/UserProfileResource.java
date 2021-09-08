package com.fu.capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fu.capstone.domain.UserProfile;
import com.fu.capstone.repository.UserProfileRepository;
import com.fu.capstone.web.rest.errors.BadRequestAlertException;
import com.fu.capstone.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserProfile.
 */
@RestController
@RequestMapping("/api")
public class UserProfileResource {

    private final Logger log = LoggerFactory.getLogger(UserProfileResource.class);

    private static final String ENTITY_NAME = "userProfile";

    private UserProfileRepository userProfileRepository;

    public UserProfileResource(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    /**
     * POST  /user-profiles : Create a new userProfile.
     *
     * @param userProfile the userProfile to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userProfile, or with status 400 (Bad Request) if the userProfile has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-profiles")
    @Timed
    public ResponseEntity<UserProfile> createUserProfile(@RequestBody UserProfile userProfile) throws URISyntaxException {
        log.debug("REST request to save UserProfile : {}", userProfile);
        if (userProfile.getId() != null) {
            throw new BadRequestAlertException("A new userProfile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserProfile result = userProfileRepository.save(userProfile);
        return ResponseEntity.created(new URI("/api/user-profiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-profiles : Updates an existing userProfile.
     *
     * @param userProfile the userProfile to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userProfile,
     * or with status 400 (Bad Request) if the userProfile is not valid,
     * or with status 500 (Internal Server Error) if the userProfile couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-profiles")
    @Timed
    public ResponseEntity<UserProfile> updateUserProfile(@RequestBody UserProfile userProfile) throws URISyntaxException {
        log.debug("REST request to update UserProfile : {}", userProfile);
        if (userProfile.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserProfile result = userProfileRepository.save(userProfile);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userProfile.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-profiles : get all the userProfiles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userProfiles in body
     */
    @GetMapping("/user-profiles")
    @Timed
    public List<UserProfile> getAllUserProfiles() {
        log.debug("REST request to get all UserProfiles");
        return userProfileRepository.findAll();
    }

    /**
     * GET  /user-profiles/:id : get the "id" userProfile.
     *
     * @param id the id of the userProfile to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userProfile, or with status 404 (Not Found)
     */
    @GetMapping("/user-profiles/{id}")
    @Timed
    public ResponseEntity<UserProfile> getUserProfile(@PathVariable Long id) {
        log.debug("REST request to get UserProfile : {}", id);
        Optional<UserProfile> userProfile = userProfileRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userProfile);
    }

    /**
     * DELETE  /user-profiles/:id : delete the "id" userProfile.
     *
     * @param id the id of the userProfile to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-profiles/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserProfile(@PathVariable Long id) {
        log.debug("REST request to delete UserProfile : {}", id);

        userProfileRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    // HaiNM
    @GetMapping("/user-profiles/find-by-user-id")
    @Timed
    public ResponseEntity<UserProfile> getUserProfileByUserID(@RequestParam("id") Long id) {
        log.debug("REST request to get UserProfile : {}", id);
        Optional<UserProfile> userProfile = userProfileRepository.findByUserId(id);
        return ResponseEntity.ok(userProfile.isPresent() ? userProfile.get() : new UserProfile());
    }
    // HaiNM

    @GetMapping("/user-profiles/find-by-office-id")
    @Timed
    public ResponseEntity<List<UserProfile>> getKeeperByOfficeID(@RequestParam("id") Long id) {
        log.debug("REST request to get UserProfile : {}", id);
        List<UserProfile> userProfile = userProfileRepository.getKeeperByOfficeID(id);
        return new ResponseEntity<>(userProfile, HttpStatus.OK);
    }

    @GetMapping("/user-profiles/by-role")
    @Timed
    public ResponseEntity<List<UserProfile>> getemployeeByRole(@RequestParam("role") String role) {
        log.debug("REST request to get UserProfile : {}", role);
        List<UserProfile> userProfile = userProfileRepository.getEmployeeByRole(role);
        return new ResponseEntity<>(userProfile, HttpStatus.OK);
    }
}
