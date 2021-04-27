package com.fu.capstone.service.dto;

import com.fu.capstone.domain.UserProfile;

public class CustomUserDTO {

	private UserDTO user;
	
	private UserProfile profile;

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public UserProfile getProfile() {
		return profile;
	}

	public void setProfile(UserProfile profile) {
		this.profile = profile;
	}
	
	
}
