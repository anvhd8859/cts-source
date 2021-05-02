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

    @Column(name = "ie_warehouse_id")
    private Long ieWarehouseId;

    @Column(name = "shipment_id")
    private Long shipmentId;

    @Column(name = "keeper_confirm")
    private Long keeperConfirm;

    @Column(name = "shipper_confirm")
    private Long shipperConfirm;

    @Column(name = "imp_exp_confirm")
    private Long impExpConfirm;

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

    public Long getIeWarehouseId() {
        return ieWarehouseId;
    }

    public RequestDetails ieWarehouseId(Long ieWarehouseId) {
        this.ieWarehouseId = ieWarehouseId;
        return this;
    }

    public void setIeWarehouseId(Long ieWarehouseId) {
        this.ieWarehouseId = ieWarehouseId;
    }

    public Long getShipmentId() {
        return shipmentId;
    }

    public RequestDetails shipmentId(Long shipmentId) {
        this.shipmentId = shipmentId;
        return this;
    }

    public void setShipmentId(Long shipmentId) {
        this.shipmentId = shipmentId;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public RequestDetails createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public Long getKeeperConfirm() {
		return keeperConfirm;
	}

	public void setKeeperConfirm(Long keeperConfirm) {
		this.keeperConfirm = keeperConfirm;
	}

	public Long getShipperConfirm() {
		return shipperConfirm;
	}

	public void setShipperConfirm(Long shipperConfirm) {
		this.shipperConfirm = shipperConfirm;
	}

	public Long getImpExpConfirm() {
		return impExpConfirm;
	}

	public void setImpExpConfirm(Long impExpConfirm) {
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
            ", ieWarehouseId=" + getIeWarehouseId() +
            ", invoiceHeaderId=" + getShipmentId() +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
