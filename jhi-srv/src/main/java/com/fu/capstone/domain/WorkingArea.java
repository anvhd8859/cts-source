package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A WorkingArea.
 */
@Entity
@Table(name = "working_area")
public class WorkingArea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "street_id")
    private Long streetId;

    @Column(name = "employee_id")
    private Long employeeId;

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

    public Long getStreetId() {
        return streetId;
    }

    public WorkingArea streetId(Long streetId) {
        this.streetId = streetId;
        return this;
    }

    public void setStreetId(Long streetId) {
        this.streetId = streetId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public WorkingArea employeeId(Long employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public WorkingArea createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public WorkingArea updateDate(Instant updateDate) {
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
        WorkingArea workingArea = (WorkingArea) o;
        if (workingArea.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), workingArea.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WorkingArea{" +
            "id=" + getId() +
            ", streetId=" + getStreetId() +
            ", employeeId=" + getEmployeeId() +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
