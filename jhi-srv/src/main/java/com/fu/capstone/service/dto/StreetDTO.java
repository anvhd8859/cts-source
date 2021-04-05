package com.fu.capstone.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * A DTO for the Street entity.
 */

public class StreetDTO implements Serializable {

    private Long id;

    private String streetName;

    private Instant createDate;

    private Instant updateDate;

    @JsonInclude(Include.NON_NULL)
    private Long subDistrictIdId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
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

    public Long getSubDistrictIdId() {
        return subDistrictIdId;
    }

    public void setSubDistrictIdId(Long subDistrictId) {
        this.subDistrictIdId = subDistrictId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StreetDTO streetDTO = (StreetDTO) o;
        if (streetDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), streetDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StreetDTO{" +
            "id=" + getId() +
            ", streetName='" + getStreetName() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
//  ", subDistrictId=" + getSubDistrictIdId() +
}
