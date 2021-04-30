package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

public class PackageDetailsDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private InvoicePackageDTO invPackage;

	private List<InvoiceDetailsDTO> itemList;

	public InvoicePackageDTO getInvPackage() {
		return invPackage;
	}

	public void setInvPackage(InvoicePackageDTO invPackage) {
		this.invPackage = invPackage;
	}

	public List<InvoiceDetailsDTO> getItemList() {
		return itemList;
	}

	public void setItemList(List<InvoiceDetailsDTO> itemList) {
		this.itemList = itemList;
	}
}
