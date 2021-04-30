package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A InvoiceDetails.
 */
@Entity
@Table(name = "invoice_details")
public class InvoiceDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "invoice_header_id")
    private Long invoiceHeaderId;

    @Column(name = "invoice_package_id")
    private Long invoicePackageId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_type")
    private String itemType;

    @Column(name = "weight")
    private Float weight;

    @Column(name = "height")
    private Float height;

    @Column(name = "length")
    private Float length;

    @Column(name = "width")
    private Float width;

    @Column(name = "description")
    private String description;

    @Column(name = "origin_image")
    private String originImage;

    @Column(name = "damages_image")
    private String damagesImage;

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

    public InvoiceDetails invoiceHeaderId(Long invoiceHeaderId) {
        this.invoiceHeaderId = invoiceHeaderId;
        return this;
    }

    public void setInvoiceHeaderId(Long invoiceHeaderId) {
        this.invoiceHeaderId = invoiceHeaderId;
    }

    public String getItemName() {
        return itemName;
    }

    public InvoiceDetails itemName(String itemName) {
        this.itemName = itemName;
        return this;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemType() {
        return itemType;
    }

    public InvoiceDetails itemType(String itemType) {
        this.itemType = itemType;
        return this;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public Float getWeight() {
        return weight;
    }

    public InvoiceDetails weight(Float weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public Float getHeight() {
        return height;
    }

    public InvoiceDetails height(Float height) {
        this.height = height;
        return this;
    }

    public void setHeight(Float height) {
        this.height = height;
    }

    public Float getLength() {
        return length;
    }

    public InvoiceDetails length(Float length) {
        this.length = length;
        return this;
    }

    public void setLength(Float length) {
        this.length = length;
    }

    public Float getWidth() {
        return width;
    }

    public InvoiceDetails width(Float width) {
        this.width = width;
        return this;
    }

    public void setWidth(Float width) {
        this.width = width;
    }

    public String getDescription() {
        return description;
    }

    public InvoiceDetails description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOriginImage() {
        return originImage;
    }

    public InvoiceDetails originImage(String originImage) {
        this.originImage = originImage;
        return this;
    }

    public void setOriginImage(String originImage) {
        this.originImage = originImage;
    }

    public String getDamagesImage() {
        return damagesImage;
    }

    public InvoiceDetails damagesImage(String damagesImage) {
        this.damagesImage = damagesImage;
        return this;
    }

    public Long getInvoicePackageId() {
		return invoicePackageId;
	}

	public void setInvoicePackageId(Long invoicePackageId) {
		this.invoicePackageId = invoicePackageId;
	}

	public void setDamagesImage(String damagesImage) {
        this.damagesImage = damagesImage;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public InvoiceDetails createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public InvoiceDetails updateDate(Instant updateDate) {
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
        InvoiceDetails invoiceDetails = (InvoiceDetails) o;
        if (invoiceDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), invoiceDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InvoiceDetails{" +
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
