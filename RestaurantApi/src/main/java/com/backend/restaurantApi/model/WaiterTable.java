package com.backend.restaurantApi.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Yuwarajj
 *
 */

@Getter
@Setter
@Entity
@Table
public class WaiterTable {

	@Id
	@Column(name = "id", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@JsonBackReference(value = "staff")
	@ManyToOne(cascade = CascadeType.ALL, optional = false)
	@JoinColumn(name = "staff", nullable = true)
	private Staff staff;

	@JsonBackReference(value = "waiter_table")
	@ManyToOne(cascade = CascadeType.ALL, optional = false)
	@JoinColumn(name = "restaurant_table", nullable = true)
	private RestaurantTable restaurantTable;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public RestaurantTable getRestaurantTable() {
		return restaurantTable;
	}

	public void setRestaurantTable(RestaurantTable restaurantTable) {
		this.restaurantTable = restaurantTable;
	}

	public Staff getStaff() {
		return staff;
	}

	public void setStaff(Staff staff) {
		this.staff = staff;
	}

	/**
	 * Returns A Jason object containing all the WaiterTable details.
	 */
	@Override
	public String toString() {
		return "WaiterTable [id=" + id + ", staff=" + staff + ", restaurantTable=" + restaurantTable + "]";
	}

}