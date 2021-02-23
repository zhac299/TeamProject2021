package com.backend.restaurantApi.model;

import javax.persistence.*;

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
    private boolean needsHelp;

    /**
     * A column of the table that tells if a table is occupied or not.
     */
    @Column(name = "isOccupied", nullable = false)
    private boolean isOccupied;

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
     * Returns A Jason object containing all the tables details.
     */
    @Override
    public String toString() {
        return "RestaurantTables{" +
            "tableNumber='" + this.tableNumber +
            ", needsHelp='" + this.tableNumber + '\'' +
            ", IsOccupied='" + this.isOccupied + '\'' +
            '}';
    }
}