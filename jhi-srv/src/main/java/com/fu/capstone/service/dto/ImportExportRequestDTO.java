package com.fu.capstone.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ImportExportWarehouse entity.
 */
public class ImportExportRequestDTO implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;

    private Long warehouseId;

    private Long keeperId;

    private Long employeeId;

    private String type;

    private String note;

    private Boolean keeperConfirm;

    private Boolean shipperConfirm;

    private Instant shipDate;

    private Instant createDate;

    private Instant updateDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }

    public Long getKeeperId() {
        return keeperId;
    }

    public void setKeeperId(Long keeperId) {
        this.keeperId = keeperId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
    public Boolean isShipperConfirm() {
        return shipperConfirm;
    }

    public void setKeeperConfirm(Boolean keeperConfirm) {
        this.keeperConfirm = keeperConfirm;
    }

    public Instant getShipDate() {
        return shipDate;
    }

    public void setShipDate(Instant shipDate) {
        this.shipDate = shipDate;
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

        ImportExportRequestDTO importExportRequestDTO = (ImportExportRequestDTO) o;
        if (importExportRequestDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), importExportRequestDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImportExportWarehouseDTO{" +
            "id=" + getId() +
            ", warehouseID=" + getWarehouseId() +
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

	public Boolean getShipperConfirm() {
		return shipperConfirm;
	}

	public void setShipperConfirm(Boolean shipperConfirm) {
		this.shipperConfirm = shipperConfirm;
	}
}
