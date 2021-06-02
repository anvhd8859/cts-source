package com.fu.capstone.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SubDistrict.
 */
@Entity
@Table(name = "sub_district")
@NamedNativeQueries(value = {
	@NamedNativeQuery(name = "get-all-sub_district", query = "SELECT id, sub_district_name AS subDistrictName FROM sub_district", resultSetMapping = "sub_district"),
	@NamedNativeQuery(name = "get-sub_district-by", query = "SELECT sd.id, sd.sub_district_name AS subDistrictName FROM sub_district sd, district d WHERE sd.district_id_id = d.id AND d.id = :id", resultSetMapping = "sub_district")
})
@SqlResultSetMapping(name = "sub_district", classes = @ConstructorResult(columns = {
		@ColumnResult(name = "id", type = Long.class),
		@ColumnResult(name = "subDistrictName", type = String.class) }, targetClass = SubDistrict.class))
public class SubDistrict implements Serializable {

	public SubDistrict() {

	}

	public SubDistrict(Long id, String subDistrictName) {
		setId(id);
		setSubDistrictName(subDistrictName);
	}

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "sub_district_name")
	private String subDistrictName;

	@Column(name = "create_date")
	private Instant createDate;

	@Column(name = "update_date")
	private Instant updateDate;

	@OneToMany(mappedBy = "subDistrictId", fetch = FetchType.LAZY)
	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private Set<Street> streets = new HashSet<>();
	@ManyToOne
	@JsonIgnoreProperties("subDistricts")
	private District districtId;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSubDistrictName() {
		return subDistrictName;
	}

	public SubDistrict subDistrictName(String subDistrictName) {
		this.subDistrictName = subDistrictName;
		return this;
	}

	public void setSubDistrictName(String subDistrictName) {
		this.subDistrictName = subDistrictName;
	}

	public Instant getCreateDate() {
		return createDate;
	}

	public SubDistrict createDate(Instant createDate) {
		this.createDate = createDate;
		return this;
	}

	public void setCreateDate(Instant createDate) {
		this.createDate = createDate;
	}

	public Instant getUpdateDate() {
		return updateDate;
	}

	public SubDistrict updateDate(Instant updateDate) {
		this.updateDate = updateDate;
		return this;
	}

	public void setUpdateDate(Instant updateDate) {
		this.updateDate = updateDate;
	}

	public Set<Street> getStreets() {
		return streets;
	}

	public SubDistrict streets(Set<Street> streets) {
		this.streets = streets;
		return this;
	}

	public SubDistrict addStreet(Street street) {
		this.streets.add(street);
		street.setSubDistrictId(this);
		return this;
	}

	public SubDistrict removeStreet(Street street) {
		this.streets.remove(street);
		street.setSubDistrictId(null);
		return this;
	}

	public void setStreets(Set<Street> streets) {
		this.streets = streets;
	}

	public District getDistrictId() {
		return districtId;
	}

	public SubDistrict districtId(District district) {
		this.districtId = district;
		return this;
	}

	public void setDistrictId(District district) {
		this.districtId = district;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters
	// and setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		SubDistrict subDistrict = (SubDistrict) o;
		if (subDistrict.getId() == null || getId() == null) {
			return false;
		}
		return Objects.equals(getId(), subDistrict.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(getId());
	}

	@Override
	public String toString() {
		return "SubDistrict{" + 
			"id=" + getId() + 
			", subDistrictName='" + getSubDistrictName() + "'" + 
			", createDate='" + getCreateDate() + "'" + 
			", updateDate='" + getUpdateDate() + "'" + 
			", streets='" + getStreets() + "'" + 
			"}";
	}
}
