package com.fu.capstone.service;

import com.fu.capstone.service.dto.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing InvoiceHeader.
 */
public interface InvoiceHeaderService {

	/**
	 * Save a invoiceHeader.
	 *
	 * @param invoiceHeaderDTO
	 *            the entity to save
	 * @return the persisted entity
	 */
	InvoiceHeaderDTO save(InvoiceHeaderDTO invoiceHeaderDTO);

	/**
	 * Get all the invoiceHeaders.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the list of entities
	 */
	Page<InvoiceHeaderDTO> findAll(Pageable pageable);

	/**
	 * Get the "id" invoiceHeader.
	 *
	 * @param id
	 *            the id of the entity
	 * @return the entity
	 */
	Optional<InvoiceHeaderDTO> findOne(Long id);

	/**
	 * Delete the "id" invoiceHeader.
	 *
	 * @param id
	 *            the id of the entity
	 */
	void delete(Long id);

	// new code
	Page<InvoiceHeaderDTO> getInvoiceHeadersByParams(String invoiceNo, String status, String receiveDate,
			String createDate, String updateDate, Pageable pageable);

	InvoiceHeaderDTO createNewInvoice(InvoiceHeaderDTO invoiceHeaderDTO);

	Page<InvoiceShipmentDTO> getInvoiceHeadersByShipper(Long id, String invNo, String type, Pageable pageable);

	Page<InvoiceHeaderDTO> getInvoiceHeadersRequestCancel(Pageable pageable);

	InvoiceHeaderDTO createInvoiceHeaderDetailPackage(InvoicePackageDetailDTO invoicePackageDetailDTO, int check);

	List<InvoiceHeaderDTO> saveInvoiceHeadersApproved(List<InvoiceHeaderDTO> invoiceHeadersDTO);

	Page<InvoiceHeaderDTO> getInvoiceHeadersByCustomer(Long id, Pageable pageable);

	List<InvoiceHeaderDTO> saveListImportInvoiceHeader(List<InvoiceHeaderDTO> list);

	InvoiceHeaderDTO updateFinishInvoicePersonalShipment(InvoiceHeaderDTO invoice);

	Page<InvoiceHeaderDTO> getInvoiceHeadersWaitingReview(Long id, String invoiceNo, String receiveDate,
			String createDate, String updateDate, Pageable pageable);

	InvoiceHeaderDTO updateInvoiceHeadersReview(InvoiceHeaderDTO invoice);

	Page<InvoicePackageDetailDTO> getFullInvoiceByPayment(Long id, String invoiceNo, String status, String receiveFrom,
			String receiveTo, String createFrom, String createTo, Pageable pageable);

	Page<InvoicePackageShipmentDTO> getImportInvoiceByOfficer(Long id, Long oid, String invNo, String from, String to, Pageable pageable);

	Page<InvoicePackageShipmentDTO> getInvoiceByWarehouse(Long id, String invNo, Pageable pageable);

	InvoiceHeaderDTO approveCancelInvoiceHeaders(Long id);
}
