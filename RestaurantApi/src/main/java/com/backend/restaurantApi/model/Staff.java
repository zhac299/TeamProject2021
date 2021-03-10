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

// used to serialize object to json
	@Override
	public String toString() {
		return "Staff{" + "id=" + id + ", userName='" + userName + '\'' + ", password='" + password + '\'' + ", email='"
				+ email + '\'' + ", isWaiter='" + isWaiter + '\'' + '}';
	}

	public Staff() {
	}

	public Staff(String userName, String password, String email, boolean isWaiter) {
		this.userName = userName;
		this.password = password;
		this.email = email;
		this.isWaiter = isWaiter;
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

}
