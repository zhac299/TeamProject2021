package com.backend.restaurantApi.model;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * Creates an SQL table that will handle the tables information.
 */
@Entity
@Table(name = "restaurant_table")
public class RestaurantTable {
    
    /**
     * The primary key of the table.
     * It represents the table number.
     */
    @Id
    @Column(name = "tableNumber", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tableNumber;

    /**
     * A column of the table that tells if a table needs help or not.
     */
    @Column(name = "needsHelp", nullable = false)
    private boolean needsHelp = false;

    /**
     * A column of the table that tells if a table is occupied or not.
     */
    @Column(name = "isOccupied", nullable = false)
    private boolean isOccupied;

    @Column(name = "isReady", nullable = false)
    private boolean isReady = false;

    @Column(name = "staff", nullable = false)
    private long waiterId;

	/**
     * A column that stores all the customers seated a table.
     */
    @JsonManagedReference(value = "restaurant_table")
    @Column(name = "customer", nullable = false)
    @OneToMany(cascade = CascadeType.ALL, mappedBy="table")
    private List<Customer> customer;

    /**
     * A getter for the private class field customer.
     * 
     * @return a list of customers seated at a table
     */
    public List<Customer> getCustomer() {
        return this.customer;
    }
   
    /**
     * Sets the customer list to a new one.
     * 
     * @param newCustomer the new customer list
     */
    public void setCustomer(List<Customer> newCustomer) {
        this.customer = newCustomer;
    }

    /**
     * A getter for the private class field tableNumber.
     * 
     * @return the table number
     */
    public long getTableNumber() {
        return this.tableNumber;
    }

    /**
     * A getter for the private clas field needsHelp.
     * 
     * @return the table needsHelp field
     */
    public boolean getNeedsHelp() {
        return this.needsHelp;
    }

    /**
     * A getter for the private class field isOccupied.
     * 
     * @return the table isOccupied field
     */
    public boolean getIsOccupied() {
        return this.isOccupied;
    }

    /**
     * Setter that updates the tableNumber with a new one.
     * 
     * @param newTableNumber the new table number
     */
    public void setTableNumber(long newTableNumber) {
        this.tableNumber = newTableNumber;
    }

    /**
     * Setter that updates the needsHelp field.
     * 
     * @param needsHelp the new needsHelp field
     */
    public void setNeedsHelp(boolean needsHelp) {
        this.needsHelp = needsHelp;
    }

    /**
     * Setter that updates the isOccupied field.
     * 
     * @param isOccupied the new isOccupied field
     */
    public void setIsOccupied(boolean isOccupied) {
        this.isOccupied = isOccupied;
    }
    
    
    /** 
     * Assigns the param value to the attribute isReady.
     * @param ready this indicates if a table is ready to place their order with the help of a waiter.
     */
    public void setReady(boolean ready) {
        isReady = ready;
    }

    
    /** 
     * Gets and returns the isReady attribute for a RestaurantTable entry.
     * @return a value indicating if a table is ready to order or not with the help of the waiter.
     */
    public boolean getIsReady() {
        return this.isReady;
    }

	
    /** 
     * Assigns the param value to the attribute isOccupied which indicates if a table is in use.
     * @param isOccupied the value which indicates if a table is in use or not.
     */
    public void setOccupied(boolean isOccupied) {
		this.isOccupied = isOccupied;
	}


    
    /** 
     * Gets and returns the waiterId attribute.
     * @return the attribute which indicates which waiter is responsible for that table.
     */
    public long getWaiterId() {
        return this.waiterId;
    }

    
    /** 
     * Assigns the param value to the attribute waiterId.
     * @param waiterId this value is the waiter who is being assigned to the table.
     */
    public void setWaiterId(long waiterId) {
        this.waiterId = waiterId;
    }

    /**
     * Returns A JSON object containing all the tables details.
     * 
     * @return the attributes of the RestaurantTable model in a more readable format.
     */
	@Override
	public String toString() {
		return "RestaurantTable [tableNumber=" + tableNumber + ", needsHelp=" + needsHelp + ", isOccupied=" + isOccupied
				+ ", isReady=" + isReady + ", customer=" + customer + "]";
	}
}