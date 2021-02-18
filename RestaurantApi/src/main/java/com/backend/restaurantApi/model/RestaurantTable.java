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
    private int id;

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
     * A getter for the private class field id.
     * 
     * @return the table id
     */
    public int getID() {
        return this.id;
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
     * A getter for the private class field isOccupied
     * 
     * @return the table isOccupied field
     */
    public boolean getIsOccupied() {
        return this.isOccupied;
    }

    /**
     * Setter that updates the id with a new one
     * 
     * @param newID the new id
     */
    public void setID(int newID) {
        this.id = newID;
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
}
