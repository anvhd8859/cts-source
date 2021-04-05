package com.fu.capstone.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fu.capstone.domain.SubDistrict;

/**
 * A DTO for the District entity.
 */
public class DistrictDTO implements Serializable {

    private Long id;

    private String districtName;

    private Instant createDate;

    private Instant updateDate;

    @JsonInclude(Include.NON_NULL)
    private Long provinceIdId;
    
    private Set<SubDistrictDTO> subDistricts = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDistrictName() {
        return districtName;
    }

    public void setDistrictName(String districtName) {
        this.districtName = districtName;
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

    public Long getProvinceIdId() {
        return provinceIdId;
    }

    public void setProvinceIdId(Long provinceId) {
        this.provinceIdId = provinceId;
    }
    
    public Set<SubDistrictDTO> getSubDistricts() {
		return subDistricts;
	}

	public void setSubDistricts(Set<SubDistrictDTO> subDistricts) {
		this.subDistricts = subDistricts;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DistrictDTO districtDTO = (DistrictDTO) o;
        if (districtDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), districtDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DistrictDTO{" +
            "id=" + getId() +
            ", districtName='" + getDistrictName() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
//            ", provinceId=" + getProvinceIdId() +
			", subDistrict='" + getSubDistricts() + "'" +            
            "}";
    }
}
