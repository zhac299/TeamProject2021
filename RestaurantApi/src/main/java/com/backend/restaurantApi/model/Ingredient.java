package com.backend.restaurantApi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Model which contains and handles the data for ingredients.
 */
@Entity
@Table
@JsonIgnoreProperties(value = { "ingredient" })
public class Ingredient {

	/**
	 * The primary key of the table.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	/**
	 * The name of the ingredient.
	 */
	@Column
	private String name;

	/**
	 * The number of quantity of the ingredient.
	 */
	@Column
	private Integer quantity;

	/**
	 * The price for a single ingredient.
	 */
	@Column
	private double pricePerItem;

	
	/** 
	 * Gets the Id for an ingredient
	 * @return the id of the ingredient
	 */
	public Long getId() {
		return id;
	}

	
	/** 
	 * Sets the id for an ingredient
	 * @param id the value the id being set to,
	 */
	public void setId(Long id) {
		this.id = id;
	}

	
	/** 
	 * Gets the name of the ingredient.
	 * @return the name of the ingredient.
	 */
	public String getName() {
		return name;
	}

	
	/** 
	 * Sets the name to the value in the parameters.
	 * @param name the value the name is being set to.
	 */
	public void setName(String name) {
		this.name = name;
	}

	
	/** 
	 * Gets the quantity of the ingredient.
	 * @return the quantity of the ingredient.
	 */
	public Integer getQuantity() {
		return quantity;
	}

	
	/** 
	 * Assigns a value to the quantity variable to the value passed in the parameters.
	 * @param quantity the value quantity is being set to.
	 */
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	
	/** 
	 * Gets the price for one of the ingredient.
	 * @return the price of a single of the ingredient.
	 */
	public double getPricePerItem() {
		return this.pricePerItem;
	}

	
	/** 
	 * Sets the price for a single of an ingredient.
	 * @param newPrice the price being set for a ingredient.
	 */
	public void setPricePerItem(double newPrice) {
		this.pricePerItem = newPrice;
	}
}
