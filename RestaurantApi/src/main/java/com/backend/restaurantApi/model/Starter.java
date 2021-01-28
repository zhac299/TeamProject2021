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
    @Column(name = "starterId", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dishAllergies_id", nullable = false)
    private DishAllergies dAllergies;

    @Column(name = "dishName")
    private String dishName;

    @Column(name = "price")
    private int price;


    @Override
    public String toString() {
        return "Starter{" +
                "id=" + id +
                ", dishName='" + dishName + '\'' +
                ", price='" + price + '\'' +
                '}';
    }
}