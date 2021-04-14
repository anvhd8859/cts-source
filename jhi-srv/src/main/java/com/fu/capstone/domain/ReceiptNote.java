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

    @Column(name = "note")
    private String note;

    @Column(name = "customer_confirm")
    private Boolean customerConfirm;

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

    public Boolean isCustomerConfirm() {
        return customerConfirm;
    }

    public ReceiptNote customerConfirm(Boolean customerConfirm) {
        this.customerConfirm = customerConfirm;
        return this;
    }

    public void setCustomerConfirm(Boolean customerConfirm) {
        this.customerConfirm = customerConfirm;
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
            ", customerConfirm='" + isCustomerConfirm() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
