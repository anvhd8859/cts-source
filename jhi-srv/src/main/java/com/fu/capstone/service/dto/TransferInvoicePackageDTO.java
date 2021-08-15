package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

public class TransferInvoicePackageDTO implements Serializable {

	private WarehouseTransferRequestDTO transferRequest;

	private List<InvoicePackageShipmentDTO> invoicePackageList;

	public WarehouseTransferRequestDTO getTransferRequest() {
		return transferRequest;
	}

	public void setTransferRequest(WarehouseTransferRequestDTO transferRequest) {
		this.transferRequest = transferRequest;
	}

	public List<InvoicePackageShipmentDTO> getInvoicePackageList() {
		return invoicePackageList;
	}

	public void setInvoicePackageList(List<InvoicePackageShipmentDTO> invoicePackageList) {
		this.invoicePackageList = invoicePackageList;
	}
}
