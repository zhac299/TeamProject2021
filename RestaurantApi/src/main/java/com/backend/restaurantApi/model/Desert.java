package com.backend.restaurantApi.model;

import javax.persistence.*;

@Entity
@Table
public class Desert {

    @Id
    @Column(name = "desertId", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dishAllergies_id", nullable = true)
    private DishAllergies dAllergies;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = true)
    private Order order;

    @Column(name = "dishName")
    private String dishName;

    @Column(name = "price")
    private double price;

    // used to serialize object to json
    @Override
    public String toString() {
        return "Desert{" +
                "id=" + id +
                ", price='" + price + '\'' +
                ", dAllergies='" + dAllergies + '\'' +
                ", order='" + order + '\'' +
                '}';
    }

    public Desert() {}

    public Desert(String dName, double price) {
        this.dishName = dName;
        this.price = price;
    }

    public Desert(String dName, double price, DishAllergies da) {
        this.dishName = dName;
        this.price = price;
        this.dAllergies = da;
    }

    public Desert(String dName, double price, DishAllergies da, Order order) {
        this.dishName = dName;
        this.price = price;
        this.dAllergies = da;
        this.order = order;
    }

    public Desert(String dName, double price, Order order) {
        this.dishName = dName;
        this.price = price;
        this.order = order;
    }

    public String getDishName() {
        return this.dishName;
    }
    
    public long getId() {
        return this.id;
    }

    public double getPrice() {
        return this.price;
    }

    public Order getOrder() {
        return this.order;
    }
}