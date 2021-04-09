package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Shift.
 */
@Entity
@Table(name = "shift")
public class Shift implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shift_name")
    private String shiftName;

    @Column(name = "start_hour")
    private Integer startHour;

    @Column(name = "start_minute")
    private Integer startMinute;

    @Column(name = "end_hour")
    private Integer endHour;

    @Column(name = "end_minute")
    private Integer endMinute;

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

    public String getShiftName() {
        return shiftName;
    }

    public Shift shiftName(String shiftName) {
        this.shiftName = shiftName;
        return this;
    }

    public void setShiftName(String shiftName) {
        this.shiftName = shiftName;
    }

    public Integer getStartHour() {
        return startHour;
    }

    public Shift startHour(Integer startHour) {
        this.startHour = startHour;
        return this;
    }

    public void setStartHour(Integer startHour) {
        this.startHour = startHour;
    }

    public Integer getStartMinute() {
        return startMinute;
    }

    public Shift startMinute(Integer startMinute) {
        this.startMinute = startMinute;
        return this;
    }

    public void setStartMinute(Integer startMinute) {
        this.startMinute = startMinute;
    }

    public Integer getEndHour() {
        return endHour;
    }

    public Shift endHour(Integer endHour) {
        this.endHour = endHour;
        return this;
    }

    public void setEndHour(Integer endHour) {
        this.endHour = endHour;
    }

    public Integer getEndMinute() {
        return endMinute;
    }

    public Shift endMinute(Integer endMinute) {
        this.endMinute = endMinute;
        return this;
    }

    public void setEndMinute(Integer endMinute) {
        this.endMinute = endMinute;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Shift createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public Shift updateDate(Instant updateDate) {
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
        Shift shift = (Shift) o;
        if (shift.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shift.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Shift{" +
            "id=" + getId() +
            ", shiftName='" + getShiftName() + "'" +
            ", startHour=" + getStartHour() +
            ", startMinute=" + getStartMinute() +
            ", endHour=" + getEndHour() +
            ", endMinute=" + getEndMinute() +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
