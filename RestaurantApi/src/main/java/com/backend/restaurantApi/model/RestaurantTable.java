package com.backend.restaurantApi.model;

import javax.persistence.*;

@Entity
@Table(name = "restaurant_table")
public class RestaurantTable {
    
    @Id
    @Column(name = "tableNumber", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "needsHelp", nullable = false)
    private boolean needsHelp;

    @Column(name = "isOccupied", nullable = false)
    private boolean isOccupied;

    public int getID() {
        return this.id;
    }

    public boolean getNeedsHelp() {
        return this.needsHelp;
    }

    public boolean getIsOccupied() {
        return this.isOccupied;
    }

    public void setID(int newID) {
        this.id = newID;
    }

    public void setNeedsHelp(boolean needsHelp) {
        this.needsHelp = needsHelp;
    }

    public void setIsOccupied(boolean isOccupied) {
        this.isOccupied = isOccupied;
    }
}
