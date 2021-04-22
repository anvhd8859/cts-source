package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A InvoiceHeader.
 */
@Entity
@Table(name = "invoice_header")
public class InvoiceHeader implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "office_id")
    private Long officeId;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "invoice_no")
    private String invoiceNo;

    @Column(name = "invoice_type")
    private String invoiceType;

    @Column(name = "status")
    private String status;

    @Column(name = "start_address")
    private String startAddress;

    @Column(name = "start_street_id")
    private Long startStreetId;

    @Column(name = "destination_address")
    private String destinationAddress;

    @Column(name = "destination_street_id")
    private Long destinationStreetId;

    @Column(name = "receiver_name")
    private String receiverName;

    @Column(name = "receiver_phone")
    private String receiverPhone;

    @Column(name = "sub_total", precision = 10, scale = 2)
    private BigDecimal subTotal;

    @Column(name = "tax_amount", precision = 10, scale = 2)
    private BigDecimal taxAmount;

    @Column(name = "total_due", precision = 10, scale = 2)
    private BigDecimal totalDue;

    @Column(name = "note")
    private String note;

    @Column(name = "jhi_cancel")
    private Boolean cancel;

    @Column(name = "cancel_reason")
    private String cancelReason;

    @Column(name = "customer_confirm")
    private Boolean customerConfirm;

    @Column(name = "change_note")
    private String changeNote;

    @Column(name = "finish")
    private Boolean finish;

    @Column(name = "receive_date")
    private Instant receiveDate;

    @Column(name = "due_date")
    private Instant dueDate;

    @Column(name = "finish_date")
    private Instant finishDate;

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

    public Long getCustomerId() {
        return customerId;
    }

    public InvoiceHeader customerId(Long customerId) {
        this.customerId = customerId;
        return this;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getOfficeId() {
        return officeId;
    }

    public InvoiceHeader officeId(Long officeId) {
        this.officeId = officeId;
        return this;
    }

    public void setOfficeId(Long officeId) {
        this.officeId = officeId;
    }

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public InvoiceHeader invoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
        return this;
    }

    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public String getInvoiceType() {
        return invoiceType;
    }

    public InvoiceHeader invoiceType(String invoiceType) {
        this.invoiceType = invoiceType;
        return this;
    }

    public void setInvoiceType(String invoiceType) {
        this.invoiceType = invoiceType;
    }

    public String getStatus() {
        return status;
    }

    public InvoiceHeader status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStartAddress() {
        return startAddress;
    }

    public InvoiceHeader startAddress(String startAddress) {
        this.startAddress = startAddress;
        return this;
    }

    public void setStartAddress(String startAddress) {
        this.startAddress = startAddress;
    }

    public Long getStartStreetId() {
        return startStreetId;
    }

    public InvoiceHeader startStreetId(Long startStreetId) {
        this.startStreetId = startStreetId;
        return this;
    }

    public void setStartStreetId(Long startStreetId) {
        this.startStreetId = startStreetId;
    }

    public String getDestinationAddress() {
        return destinationAddress;
    }

    public InvoiceHeader destinationAddress(String destinationAddress) {
        this.destinationAddress = destinationAddress;
        return this;
    }

    public void setDestinationAddress(String destinationAddress) {
        this.destinationAddress = destinationAddress;
    }

    public Long getDestinationStreetId() {
        return destinationStreetId;
    }

    public InvoiceHeader destinationStreetId(Long destinationStreetId) {
        this.destinationStreetId = destinationStreetId;
        return this;
    }

    public void setDestinationStreetId(Long destinationStreetId) {
        this.destinationStreetId = destinationStreetId;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public InvoiceHeader receiverName(String receiverName) {
        this.receiverName = receiverName;
        return this;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getReceiverPhone() {
        return receiverPhone;
    }

    public InvoiceHeader receiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone;
        return this;
    }

    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone;
    }

    public BigDecimal getSubTotal() {
        return subTotal;
    }

    public InvoiceHeader subTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
        return this;
    }

    public void setSubTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
    }

    public BigDecimal getTaxAmount() {
        return taxAmount;
    }

    public InvoiceHeader taxAmount(BigDecimal taxAmount) {
        this.taxAmount = taxAmount;
        return this;
    }

    public void setTaxAmount(BigDecimal taxAmount) {
        this.taxAmount = taxAmount;
    }

    public BigDecimal getTotalDue() {
        return totalDue;
    }

    public InvoiceHeader totalDue(BigDecimal totalDue) {
        this.totalDue = totalDue;
        return this;
    }

    public void setTotalDue(BigDecimal totalDue) {
        this.totalDue = totalDue;
    }

    public String getNote() {
        return note;
    }

    public InvoiceHeader note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Boolean isCancel() {
        return cancel;
    }

    public InvoiceHeader cancel(Boolean cancel) {
        this.cancel = cancel;
        return this;
    }

    public void setCancel(Boolean cancel) {
        this.cancel = cancel;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public InvoiceHeader cancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
        return this;
    }

    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }

    public Boolean isCustomerConfirm() {
        return customerConfirm;
    }

    public InvoiceHeader customerConfirm(Boolean customerConfirm) {
        this.customerConfirm = customerConfirm;
        return this;
    }

    public void setCustomerConfirm(Boolean customerConfirm) {
        this.customerConfirm = customerConfirm;
    }

    public String getChangeNote() {
        return changeNote;
    }

    public InvoiceHeader changeNote(String changeNote) {
        this.changeNote = changeNote;
        return this;
    }

    public void setChangeNote(String changeNote) {
        this.changeNote = changeNote;
    }

    public Boolean isFinish() {
        return finish;
    }

    public InvoiceHeader finish(Boolean finish) {
        this.finish = finish;
        return this;
    }

    public void setFinish(Boolean finish) {
        this.finish = finish;
    }

    public Instant getReceiveDate() {
        return receiveDate;
    }

    public InvoiceHeader receiveDate(Instant receiveDate) {
        this.receiveDate = receiveDate;
        return this;
    }

    public void setReceiveDate(Instant receiveDate) {
        this.receiveDate = receiveDate;
    }

    public Instant getDueDate() {
        return dueDate;
    }

    public InvoiceHeader dueDate(Instant dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public Instant getFinishDate() {
        return finishDate;
    }

    public InvoiceHeader finishDate(Instant finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public void setFinishDate(Instant finishDate) {
        this.finishDate = finishDate;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public InvoiceHeader createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public InvoiceHeader updateDate(Instant updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public Boolean getCancel() {
		return cancel;
	}

	public Boolean getCustomerConfirm() {
		return customerConfirm;
	}

	public Boolean getFinish() {
		return finish;
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
        InvoiceHeader invoiceHeader = (InvoiceHeader) o;
        if (invoiceHeader.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), invoiceHeader.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InvoiceHeader{" +
            "id=" + getId() +
            ", customerId=" + getCustomerId() +
            ", officeId=" + getOfficeId() +
            ", invoiceNo='" + getInvoiceNo() + "'" +
            ", invoiceType='" + getInvoiceType() + "'" +
            ", status='" + getStatus() + "'" +
            ", startAddress='" + getStartAddress() + "'" +
            ", startStreetId=" + getStartStreetId() +
            ", destinationAddress='" + getDestinationAddress() + "'" +
            ", destinationStreetId=" + getDestinationStreetId() +
            ", receiverName='" + getReceiverName() + "'" +
            ", receiverPhone='" + getReceiverPhone() + "'" +
            ", subTotal=" + getSubTotal() +
            ", taxAmount=" + getTaxAmount() +
            ", totalDue=" + getTotalDue() +
            ", note='" + getNote() + "'" +
            ", cancel='" + isCancel() + "'" +
            ", cancelReason='" + getCancelReason() + "'" +
            ", customerConfirm='" + isCustomerConfirm() + "'" +
            ", changeNote='" + getChangeNote() + "'" +
            ", finish='" + isFinish() + "'" +
            ", receiveDate='" + getReceiveDate() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
