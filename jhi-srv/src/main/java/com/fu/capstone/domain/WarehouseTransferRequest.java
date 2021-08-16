package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A WarehouseTransferRequest.
 */
@Entity
@Table(name = "warehouse_transfer_request")
public class WarehouseTransferRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "from_warehouse_id")
    private Long fromWarehouseId;

    @Column(name = "to_warehouse_id")
    private Long toWarehouseId;

    @Column(name = "from_keeper_id")
    private Long fromKeeperId;

    @Column(name = "to_keeper_id")
    private Long toKeeperId;

    @Column(name = "status")
    private String status;

    @Column(name = "receive_date")
    private Instant receiveDate;

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

    public Long getFromWarehouseId() {
        return fromWarehouseId;
    }

    public WarehouseTransferRequest fromWarehouseId(Long fromWarehouseId) {
        this.fromWarehouseId = fromWarehouseId;
        return this;
    }

    public void setFromWarehouseId(Long fromWarehouseId) {
        this.fromWarehouseId = fromWarehouseId;
    }

    public Long getToWarehouseId() {
        return toWarehouseId;
    }

    public WarehouseTransferRequest toWarehouseId(Long toWarehouseId) {
        this.toWarehouseId = toWarehouseId;
        return this;
    }

    public void setToWarehouseId(Long toWarehouseId) {
        this.toWarehouseId = toWarehouseId;
    }

    public Long getFromKeeperId() {
        return fromKeeperId;
    }

    public WarehouseTransferRequest fromKeeperId(Long fromKeeperId) {
        this.fromKeeperId = fromKeeperId;
        return this;
    }

    public void setFromKeeperId(Long fromKeeperId) {
        this.fromKeeperId = fromKeeperId;
    }

    public Long getToKeeperId() {
        return toKeeperId;
    }

    public WarehouseTransferRequest toKeeperId(Long toKeeperId) {
        this.toKeeperId = toKeeperId;
        return this;
    }

    public void setToKeeperId(Long toKeeperId) {
        this.toKeeperId = toKeeperId;
    }

    public String getStatus() {
        return status;
    }

    public WarehouseTransferRequest status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getReceiveDate() {
        return receiveDate;
    }

    public WarehouseTransferRequest receiveDate(Instant receiveDate) {
        this.receiveDate = receiveDate;
        return this;
    }

    public void setReceiveDate(Instant receiveDate) {
        this.receiveDate = receiveDate;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public WarehouseTransferRequest createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public WarehouseTransferRequest updateDate(Instant updateDate) {
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
        WarehouseTransferRequest warehouseTransferRequest = (WarehouseTransferRequest) o;
        if (warehouseTransferRequest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), warehouseTransferRequest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WarehouseTransferRequest{" +
            "id=" + getId() +
            ", fromWarehouseId=" + getFromWarehouseId() +
            ", toWarehouseId=" + getToWarehouseId() +
            ", fromKeeperId=" + getFromKeeperId() +
            ", toKeeperId=" + getToKeeperId() +
            ", status='" + getStatus() + "'" +
            ", receiveDate='" + getReceiveDate() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
