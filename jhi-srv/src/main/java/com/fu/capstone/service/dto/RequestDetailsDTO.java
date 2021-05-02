package com.fu.capstone.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the RequestDetails entity.
 */
public class RequestDetailsDTO implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;

    private Long ieWarehouseId;

    private Long shipmentId;
    
    private Long keeperConfirm;
    
    private Long shipperConfirm;
    
    private Long impExpConfirm;

    private Instant createDate;

    private Instant updateDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIeWarehouseId() {
        return ieWarehouseId;
    }

    public void setIeWarehouseId(Long ieWarehouseId) {
        this.ieWarehouseId = ieWarehouseId;
    }

    public Long getShipmentId() {
        return shipmentId;
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

	public void setShipmentId(Long shipmentId) {
        this.shipmentId = shipmentId;
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

        RequestDetailsDTO requestDetailsDTO = (RequestDetailsDTO) o;
        if (requestDetailsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), requestDetailsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RequestDetailsDTO{" +
            "id=" + getId() +
            ", ieWarehouseId=" + getIeWarehouseId() +
            ", invoiceHeaderId=" + getShipmentId() +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
