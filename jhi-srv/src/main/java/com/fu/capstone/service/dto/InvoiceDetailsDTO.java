package com.fu.capstone.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the InvoiceDetails entity.
 */
public class InvoiceDetailsDTO implements Serializable {

    private Long id;

    private Long invoiceHeaderId;

    private String itemName;

    private String itemType;

    private Float weight;

    private Float height;

    private Float length;

    private Float width;

    private String description;

    private String originImage;

    private String damagesImage;

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

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public Float getHeight() {
        return height;
    }

    public void setHeight(Float height) {
        this.height = height;
    }

    public Float getLength() {
        return length;
    }

    public void setLength(Float length) {
        this.length = length;
    }

    public Float getWidth() {
        return width;
    }

    public void setWidth(Float width) {
        this.width = width;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOriginImage() {
        return originImage;
    }

    public void setOriginImage(String originImage) {
        this.originImage = originImage;
    }

    public String getDamagesImage() {
        return damagesImage;
    }

    public void setDamagesImage(String damagesImage) {
        this.damagesImage = damagesImage;
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

        InvoiceDetailsDTO invoiceDetailsDTO = (InvoiceDetailsDTO) o;
        if (invoiceDetailsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), invoiceDetailsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InvoiceDetailsDTO{" +
            "id=" + getId() +
            ", invoiceHeaderId=" + getInvoiceHeaderId() +
            ", itemName='" + getItemName() + "'" +
            ", itemType='" + getItemType() + "'" +
            ", weight=" + getWeight() +
            ", height=" + getHeight() +
            ", length=" + getLength() +
            ", width=" + getWidth() +
            ", description='" + getDescription() + "'" +
            ", originImage='" + getOriginImage() + "'" +
            ", damagesImage='" + getDamagesImage() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
