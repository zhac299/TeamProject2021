package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table
public class Staff {

	@Id
	@Column(name = "id", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "userName")
	private String userName;

	@Column(name = "password")
	private String password;

	@Column(name = "email")
	private String email;

	@Column(name = "isWaiter")
	private boolean isWaiter;

	@Column(name = "isManager")
	private boolean isManager;

	@Override
	public String toString() {
		return "{" +
			" id='" + getId() + "'" +
			", userName='" + getUserName() + "'" +
			", password='" + getPassword() + "'" +
			", email='" + getEmail() + "'" +
			", isWaiter='" + isWaiter() + "'" +
			", isManager='" + isManager() + "'" +
			"}";
	}	

	public Staff() {
	}

	public Staff(long id, String userName, String password, String email, boolean isWaiter, boolean isManager) {
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.email = email;
		this.isWaiter = isWaiter;
		this.isManager = isManager;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isWaiter() {
		return isWaiter;
	}

	public void setWaiter(boolean isWaiter) {
		this.isWaiter = isWaiter;
	}

	public boolean isManager() {
		return this.isManager;
	}

	public void setIsManager(boolean isManager) {
		this.isManager = isManager;
	}
}
