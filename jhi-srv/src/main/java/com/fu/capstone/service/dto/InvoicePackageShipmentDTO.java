package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

public class InvoicePackageShipmentDTO implements Serializable{

	private InvoiceHeaderDTO invoiceHeader;

	private List<InvoicePackageDTO> invoicePackageList;

	public InvoiceHeaderDTO getInvoiceHeader() {
		return invoiceHeader;
	}

	public void setInvoiceHeader(InvoiceHeaderDTO invoiceHeader) {
		this.invoiceHeader = invoiceHeader;
	}

	public List<InvoicePackageDTO> getInvoicePackageList() {
		return invoicePackageList;
	}

	public void setInvoicePackageList(List<InvoicePackageDTO> invoicePackageList) {
		this.invoicePackageList = invoicePackageList;
	}

}
