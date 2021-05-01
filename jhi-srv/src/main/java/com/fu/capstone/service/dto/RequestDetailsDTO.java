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

    private Long invoiceHeaderId;

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

    public Long getInvoiceHeaderId() {
        return invoiceHeaderId;
    }

    public void setInvoiceHeaderId(Long invoiceHeaderId) {
        this.invoiceHeaderId = invoiceHeaderId;
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
            ", invoiceHeaderId=" + getInvoiceHeaderId() +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
