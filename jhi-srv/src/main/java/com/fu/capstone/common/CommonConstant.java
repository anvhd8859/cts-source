package com.fu.capstone.common;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CommonConstant {
	
	public static class InvoiceHeaderConstant {
		
		public final static Map<String, String> STATUS = Stream.of(new String[][] {
			  { "waiting", "Chờ xử lý" }, 
			  { "collect", "Chờ nhân viên lấy hàng" }, 
			  { "receive", "Chờ khách giao hàng" }, 
			  { "collected", "Nhân viên đã lấy hàng, chờ khách xác nhận" }, 
			  { "first_import", "Nhập kho chi nhánh đầu" }, 
			  { "transporting", "Đang vận chuyển" }, 
			  { "last_import", "Nhập kho chi nhánh cuối" }, 
			  { "delivering", "Đang giao hàng" }, 
			  { "fail_num", "Giao hàng không thành công lần: " }, 
			  { "finish", "Giao hàng thành công" }, 
			}).collect(Collectors.toMap(data -> data[0], data -> data[1]));
		
		public final static Map<String, String> TYPE = Stream.of(new String[][] {
			  { "personal_trasnfer", "Giao hàng cá nhân" }, 
			}).collect(Collectors.toMap(data -> data[0], data -> data[1]));
	}

	public static class PersonalShipmentConstant {

		public final static Map<String, String> STATUS = Stream.of(new String[][] {
			  { "collecting", "Chờ nhân viên lấy hàng" }, 
			  { "delivering", "Chờ khách giao hàng" }, 
			  { "finish", "Hoàn thành" }, 
			}).collect(Collectors.toMap(data -> data[0], data -> data[1]));
		
		public final static Map<String, String> TYPE = Stream.of(new String[][] {
			  { "collect", "Lấy hàng" }, 
			  { "delivery", "Giao hàng" }, 
			}).collect(Collectors.toMap(data -> data[0], data -> data[1]));
	}

	public static class InvoicePackageConstant {

		public final static Map<String, String> STATUS = Stream.of(new String[][] {
			  { "new", "Tạo mới" }, 
			  { "first_import", "Nhập kho chi nhánh đầu" }, 
			  { "transporting", "Đang vận chuyển" }, 
			  { "last_import", "Nhập kho chi nhánh cuối" }, 
			  { "finish", "Giao thành công" }, 
			}).collect(Collectors.toMap(data -> data[0], data -> data[1]));
	}

	public static class PaymentConstant {

		public final static Map<String, String> TYPE = Stream.of(new String[][] {
			  { "cash", "Tiền mặt" }, 
			  { "bank_trasnfer", "Chuyển khoản" }, 
			}).collect(Collectors.toMap(data -> data[0], data -> data[1]));
	}
}
