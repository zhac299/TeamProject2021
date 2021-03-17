package com.backend.restaurantApi.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

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

	@JsonManagedReference(value = "staff_table")
	@Column
	@OneToMany(mappedBy = "staff")
	private List<RestaurantTable> tables;

// used to serialize object to json
	@Override
	public String toString() {
		return "Staff{" + "id=" + id + ", userName='" + userName + '\'' + ", password='" + password + '\'' + ", email='"
				+ email + '\'' + ", isWaiter='" + isWaiter + '\'' + '}';
	}

	public Staff() {
	}

	public Staff(long id, String userName, String password, String email, boolean isWaiter, List<RestaurantTable> tables) {
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.email = email;
		this.isWaiter = isWaiter;
		this.tables = tables;
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

	public List<RestaurantTable> getTables() {
		return tables;
	}

	public void setTables(List<RestaurantTable> tables) {
		this.tables = tables;
	}
}
