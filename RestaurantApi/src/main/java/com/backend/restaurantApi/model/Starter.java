package com.backend.restaurantApi.model;

import javax.persistence.*;

@Entity
@Table
public class Starter {

    @Id
    @Column(name = "starterId", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dishAllergies_id", nullable = false)
    private DishAllergies dAllergies;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = true)
    private Order order;

    @Column(name = "dishName")
    private String dishName;

    @Column(name = "price")
    private double price;

    @Override
    public String toString() {
        return "Starter{" +
                "id=" + id +
                ", dishName='" + dishName + '\'' +
                ", price='" + price + '\'' +
                ", dAllergies='" + dAllergies + '\'' +
                ", order='" + order + '\'' +
                '}';
    }

    public Starter() {}

    public Starter(String dName, double price) {
        this.dishName = dName;
        this.price = price;
    }

    public Starter(String dName, double price, DishAllergies da) {
        this.dishName = dName;
        this.price = price;
        this.dAllergies = da;
    }

    public Starter(String dName, double price, DishAllergies da, Order order) {
        this.dishName = dName;
        this.price = price;
        this.dAllergies = da;
        this.order = order;
    }

    public Starter(String dName, double price, Order order) {
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