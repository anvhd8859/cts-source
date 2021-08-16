package com.fu.capstone.repository;

import com.fu.capstone.domain.RequestDetails;
import com.fu.capstone.domain.TransferDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the TransferDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransferDetailsRepository extends JpaRepository<TransferDetails, Long> {

	List<TransferDetails> findAllByTransferId(Long transferId);
}
