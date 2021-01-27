package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
public class Starter {

    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "dishName")
    private String dishName;

    @Column(name = "price")
    private int price;


    @Override
    public String toString() {
        return "Staff{" +
                "id=" + id +
                ", dishName='" + dishName + '\'' +
                ", price='" + price + '\'' +
                '}';
    }
}