package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Model which contains and handles the data for Staff members.
 */
@Getter
@Setter
@Entity
@Table
public class Staff {

	/**
	 * The primary key of the table.
	 */
	@Id
	@Column(name = "id", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	/**
	 * The username of the member of Staff.
	 */
	@Column(name = "userName")
	private String userName;

	/**
	 * The password of the member of Staff.
	 */
	@Column(name = "password")
	private String password;

	/**
	 * The email of the member of Staff.
	 */
	@Column(name = "email")
	private String email;

	/**
	 * Gives Staff member a position. Used to check if Staff is Waiter or Kitchen Staff.
	 */
	@Column(name = "isWaiter")
	private boolean isWaiter;

	/**
	 * Used to identify if member of Staff is a Manager or not.
	 */
	@Column(name = "isManager")
	private boolean isManager = false;

	/**
	 * Used to show data in a more readable format like a JSON.
	 */
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

	/**
	 * The default constructor.
	 */
	public Staff() {
	}

	/**
	 * Staff constructor to make a staff object.
	 * @param id of staff object.
	 * @param userName of staff object.
	 * @param password of staff object.
	 * @param email of staff object.
	 * @param isWaiter of staff object.
	 * @param isManager of staff object.
	 */
	public Staff(long id, String userName, String password, String email, boolean isWaiter, boolean isManager) {
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.email = email;
		this.isWaiter = isWaiter;
		this.isManager = isManager;
	}

	/**
	 * Getter for id.
	 * @return id.
	 */
	public long getId() {
		return id;
	}

	/**
	 * Setter for id.
	 * @param id to set to.
	 */
	public void setId(long id) {
		this.id = id;
	}

	/**
	 * Getter for username.
	 * @return the username.
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * Setter for the username.
	 * @param userName to set to.
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * Getter for the password.
	 * @return the password.
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Setter for password.
	 * @param password to set to.
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * Getter for email.
	 * @return email in String format.
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Setter for the email.
	 * @param email to set to.
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Checks if staff is waiter.
	 * @return boolean representation.
	 */
	public boolean isWaiter() {
		return isWaiter;
	}

	/**
	 * Setter for isWaiter.
	 * @param isWaiter to set to.
	 */
	public void setWaiter(boolean isWaiter) {
		this.isWaiter = isWaiter;
	}

	/**
	 * Checks if staff is manager.
	 * @return boolean representation of it the staff is waiter or not.
	 */
	public boolean isManager() {
		return this.isManager;
	}

	/**
	 * Setter for the is Manager.
	 * @param isManager to set to.
	 */
	public void setIsManager(boolean isManager) {
		this.isManager = isManager;
	}
}
