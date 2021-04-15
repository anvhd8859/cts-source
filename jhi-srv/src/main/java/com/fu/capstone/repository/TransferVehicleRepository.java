package com.fu.capstone.repository;

import com.fu.capstone.domain.TransferVehicle;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransferVehicle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransferVehicleRepository extends JpaRepository<TransferVehicle, Long> {

	@Query( value = "SELECT t FROM TransferVehicle t WHERE t.invoiceHeaderId = :invoiceHeaderId")
	List<TransferVehicle> getTransferVehiclesByInvoiceHeaderId(@Param("invoiceHeaderId") Long id);

}
