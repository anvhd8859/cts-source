package com.fu.capstone.service.dto;

import java.util.List;

public class IERequestDetailDTO{

	private ImportExportRequestDTO importExportWarehouse;

	private List<RequestDetailInvoiceDTO> requestDetailsList;

	public ImportExportRequestDTO getImportExportWarehouse() {
		return importExportWarehouse;
	}

	public void setImportExportWarehouse(ImportExportRequestDTO importExportWarehouse) {
		this.importExportWarehouse = importExportWarehouse;
	}

	public List<RequestDetailInvoiceDTO> getRequestDetailsList() {
		return requestDetailsList;
	}

	public void setRequestDetailsList(List<RequestDetailInvoiceDTO> requestDetailsList) {
		this.requestDetailsList = requestDetailsList;
	}
}
