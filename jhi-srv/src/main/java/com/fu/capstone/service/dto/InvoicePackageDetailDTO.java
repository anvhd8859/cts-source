package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

public class InvoicePackageDetailDTO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private InvoiceHeaderDTO invoice;
	
	private List<PackageDetailsDTO> packageList;

	public InvoiceHeaderDTO getInvoice() {
		return invoice;
	}

	public void setInvoice(InvoiceHeaderDTO header) {
		this.invoice = header;
	}

	public List<PackageDetailsDTO> getPackageList() {
		return packageList;
	}

	public void setPackageList(List<PackageDetailsDTO> packageList) {
		this.packageList = packageList;
	}
	
}
