package com.fu.capstone.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Province.
 */
@Entity
@Table(name = "province")
@NamedNativeQuery(name = "get-all-province", query = "SELECT id, province_name AS provinceName FROM province", resultSetMapping = "province")
@SqlResultSetMapping(name = "province", classes = @ConstructorResult(columns = {
		@ColumnResult(name = "id", type = Long.class),
		@ColumnResult(name = "provinceName", type = String.class) }, targetClass = Province.class))
public class Province implements Serializable {
	
	public Province() {
	}
	
	public Province(Long id, String provinceName) {
		this.id = id;
		this.provinceName = provinceName;
	}

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "province_name")
    private String provinceName;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "update_date")
    private Instant updateDate;

    @OneToMany(mappedBy = "provinceId", fetch = FetchType.EAGER)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<District> districts = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public Province provinceName(String provinceName) {
        this.provinceName = provinceName;
        return this;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Province createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public Province updateDate(Instant updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public void setUpdateDate(Instant updateDate) {
        this.updateDate = updateDate;
    }

    public Set<District> getDistricts() {
        return districts;
    }

    public Province districts(Set<District> districts) {
        this.districts = districts;
        return this;
    }

    public Province addDistrict(District district) {
        this.districts.add(district);
        district.setProvinceId(this);
        return this;
    }

    public Province removeDistrict(District district) {
        this.districts.remove(district);
        district.setProvinceId(null);
        return this;
    }

    public void setDistricts(Set<District> districts) {
        this.districts = districts;
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
        Province province = (Province) o;
        if (province.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), province.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Province{" +
            "id=" + getId() +
            ", provinceName='" + getProvinceName() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            "}";
    }
}
