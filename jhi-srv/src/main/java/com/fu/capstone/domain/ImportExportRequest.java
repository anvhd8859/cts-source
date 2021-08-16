package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A ImportExportWarehouse.
 */
@Entity
@Table(name = "import_export_request")
public class ImportExportRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "warehouse_id")
    private Long warehouseId;

    @Column(name = "keeper_id")
    private Long keeperId;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "status")
    private String status;

    @Column(name = "note")
    private String note;

    @Column(name = "keeper_confirm")
    private Boolean keeperConfirm;

    @Column(name = "shipper_confirm")
    private Boolean shipperConfirm;

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

    public Long getWarehouseId() {
        return warehouseId;
    }

    public ImportExportRequest officeId(Long officeId) {
        this.warehouseId = officeId;
        return this;
    }

    public void setWarehouseId(Long officeId) {
        this.warehouseId = officeId;
    }

    public Long getKeeperId() {
        return keeperId;
    }

    public ImportExportRequest keeperId(Long keeperId) {
        this.keeperId = keeperId;
        return this;
    }

    public void setKeeperId(Long keeperId) {
        this.keeperId = keeperId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public ImportExportRequest employeeId(Long employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getType() {
        return type;
    }

    public ImportExportRequest type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public ImportExportRequest note(String note) {
        this.status = note;
        return this;
    }

    public void setStatus(String note) {
        this.status = note;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Boolean isKeeperConfirm() {
        return keeperConfirm;
    }

    public ImportExportRequest keeperConfirm(Boolean keeperConfirm) {
        this.keeperConfirm = keeperConfirm;
        return this;
    }

    public void setKeeperConfirm(Boolean keeperConfirm) {
        this.keeperConfirm = keeperConfirm;
    }

    public Instant getShipDate() {
        return shipDate;
    }

    public ImportExportRequest shipDate(Instant shipDate) {
        this.shipDate = shipDate;
        return this;
    }

    public void setShipDate(Instant shipDate) {
        this.shipDate = shipDate;
    }

    public Boolean getShipperConfirm() {
		return shipperConfirm;
	}
    public Boolean isShipperConfirm() {
		return shipperConfirm;
	}

	public void setShipperConfirm(Boolean shipperConfirm) {
		this.shipperConfirm = shipperConfirm;
	}

	public Boolean getKeeperConfirm() {
		return keeperConfirm;
	}

	public Instant getCreateDate() {
        return createDate;
    }

    public ImportExportRequest createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public ImportExportRequest updateDate(Instant updateDate) {
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
        ImportExportRequest importExportRequest = (ImportExportRequest) o;
        if (importExportRequest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), importExportRequest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImportExportWarehouse{" +
            "id=" + getId() +
            ", warehouseId=" + getWarehouseId() +
            ", keeperId=" + getKeeperId() +
            ", employeeId=" + getEmployeeId() +
            ", type='" + getType() + "'" +
            ", status='" + getStatus() + "'" +
            ", keeperConfirm='" + isKeeperConfirm() + "'" +
            ", shipDate='" + getShipDate() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
