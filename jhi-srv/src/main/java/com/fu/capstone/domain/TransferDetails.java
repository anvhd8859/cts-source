package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TransferDetails.
 */
@Entity
@Table(name = "transfer_details")
public class TransferDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transfer_id")
    private Long transferId;

    @Column(name = "invoice_package_id")
    private Long invoicePackageId;

    @Column(name = "status")
    private Boolean status;

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

    public Long getTransferId() {
        return transferId;
    }

    public TransferDetails transferId(Long transferId) {
        this.transferId = transferId;
        return this;
    }

    public void setTransferId(Long transferId) {
        this.transferId = transferId;
    }

    public Long getInvoicePackageId() {
        return invoicePackageId;
    }

    public TransferDetails invoicePackageId(Long invoicePackageId) {
        this.invoicePackageId = invoicePackageId;
        return this;
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

    public TransferDetails createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public TransferDetails updateDate(Instant updateDate) {
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
        TransferDetails transferDetails = (TransferDetails) o;
        if (transferDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transferDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransferDetails{" +
            "id=" + getId() +
            ", transferId=" + getTransferId() +
            ", invoicePackageId=" + getInvoicePackageId() +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
