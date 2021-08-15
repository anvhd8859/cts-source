package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

public class RequestDetailInvoiceDTO implements Serializable {

	private RequestDetailsDTO requestDetails;

	private InvoiceHeaderDTO invoiceHeader;

	private List<InvoicePackageDTO> packageList;

	public RequestDetailsDTO getRequestDetails() {
		return requestDetails;
	}

	public void setRequestDetails(RequestDetailsDTO requestDetails) {
		this.requestDetails = requestDetails;
	}

	public InvoiceHeaderDTO getInvoiceHeader() {
		return invoiceHeader;
	}

	public void setInvoiceHeader(InvoiceHeaderDTO invoiceHeader) {
		this.invoiceHeader = invoiceHeader;
	}

	public List<InvoicePackageDTO> getPackageList() {
		return packageList;
	}

	public void setPackageList(List<InvoicePackageDTO> packageList) {
		this.packageList = packageList;
	}
}
