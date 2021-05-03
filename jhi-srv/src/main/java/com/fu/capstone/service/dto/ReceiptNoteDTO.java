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

    private Long shipmentId;

    private String note;

    private String imageLink;

    private String receiptType;

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

    public String getReceiptType() {
		return receiptType;
	}

	public void setReceiptType(String receiptType) {
		this.receiptType = receiptType;
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
            ", receiptType='" + getReceiptType() + "'" +
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

	public Long getShipmentId() {
		return shipmentId;
	}

	public void setShipmentId(Long shipmentId) {
		this.shipmentId = shipmentId;
	}
}
