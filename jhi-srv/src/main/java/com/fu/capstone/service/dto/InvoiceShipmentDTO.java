package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

public class InvoiceShipmentDTO implements Serializable  {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private InvoiceHeaderDTO invoiceHeader;
	
	private List<PersonalShipmentDTO> personalShipmentList;

	public InvoiceHeaderDTO getInvoiceHeader() {
		return invoiceHeader;
	}

	public void setInvoiceHeader(InvoiceHeaderDTO invoiceHeader) {
		this.invoiceHeader = invoiceHeader;
	}

	public List<PersonalShipmentDTO> getPersonalShipment() {
		return personalShipmentList;
	}

	public void setPersonalShipmentList(List<PersonalShipmentDTO> personalShipmentList) {
		this.personalShipmentList = personalShipmentList;
	}
	
	
}
