package com.fu.capstone.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Street.
 */
@Entity
@Table(name="street")
@NamedNativeQuery(
	name = "get_sub_district_id",
	query =
	  "SELECT id, street_name, create_date , update_date" + 
	  " FROM street WHERE sub_district_id_id = :subDistrictId",
	resultClass = Street.class
)
public class Street implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "street_name")
    private String streetName;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "update_date")
    private Instant updateDate;

    @ManyToOne
    @JsonIgnoreProperties("streets")
    private SubDistrict subDistrictId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreetName() {
        return streetName;
    }

    public Street streetName(String streetName) {
        this.streetName = streetName;
        return this;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Street createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public Street updateDate(Instant updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public void setUpdateDate(Instant updateDate) {
        this.updateDate = updateDate;
    }

    public SubDistrict getSubDistrictId() {
        return subDistrictId;
    }

    public Street subDistrictId(SubDistrict subDistrict) {
        this.subDistrictId = subDistrict;
        return this;
    }

    public void setSubDistrictId(SubDistrict subDistrict) {
        this.subDistrictId = subDistrict;
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
        Street street = (Street) o;
        if (street.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), street.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Street{" +
            "id=" + getId() +
            ", streetName='" + getStreetName() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
