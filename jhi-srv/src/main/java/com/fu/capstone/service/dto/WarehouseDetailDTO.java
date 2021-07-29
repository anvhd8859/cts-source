package com.fu.capstone.service.dto;

public class WarehouseDetailDTO {

	private WarehouseDTO warehouseDTO;

	private String officeName;

	public WarehouseDTO getWarehouseDTO() {
		return warehouseDTO;
	}

	public void setWarehouseDTO(WarehouseDTO warehouselDTO) {
		this.warehouseDTO = warehouselDTO;
	}

	public String getOfficeName() {
		return officeName;
	}

	public void setOfficeName(String officeName) {
		this.officeName = officeName;
	}
}
