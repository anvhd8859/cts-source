package com.fu.capstone.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A District.
 */
@Entity
@Table(name = "district")
public class District implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "district_name")
    private String districtName;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "update_date")
    private Instant updateDate;

    @OneToMany(mappedBy = "districtId",  fetch = FetchType.EAGER)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<SubDistrict> subDistricts = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("districts")
    private Province provinceId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDistrictName() {
        return districtName;
    }

    public District districtName(String districtName) {
        this.districtName = districtName;
        return this;
    }

    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public District createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public District updateDate(Instant updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public void setUpdateDate(Instant updateDate) {
        this.updateDate = updateDate;
    }

    public Set<SubDistrict> getSubDistricts() {
        return subDistricts;
    }

    public District subDistricts(Set<SubDistrict> subDistricts) {
        this.subDistricts = subDistricts;
        return this;
    }

    public District addSubDistrict(SubDistrict subDistrict) {
        this.subDistricts.add(subDistrict);
        subDistrict.setDistrictId(this);
        return this;
    }

    public District removeSubDistrict(SubDistrict subDistrict) {
        this.subDistricts.remove(subDistrict);
        subDistrict.setDistrictId(null);
        return this;
    }

    public void setSubDistricts(Set<SubDistrict> subDistricts) {
        this.subDistricts = subDistricts;
    }

    public Province getProvinceId() {
        return provinceId;
    }

    public District provinceId(Province province) {
        this.provinceId = province;
        return this;
    }

    public void setProvinceId(Province province) {
        this.provinceId = province;
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
        District district = (District) o;
        if (district.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), district.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "District{" +
            "id=" + getId() +
            ", districtName='" + getDistrictName() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            ", subDistrict='" + getSubDistricts() + "'" +
            "}";
    }
}
