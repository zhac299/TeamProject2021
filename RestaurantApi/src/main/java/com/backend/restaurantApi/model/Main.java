package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table
public class Main {

    @Id
    @Column(name = "mainId", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dishAllergies_id", nullable = true)
    private DishAllergies dAllergies;

    @Column(name = "dishName")
    private String dishName;

    @Column(name = "price")
    private double price;

    // used to serialize object to json
    @Override
    public String toString() {
        return "Main{" +
                "id=" + id +
                ", dishName='" + dishName + '\'' +
                ", price='" + price + '\'' +
                ", dAllergies'" + dAllergies + '\'' +
                '}';
    }

    public Main() {}
//
//    public Main(String dName, double price) {
//        this.dishName = dName;
//        this.price = price;
//    }
//
//    public Main(String dName, double price, DishAllergies da) {
//        this.dishName = dName;
//        this.price = price;
//        this.dAllergies = da;
//    }
//
//    public String getDishName() {
//        return this.dishName;
//      }
//
//    public long getId() {
//        return this.id;
//    }
//
//    public double getPrice() {
//        return this.price;
//    }
}
