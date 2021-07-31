package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A RequestDetails.
 */
@Entity
@Table(name = "request_details")
public class RequestDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "request_id")
    private Long requestId;

    @Column(name = "invoice_package_id")
    private Long invoicePackageId;

    @Column(name = "keeper_confirm")
    private Boolean keeperConfirm;

    @Column(name = "shipper_confirm")
    private Boolean shipperConfirm;

    @Column(name = "imp_exp_confirm")
    private Boolean impExpConfirm;

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

    public Long getRequestId() {
        return requestId;
    }

    public RequestDetails ieWarehouseId(Long ieWarehouseId) {
        this.requestId = ieWarehouseId;
        return this;
    }

    public void setRequestId(Long ieWarehouseId) {
        this.requestId = ieWarehouseId;
    }

    public Long getInvoicePackageId() {
        return invoicePackageId;
    }

    public RequestDetails shipmentId(Long shipmentId) {
        this.invoicePackageId = shipmentId;
        return this;
    }

    public void setInvoicePackageId(Long shipmentId) {
        this.invoicePackageId = shipmentId;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public RequestDetails createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public Boolean getKeeperConfirm() {
		return keeperConfirm;
	}

	public void setKeeperConfirm(Boolean keeperConfirm) {
		this.keeperConfirm = keeperConfirm;
	}

	public Boolean getShipperConfirm() {
		return shipperConfirm;
	}

	public void setShipperConfirm(Boolean shipperConfirm) {
		this.shipperConfirm = shipperConfirm;
	}

	public Boolean getImpExpConfirm() {
		return impExpConfirm;
	}

	public void setImpExpConfirm(Boolean impExpConfirm) {
		this.impExpConfirm = impExpConfirm;
	}

	public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public RequestDetails updateDate(Instant updateDate) {
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
        RequestDetails requestDetails = (RequestDetails) o;
        if (requestDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), requestDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RequestDetails{" +
            "id=" + getId() +
            ", requestId=" + getRequestId() +
            ", invoicePackageId=" + getInvoicePackageId() +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
