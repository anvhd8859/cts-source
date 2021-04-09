package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A PersonalShipment.
 */
@Entity
@Table(name = "personal_shipment")
public class PersonalShipment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "invoice_header_id")
    private Long invoiceHeaderId;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "shipment_type")
    private String shipmentType;

    @Column(name = "ship_time")
    private Instant shipTime;

    @Column(name = "finish_time")
    private Instant finishTime;

    @Column(name = "status")
    private String status;

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

    public Long getInvoiceHeaderId() {
        return invoiceHeaderId;
    }

    public PersonalShipment invoiceHeaderId(Long invoiceHeaderId) {
        this.invoiceHeaderId = invoiceHeaderId;
        return this;
    }

    public void setInvoiceHeaderId(Long invoiceHeaderId) {
        this.invoiceHeaderId = invoiceHeaderId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public PersonalShipment employeeId(Long employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getShipmentType() {
        return shipmentType;
    }

    public PersonalShipment shipmentType(String shipmentType) {
        this.shipmentType = shipmentType;
        return this;
    }

    public void setShipmentType(String shipmentType) {
        this.shipmentType = shipmentType;
    }

    public Instant getShipTime() {
        return shipTime;
    }

    public PersonalShipment shipTime(Instant shipTime) {
        this.shipTime = shipTime;
        return this;
    }

    public void setShipTime(Instant shipTime) {
        this.shipTime = shipTime;
    }

    public Instant getFinishTime() {
        return finishTime;
    }

    public PersonalShipment finishTime(Instant finishTime) {
        this.finishTime = finishTime;
        return this;
    }

    public void setFinishTime(Instant finishTime) {
        this.finishTime = finishTime;
    }

    public String getStatus() {
        return status;
    }

    public PersonalShipment status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public PersonalShipment createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public PersonalShipment updateDate(Instant updateDate) {
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
        PersonalShipment personalShipment = (PersonalShipment) o;
        if (personalShipment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), personalShipment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PersonalShipment{" +
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
