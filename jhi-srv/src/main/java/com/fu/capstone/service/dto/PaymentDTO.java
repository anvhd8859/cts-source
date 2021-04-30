package com.fu.capstone.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the Payment entity.
 */
public class PaymentDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	private Long invoiceHeaderId;

	private Long employeeId;

	private Long receiptNoteId;

	private String paymentType;

	private Boolean senderPay;

	private BigDecimal amountPaid;

	private BigDecimal amountDue;

	private Instant createDate;

	private Instant updateDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getInvoiceHeaderId() {
		return invoiceHeaderId;
	}

	public void setInvoiceHeaderId(Long invoiceHeaderId) {
		this.invoiceHeaderId = invoiceHeaderId;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public Boolean isSenderPay() {
		return senderPay;
	}

	public void setSenderPay(Boolean senderPay) {
		this.senderPay = senderPay;
	}

	public BigDecimal getAmountPaid() {
		return amountPaid;
	}

	public void setAmountPaid(BigDecimal amountPaid) {
		this.amountPaid = amountPaid;
	}

	public BigDecimal getAmountDue() {
		return amountDue;
	}

	public void setAmountDue(BigDecimal amountDue) {
		this.amountDue = amountDue;
	}

	public Instant getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Instant createDate) {
		this.createDate = createDate;
	}

	public Instant getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Instant updateDate) {
		this.updateDate = updateDate;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}

		PaymentDTO paymentDTO = (PaymentDTO) o;
		if (paymentDTO.getId() == null || getId() == null) {
			return false;
		}
		return Objects.equals(getId(), paymentDTO.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(getId());
	}

	@Override
	public String toString() {
		return "PaymentDTO{" + "id=" + getId() + ", invoiceHeaderId=" + getInvoiceHeaderId() + ", employeeId="
				+ getEmployeeId() + ", paymentType='" + getPaymentType() + "'" + ", senderPay='" + isSenderPay() + "'"
				+ ", amountPaid=" + getAmountPaid() + ", amountDue=" + getAmountDue() + ", createDate='"
				+ getCreateDate() + "'" + ", updateDate='" + getUpdateDate() + "'" + "}";
	}

	public Long getReceiptNoteId() {
		return receiptNoteId;
	}

	public void setReceiptNoteId(Long receiptNoteId) {
		this.receiptNoteId = receiptNoteId;
	}
}
