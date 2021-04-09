package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Warehouse.
 */
@Entity
@Table(name = "warehouse")
public class Warehouse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "warehouse_name")
    private String warehouseName;

    @Column(name = "keeper_id")
    private Long keeperId;

    @Column(name = "address")
    private String address;

    @Column(name = "street_id")
    private String streetId;

    @Column(name = "warehouse_type")
    private String warehouseType;

    @Column(name = "master_warehouse_id")
    private Long masterWarehouseId;

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

    public String getWarehouseName() {
        return warehouseName;
    }

    public Warehouse warehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
        return this;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public Long getKeeperId() {
        return keeperId;
    }

    public Warehouse keeperId(Long keeperId) {
        this.keeperId = keeperId;
        return this;
    }

    public void setKeeperId(Long keeperId) {
        this.keeperId = keeperId;
    }

    public String getAddress() {
        return address;
    }

    public Warehouse address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStreetId() {
        return streetId;
    }

    public Warehouse streetId(String streetId) {
        this.streetId = streetId;
        return this;
    }

    public void setStreetId(String streetId) {
        this.streetId = streetId;
    }

    public String getWarehouseType() {
        return warehouseType;
    }

    public Warehouse warehouseType(String warehouseType) {
        this.warehouseType = warehouseType;
        return this;
    }

    public void setWarehouseType(String warehouseType) {
        this.warehouseType = warehouseType;
    }

    public Long getMasterWarehouseId() {
        return masterWarehouseId;
    }

    public Warehouse masterWarehouseId(Long masterWarehouseId) {
        this.masterWarehouseId = masterWarehouseId;
        return this;
    }

    public void setMasterWarehouseId(Long masterWarehouseId) {
        this.masterWarehouseId = masterWarehouseId;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Warehouse createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public Warehouse updateDate(Instant updateDate) {
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
        Warehouse warehouse = (Warehouse) o;
        if (warehouse.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), warehouse.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Warehouse{" +
            "id=" + getId() +
            ", warehouseName='" + getWarehouseName() + "'" +
            ", keeperId=" + getKeeperId() +
            ", address='" + getAddress() + "'" +
            ", streetId='" + getStreetId() + "'" +
            ", warehouseType='" + getWarehouseType() + "'" +
            ", masterWarehouseId=" + getMasterWarehouseId() +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
