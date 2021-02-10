package com.backend.restaurantApi.model;

/**
 * A class for storing a menu item.
 * It is be used in the menu-filtering queries.
 */
public class MenuItem {

    /**
     * Stores the id value of a menu item.
     */
    private long id;

    /**
     * Stores the name value of a menu item.
     */
    private String name;

    /**
     * Stores the price value of a menu item.
     */
    private double price;

    /**
     * Creates a new menu item.
     * @param id the new item's id
     * @param name the new item's name
     * @param price the new item's price
     */
    public MenuItem(long id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    /**
     * Returns the item id.
     * @return the id
     */
    public long getId() {
        return this.id;
    }

    /**
     * Returns the item name.
     * @return the name
     */
    public String getName() {
        return this.name;
    }

    /**
     * Returns the item price
     * @return price
     */
    public double getPrice() {
        return this.price;
    }
}
