package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

public class DetailsImportExportDTO implements Serializable {
	
	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private ImportExportRequestDTO requestHeader;
	
	private List<RequestDetailsDTO> requestDetailsList;

	public ImportExportRequestDTO getRequestHeader() {
		return requestHeader;
	}

	public void setRequestHeader(ImportExportRequestDTO requestHeader) {
		this.requestHeader = requestHeader;
	}

	public List<RequestDetailsDTO> getRequestDetailsList() {
		return requestDetailsList;
	}

	public void setRequestDetailsList(List<RequestDetailsDTO> requestDetailsList) {
		this.requestDetailsList = requestDetailsList;
	}
	
}
