package com.fu.capstone.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ReceiptNote entity.
 */
public class ReceiptNoteDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private Long id;

    private Long employeeId;

    private Long invoiceHeaderId;

    private String note;

    private String imageLink;

    private Boolean customerConfirm;

    private Instant createDate;

    private Instant updateDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getInvoiceHeaderId() {
        return invoiceHeaderId;
    }

    public void setInvoiceHeaderId(Long invoiceHeaderId) {
        this.invoiceHeaderId = invoiceHeaderId;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Boolean isCustomerConfirm() {
        return customerConfirm;
    }

    public void setCustomerConfirm(Boolean customerConfirm) {
        this.customerConfirm = customerConfirm;
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

        ReceiptNoteDTO receiptNoteDTO = (ReceiptNoteDTO) o;
        if (receiptNoteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), receiptNoteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReceiptNoteDTO{" +
            "id=" + getId() +
            ", employeeId=" + getEmployeeId() +
            ", invoiceHeaderId=" + getInvoiceHeaderId() +
            ", note='" + getNote() + "'" +
            ", customerConfirm='" + isCustomerConfirm() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }

	public String getImageLink() {
		return imageLink;
	}

	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}
}
