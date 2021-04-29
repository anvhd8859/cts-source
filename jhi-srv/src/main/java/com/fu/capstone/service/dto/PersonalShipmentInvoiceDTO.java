package com.fu.capstone.service.dto;

import java.io.Serializable;

public class PersonalShipmentInvoiceDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private PersonalShipmentDTO personalShipmentDTO;

	private InvoiceHeaderDTO invoiceHeaderDTO;

	public PersonalShipmentDTO getPersonalShipmentDTO() {
		return personalShipmentDTO;
	}

	public void setPersonalShipmentDTO(PersonalShipmentDTO personalShipmentDTO) {
		this.personalShipmentDTO = personalShipmentDTO;
	}

	public InvoiceHeaderDTO getInvoiceHeaderDTO() {
		return invoiceHeaderDTO;
	}

	public void setInvoiceHeaderDTO(InvoiceHeaderDTO invoiceHeaderDTO) {
		this.invoiceHeaderDTO = invoiceHeaderDTO;
	}

}
