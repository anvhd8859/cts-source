package com.fu.capstone.service.dto;

import java.io.Serializable;
import java.util.List;

import com.fu.capstone.domain.ReceiptNote;

public class ReceiptDetailPackageDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private ReceiptNote receipt;

	private List<PackageDetailsDTO> packageList;
	
	private Boolean pay;
	
	private String payAmount;

	public List<PackageDetailsDTO> getPackageList() {
		return packageList;
	}

	public void setPackageList(List<PackageDetailsDTO> packageList) {
		this.packageList = packageList;
	}

	public ReceiptNote getReceipt() {
		return receipt;
	}

	public void setReceipt(ReceiptNote receipt) {
		this.receipt = receipt;
	}

	public Boolean getPay() {
		return pay;
	}

	public void setPay(Boolean pay) {
		this.pay = pay;
	}

	public String getPayAmount() {
		return payAmount;
	}

	public void setPayAmount(String payAmount) {
		this.payAmount = payAmount;
	}
}
