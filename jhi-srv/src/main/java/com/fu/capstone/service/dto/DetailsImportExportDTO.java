package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

public class DetailsImportExportDTO implements Serializable {
	
	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private ImportExportWarehouseDTO requestHeader;
	
	private List<RequestDetailsDTO> requestDetailsList;

	public ImportExportWarehouseDTO getRequestHeader() {
		return requestHeader;
	}

	public void setRequestHeader(ImportExportWarehouseDTO requestHeader) {
		this.requestHeader = requestHeader;
	}

	public List<RequestDetailsDTO> getRequestDetailsList() {
		return requestDetailsList;
	}

	public void setRequestDetailsList(List<RequestDetailsDTO> requestDetailsList) {
		this.requestDetailsList = requestDetailsList;
	}
	
}
