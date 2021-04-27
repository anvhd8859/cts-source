package com.fu.capstone.service.dto;

import java.io.Serializable;

public class ReceiptInvoiceDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private ReceiptNoteDTO receiptNote;
    
    private InvoiceHeaderDTO invoiceHeader;

	public ReceiptNoteDTO getReceiptNote() {
		return receiptNote;
	}

	public void setReceiptNote(ReceiptNoteDTO receiptNote) {
		this.receiptNote = receiptNote;
	}

	public InvoiceHeaderDTO getInvoiceHeader() {
		return invoiceHeader;
	}

	public void setInvoiceHeader(InvoiceHeaderDTO invoiceHeader) {
		this.invoiceHeader = invoiceHeader;
	}
}
