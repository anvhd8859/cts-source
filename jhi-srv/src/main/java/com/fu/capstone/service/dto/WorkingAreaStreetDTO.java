package com.fu.capstone.service.dto;

import java.io.Serializable;

public class WorkingAreaStreetDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private WorkingAreaDTO workingArea;
	
	private String streetName;

	public WorkingAreaDTO getWorkingArea() {
		return workingArea;
	}

	public void setWorkingArea(WorkingAreaDTO workingArea) {
		this.workingArea = workingArea;
	}

	public String getStreetName() {
		return streetName;
	}

	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}
	
	
    
}
