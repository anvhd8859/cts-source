package com.fu.capstone.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * A DTO for the SubDistrict entity.
 */
public class SubDistrictDTO implements Serializable {

    private Long id;

    private String subDistrictName;

    @JsonInclude(Include.NON_NULL)
    private Instant createDate;

    @JsonInclude(Include.NON_NULL)
    private Instant updateDate;

    @JsonInclude(Include.NON_NULL)
    private Long districtIdId;
    
    @JsonInclude(Include.NON_NULL)
    private Set<StreetDTO> streets = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubDistrictName() {
        return subDistrictName;
    }

    public void setSubDistrictName(String subDistrictName) {
        this.subDistrictName = subDistrictName;
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

    public Long getDistrictIdId() {
        return districtIdId;
    }

    public void setDistrictIdId(Long districtId) {
        this.districtIdId = districtId;
    }

    public Set<StreetDTO> getStreets() {
		return streets;
	}

	public void setStreets(Set<StreetDTO> streets) {
		this.streets = streets;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SubDistrictDTO subDistrictDTO = (SubDistrictDTO) o;
        if (subDistrictDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subDistrictDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubDistrictDTO{" +
            "id=" + getId() +
            ", subDistrictName='" + getSubDistrictName() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
//            ", districtId=" + getDistrictIdId() +
			", streets='" + getStreets() + "'" +
            "}";
    }
}
