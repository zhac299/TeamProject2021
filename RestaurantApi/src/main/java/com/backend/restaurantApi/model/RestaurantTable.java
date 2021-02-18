package com.backend.restaurantApi.model;

import javax.persistence.*;

@Entity
@Table(name = "restaurant_table")
public class RestaurantTable {
    
    @Id
    @Column(name = "tableNumber", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
}
