package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A ReceiptNote.
 */
@Entity
@Table(name = "receipt_note")
public class ReceiptNote implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "invoice_header_id")
    private Long invoiceHeaderId;

    @Column(name = "shipment_id")
    private Long shipmentId;

    @Column(name = "note")
    private String note;

    @Column(name = "image_link")
    private String imageLink;

    @Column(name = "receipt_type")
    private String receiptType;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "update_date")
    private Instant updateDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public ReceiptNote employeeId(Long employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getInvoiceHeaderId() {
        return invoiceHeaderId;
    }

    public ReceiptNote invoiceHeaderId(Long invoiceHeaderId) {
        this.invoiceHeaderId = invoiceHeaderId;
        return this;
    }

    public void setInvoiceHeaderId(Long invoiceHeaderId) {
        this.invoiceHeaderId = invoiceHeaderId;
    }

    public String getNote() {
        return note;
    }

    public ReceiptNote note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getImageLink() {
		return imageLink;
	}

	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}

	public String getReceiptType() {
		return receiptType;
	}

	public String isReceiptType() {
        return receiptType;
    }

    public ReceiptNote receiptType(String receiptType) {
        this.receiptType = receiptType;
        return this;
    }

    public void setReceiptType(String receiptType) {
        this.receiptType = receiptType;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public ReceiptNote createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Long getShipmentId() {
		return shipmentId;
	}

	public void setShipmentId(Long shipmentId) {
		this.shipmentId = shipmentId;
	}

	public Instant getUpdateDate() {
        return updateDate;
    }

    public ReceiptNote updateDate(Instant updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public void setUpdateDate(Instant updateDate) {
        this.updateDate = updateDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ReceiptNote receiptNote = (ReceiptNote) o;
        if (receiptNote.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), receiptNote.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReceiptNote{" +
            "id=" + getId() +
            ", employeeId=" + getEmployeeId() +
            ", invoiceHeaderId=" + getInvoiceHeaderId() +
            ", note='" + getNote() + "'" +
            ", receiptType='" + isReceiptType() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
