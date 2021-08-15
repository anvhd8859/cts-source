package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

public class ShipmentInvoicePackagesDTO implements Serializable {

	private PersonalShipmentDTO personalShipmentDTO;

	private InvoiceHeaderDTO invoiceHeaderDTO;

	private List<InvoicePackageDTO> packageList;

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

	public List<InvoicePackageDTO> getPackageList() {
		return packageList;
	}

	public void setPackageList(List<InvoicePackageDTO> packageList) {
		this.packageList = packageList;
	}
}
