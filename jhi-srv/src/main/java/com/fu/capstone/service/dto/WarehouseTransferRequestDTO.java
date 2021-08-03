package com.fu.capstone.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the WarehouseTransferRequest entity.
 */
public class WarehouseTransferRequestDTO implements Serializable {

    private Long id;

    private Long fromWarehouseId;

    private Long toWarehouseId;

    private Long fromKeeperId;

    private Long toKeeperId;

    private String status;

    private Instant receiveDate;

    private Instant createDate;

    private Instant updateDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFromWarehouseId() {
        return fromWarehouseId;
    }

    public void setFromWarehouseId(Long fromWarehouseId) {
        this.fromWarehouseId = fromWarehouseId;
    }

    public Long getToWarehouseId() {
        return toWarehouseId;
    }

    public void setToWarehouseId(Long toWarehouseId) {
        this.toWarehouseId = toWarehouseId;
    }

    public Long getFromKeeperId() {
        return fromKeeperId;
    }

    public void setFromKeeperId(Long fromKeeperId) {
        this.fromKeeperId = fromKeeperId;
    }

    public Long getToKeeperId() {
        return toKeeperId;
    }

    public void setToKeeperId(Long toKeeperId) {
        this.toKeeperId = toKeeperId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getReceiveDate() {
        return receiveDate;
    }

    public void setReceiveDate(Instant receiveDate) {
        this.receiveDate = receiveDate;
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

        WarehouseTransferRequestDTO warehouseTransferRequestDTO = (WarehouseTransferRequestDTO) o;
        if (warehouseTransferRequestDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), warehouseTransferRequestDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WarehouseTransferRequestDTO{" +
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
