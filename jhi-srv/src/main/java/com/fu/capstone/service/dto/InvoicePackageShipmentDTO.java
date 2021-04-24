package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

public class InvoicePackageShipmentDTO implements Serializable{

	private InvoiceHeaderDTO invoiceHeader;
	
	private PersonalShipmentDTO personalShipment;

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

	public PersonalShipmentDTO getPersonalShipment() {
		return personalShipment;
	}

	public void setPersonalShipment(PersonalShipmentDTO personalShipment) {
		this.personalShipment = personalShipment;
	}

}
