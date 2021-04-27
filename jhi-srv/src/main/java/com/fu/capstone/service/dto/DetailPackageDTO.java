package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

public class DetailPackageDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<InvoicePackageDTO> invoicePackageList;

	private List<InvoiceDetailsDTO> invoiceDetailList;
	
	public List<InvoicePackageDTO> getInvoicePackageList() {
		return invoicePackageList;
	}

	public void setInvoicePackageList(List<InvoicePackageDTO> invoicePackageList) {
		this.invoicePackageList = invoicePackageList;
	}

	public List<InvoiceDetailsDTO> getInvoiceDetailList() {
		return invoiceDetailList;
	}

	public void setInvoiceDetailList(List<InvoiceDetailsDTO> invoiceDetailList) {
		this.invoiceDetailList = invoiceDetailList;
	}

}
