package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

public class InvoicePackageDetailDTO implements Serializable {
	
	private InvoiceHeaderDTO header;
	
	private List<InvoiceDetailsDTO> lstDetail;
	
	private List<InvoicePackageDTO> lstPackage;

	public InvoiceHeaderDTO getHeader() {
		return header;
	}

	public void setHeader(InvoiceHeaderDTO header) {
		this.header = header;
	}

	public List<InvoiceDetailsDTO> getLstDetail() {
		return lstDetail;
	}

	public void setLstDetail(List<InvoiceDetailsDTO> lstDetail) {
		this.lstDetail = lstDetail;
	}

	public List<InvoicePackageDTO> getLstPackage() {
		return lstPackage;
	}

	public void setLstPackage(List<InvoicePackageDTO> lstPackage) {
		this.lstPackage = lstPackage;
	}
	
}
