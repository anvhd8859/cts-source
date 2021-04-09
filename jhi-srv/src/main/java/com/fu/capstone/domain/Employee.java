package com.fu.capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "person_id")
    private Long personId;

    @Column(name = "office_id")
    private Long officeId;

    @Column(name = "social_number")
    private String socialNumber;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "salary", precision = 10, scale = 2)
    private BigDecimal salary;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "manager_id")
    private Long managerId;

    @Column(name = "hire_date")
    private Instant hireDate;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

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

    public Long getPersonId() {
        return personId;
    }

    public Employee personId(Long personId) {
        this.personId = personId;
        return this;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public Long getOfficeId() {
        return officeId;
    }

    public Employee officeId(Long officeId) {
        this.officeId = officeId;
        return this;
    }

    public void setOfficeId(Long officeId) {
        this.officeId = officeId;
    }

    public String getSocialNumber() {
        return socialNumber;
    }

    public Employee socialNumber(String socialNumber) {
        this.socialNumber = socialNumber;
        return this;
    }

    public void setSocialNumber(String socialNumber) {
        this.socialNumber = socialNumber;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public Employee jobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
        return this;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public Employee salary(BigDecimal salary) {
        this.salary = salary;
        return this;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public Boolean isActive() {
        return active;
    }

    public Employee active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Long getManagerId() {
        return managerId;
    }

    public Employee managerId(Long managerId) {
        this.managerId = managerId;
        return this;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    public Instant getHireDate() {
        return hireDate;
    }

    public Employee hireDate(Instant hireDate) {
        this.hireDate = hireDate;
        return this;
    }

    public void setHireDate(Instant hireDate) {
        this.hireDate = hireDate;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Employee startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Employee endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Employee createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public Employee updateDate(Instant updateDate) {
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
        Employee employee = (Employee) o;
        if (employee.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employee.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", personId=" + getPersonId() +
            ", officeId=" + getOfficeId() +
            ", socialNumber='" + getSocialNumber() + "'" +
            ", jobTitle='" + getJobTitle() + "'" +
            ", salary=" + getSalary() +
            ", active='" + isActive() + "'" +
            ", managerId=" + getManagerId() +
            ", hireDate='" + getHireDate() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
