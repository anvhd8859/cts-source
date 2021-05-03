package com.fu.capstone.service.dto;

import java.io.Serializable;

public class PaymentInvoiceDTO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private PaymentDTO payment;
	
	private InvoiceHeaderDTO invoice;

	public PaymentDTO getPayment() {
		return payment;
	}

	public void setPayment(PaymentDTO payment) {
		this.payment = payment;
	}

	public InvoiceHeaderDTO getInvoice() {
		return invoice;
	}

	public void setInvoice(InvoiceHeaderDTO invoice) {
		this.invoice = invoice;
	}

}
