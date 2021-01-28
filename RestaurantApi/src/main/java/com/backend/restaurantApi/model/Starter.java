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

    @Column(name = "dishName")
    private String dishName;

    @Column(name = "price")
    private float price;

    @Override
    public String toString() {
        return "Starter{" +
                "id=" + id +
                ", dishName='" + dishName + '\'' +
                ", price='" + price + '\'' +
                ", dAllergies'" + dAllergies + '\'' +
                '}';
    }

    public Starter(String dName, float price) {
        this.dishName = dName;
        this.price = price;
    }

    public Starter(String dName, float price, DishAllergies da) {
        this.dishName = dName;
        this.price = price;
        this.dAllergies = da;
    }

    public String getDishName() {
        return this.dishName;
    }
    
    public long getId() {
        return this.id;
    }

    public float getPrice() {
        return this.price;
    }
}