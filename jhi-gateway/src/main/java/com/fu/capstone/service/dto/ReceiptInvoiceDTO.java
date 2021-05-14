package com.fu.capstone.service.dto;

import java.io.Serializable;

public class ReceiptInvoiceDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private UserDTO customer;
	
	private UserDTO employee;

	private ReceiptNoteDTO receipt;
	
	private InvoiceHeaderDTO invoiceHeader;

	public ReceiptNoteDTO getReceipt() {
		return receipt;
	}

	public void setReceipt(ReceiptNoteDTO receipt) {
		this.receipt = receipt;
	}

	public InvoiceHeaderDTO getInvoiceHeader() {
		return invoiceHeader;
	}

	public void setInvoiceHeader(InvoiceHeaderDTO invoiceHeader) {
		this.invoiceHeader = invoiceHeader;
	}

	public UserDTO getCustomer() {
		return customer;
	}

	public void setCustomer(UserDTO customer) {
		this.customer = customer;
	}

	public UserDTO getEmployee() {
		return employee;
	}

	public void setEmployee(UserDTO employee) {
		this.employee = employee;
	}
	
	
}
