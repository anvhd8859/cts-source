package com.fu.capstone.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TransferDetails entity.
 */
public class TransferDetailsDTO implements Serializable {

    private Long id;

    private Long transferId;

    private Long invoicePackageId;

    private Boolean status;

    private String note;

    private Instant createDate;

    private Instant updateDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTransferId() {
        return transferId;
    }

    public void setTransferId(Long transferId) {
        this.transferId = transferId;
    }

    public Long getInvoicePackageId() {
        return invoicePackageId;
    }

    public void setInvoicePackageId(Long invoicePackageId) {
        this.invoicePackageId = invoicePackageId;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TransferDetailsDTO transferDetailsDTO = (TransferDetailsDTO) o;
        if (transferDetailsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transferDetailsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransferDetailsDTO{" +
            "id=" + getId() +
            ", transferId=" + getTransferId() +
            ", invoicePackageIdackageId=" + getInvoicePackageId() +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
