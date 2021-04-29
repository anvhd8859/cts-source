package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A ImportExportWarehouse.
 */
@Entity
@Table(name = "import_export_warehouse")
public class ImportExportWarehouse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "office_id")
    private Long officeId;

    @Column(name = "keeper_id")
    private Long keeperId;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "note")
    private String note;

    @Column(name = "keeper_confirm")
    private Boolean keeperConfirm;

    @Column(name = "ship_date")
    private Instant shipDate;

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

    public Long getOfficeId() {
        return officeId;
    }

    public ImportExportWarehouse officeId(Long officeId) {
        this.officeId = officeId;
        return this;
    }

    public void setOfficeId(Long officeId) {
        this.officeId = officeId;
    }

    public Long getKeeperId() {
        return keeperId;
    }

    public ImportExportWarehouse keeperId(Long keeperId) {
        this.keeperId = keeperId;
        return this;
    }

    public void setKeeperId(Long keeperId) {
        this.keeperId = keeperId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public ImportExportWarehouse employeeId(Long employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getType() {
        return type;
    }

    public ImportExportWarehouse type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNote() {
        return note;
    }

    public ImportExportWarehouse note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Boolean isKeeperConfirm() {
        return keeperConfirm;
    }

    public ImportExportWarehouse keeperConfirm(Boolean keeperConfirm) {
        this.keeperConfirm = keeperConfirm;
        return this;
    }

    public void setKeeperConfirm(Boolean keeperConfirm) {
        this.keeperConfirm = keeperConfirm;
    }

    public Instant getShipDate() {
        return shipDate;
    }

    public ImportExportWarehouse shipDate(Instant shipDate) {
        this.shipDate = shipDate;
        return this;
    }

    public void setShipDate(Instant shipDate) {
        this.shipDate = shipDate;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public ImportExportWarehouse createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public ImportExportWarehouse updateDate(Instant updateDate) {
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
        ImportExportWarehouse importExportWarehouse = (ImportExportWarehouse) o;
        if (importExportWarehouse.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), importExportWarehouse.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImportExportWarehouse{" +
            "id=" + getId() +
            ", officeId=" + getOfficeId() +
            ", keeperId=" + getKeeperId() +
            ", employeeId=" + getEmployeeId() +
            ", type='" + getType() + "'" +
            ", note='" + getNote() + "'" +
            ", keeperConfirm='" + isKeeperConfirm() + "'" +
            ", shipDate='" + getShipDate() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
