package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the PersonalShipment entity.
 */
public class PersonalShipmentDTO implements Serializable {

    private Long id;

    private Long invoiceHeaderId;

    private Long employeeId;

    private String shipmentType;

    private Instant shipTime;

    private Instant finishTime;

    private String status;

    private Instant createDate;

    private Instant updateDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getInvoiceHeaderId() {
        return invoiceHeaderId;
    }

    public void setInvoiceHeaderId(Long invoiceHeaderId) {
        this.invoiceHeaderId = invoiceHeaderId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getShipmentType() {
        return shipmentType;
    }

    public void setShipmentType(String shipmentType) {
        this.shipmentType = shipmentType;
    }

    public Instant getShipTime() {
        return shipTime;
    }

    public void setShipTime(Instant shipTime) {
        this.shipTime = shipTime;
    }

    public Instant getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(Instant finishTime) {
        this.finishTime = finishTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PersonalShipmentDTO personalShipmentDTO = (PersonalShipmentDTO) o;
        if (personalShipmentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), personalShipmentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PersonalShipmentDTO{" +
            "id=" + getId() +
            ", invoiceHeaderId=" + getInvoiceHeaderId() +
            ", employeeId=" + getEmployeeId() +
            ", shipmentType='" + getShipmentType() + "'" +
            ", shipTime='" + getShipTime() + "'" +
            ", finishTime='" + getFinishTime() + "'" +
            ", status='" + getStatus() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
