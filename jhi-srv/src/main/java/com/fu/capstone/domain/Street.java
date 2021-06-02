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
	name = "get-street-by-param",
	query = "SELECT s.id AS id, s.street_name AS streetName FROM street s, sub_district sd, district d, province p "
			  + " WHERE s.sub_district_id_id = sd.id "
			  + " AND sd.district_id_id = d.id "
			  + " AND d.province_id_id = p.id "
			  + " AND ( s.id = :strId OR :strId IS NULL ) "
			  + " AND ( sd.id = :sdtId OR :sdtId IS NULL ) "
			  + " AND ( d.id = :dstId OR :dstId IS NULL ) "
			  + " AND ( p.id = :prvId OR :prvId IS NULL ) ",
			  resultSetMapping = "street"
)
@NamedNativeQueries(value = {
		@NamedNativeQuery(name = "get-all-street", query = "SELECT id, street_name AS streetName FROM street", resultSetMapping = "street"),
		@NamedNativeQuery(name = "get-street-by", query = "SELECT s.id, s.street_name AS streetName FROM street s, sub_district sd WHERE s.sub_district_id_id = sd.id AND sd.id = :id", resultSetMapping = "street")
	})
	@SqlResultSetMapping(name = "street", classes = @ConstructorResult(columns = {
			@ColumnResult(name = "id", type = Long.class),
			@ColumnResult(name = "streetName", type = String.class) }, targetClass = Street.class))
public class Street implements Serializable {
	
    public Street() {
	}

	public Street(Long id, String streetName) {
		this.id = id;
		this.streetName = streetName;
	}

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
