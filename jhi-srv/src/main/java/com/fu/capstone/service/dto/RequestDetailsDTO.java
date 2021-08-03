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

    private Long requestId;

    private Long invoicePackageId;
    
    private Boolean keeperConfirm;
    
    private Boolean shipperConfirm;
    
    private Boolean status;

    private Instant createDate;

    private Instant updateDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public Long getInvoicePackageId() {
        return invoicePackageId;
    }

    public Boolean getKeeperConfirm() {
		return keeperConfirm;
	}

	public void setKeeperConfirm(Boolean keeperConfirm) {
		this.keeperConfirm = keeperConfirm;
	}

	public Boolean getShipperConfirm() {
		return shipperConfirm;
	}

	public void setShipperConfirm(Boolean shipperConfirm) {
		this.shipperConfirm = shipperConfirm;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public void setInvoicePackageId(Long invoicePackageId) {
        this.invoicePackageId = invoicePackageId;
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
            ", requestId=" + getRequestId() +
            ", invoicePackageId=" + getInvoicePackageId() +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
