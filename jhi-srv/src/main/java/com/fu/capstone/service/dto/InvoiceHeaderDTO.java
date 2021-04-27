package com.fu.capstone.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the InvoiceHeader entity.
 */
public class InvoiceHeaderDTO implements Serializable {

    private Long id;

    private Long customerId;

    private Long officeId;

    private Long employeeId;

    private String invoiceNo;

    private String invoiceType;

    private String status;

    private String startAddress;

    private Long startStreetId;

    private String destinationAddress;

    private Long destinationStreetId;

    private String receiverName;

    private String receiverPhone;

    private BigDecimal subTotal;

    private BigDecimal taxAmount;

    private BigDecimal totalDue;

    private String note;

    private Boolean cancel;

    private String cancelReason;

    private Boolean customerConfirm;

    private String changeNote;

    private Boolean finish;

    private Instant receiveDate;

    private Instant dueDate;

    private Instant finishDate;

    private Instant createDate;

    private Instant updateDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getOfficeId() {
        return officeId;
    }

    public void setOfficeId(Long officeId) {
        this.officeId = officeId;
    }

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public String getInvoiceType() {
        return invoiceType;
    }

    public void setInvoiceType(String invoiceType) {
        this.invoiceType = invoiceType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStartAddress() {
        return startAddress;
    }

    public void setStartAddress(String startAddress) {
        this.startAddress = startAddress;
    }

    public Long getStartStreetId() {
        return startStreetId;
    }

    public void setStartStreetId(Long startStreetId) {
        this.startStreetId = startStreetId;
    }

    public String getDestinationAddress() {
        return destinationAddress;
    }

    public void setDestinationAddress(String destinationAddress) {
        this.destinationAddress = destinationAddress;
    }

    public Long getDestinationStreetId() {
        return destinationStreetId;
    }

    public void setDestinationStreetId(Long destinationStreetId) {
        this.destinationStreetId = destinationStreetId;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getReceiverPhone() {
        return receiverPhone;
    }

    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone;
    }

    public BigDecimal getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
    }

    public BigDecimal getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(BigDecimal taxAmount) {
        this.taxAmount = taxAmount;
    }

    public BigDecimal getTotalDue() {
        return totalDue;
    }

    public void setTotalDue(BigDecimal totalDue) {
        this.totalDue = totalDue;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Boolean isCancel() {
        return cancel;
    }

    public void setCancel(Boolean cancel) {
        this.cancel = cancel;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }

    public Boolean isCustomerConfirm() {
        return customerConfirm;
    }

    public void setCustomerConfirm(Boolean customerConfirm) {
        this.customerConfirm = customerConfirm;
    }

    public String getChangeNote() {
        return changeNote;
    }

    public void setChangeNote(String changeNote) {
        this.changeNote = changeNote;
    }

    public Boolean isFinish() {
        return finish;
    }

    public void setFinish(Boolean finish) {
        this.finish = finish;
    }

    public Instant getReceiveDate() {
        return receiveDate;
    }

    public void setReceiveDate(Instant receiveDate) {
        this.receiveDate = receiveDate;
    }

    public Instant getDueDate() {
        return dueDate;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public Instant getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Instant finishDate) {
        this.finishDate = finishDate;
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

        InvoiceHeaderDTO invoiceHeaderDTO = (InvoiceHeaderDTO) o;
        if (invoiceHeaderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), invoiceHeaderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InvoiceHeaderDTO{" +
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

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}
}
