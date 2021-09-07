package com.fu.capstone.service.dto;

import java.io.Serializable;

public class PersonalShipmentInvoiceDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private UserDTO shipper;

	private PersonalShipmentDTO shipment;

	private InvoiceHeaderDTO invoice;

    public UserDTO getShipper() {
        return shipper;
    }

    public void setShipper(UserDTO shipper) {
        this.shipper = shipper;
    }

    public PersonalShipmentDTO getShipment() {
		return shipment;
	}

	public void setShipment(PersonalShipmentDTO shipment) {
		this.shipment = shipment;
	}

	public InvoiceHeaderDTO getInvoice() {
		return invoice;
	}

	public void setInvoice(InvoiceHeaderDTO invoice) {
		this.invoice = invoice;
	}

}
