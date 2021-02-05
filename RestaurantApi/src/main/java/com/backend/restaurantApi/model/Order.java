package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "restaurant_order")
public class Order {
    @Id
    @Column(name = "order_id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "customer", nullable = false)
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy="order", targetEntity=Customer.class)
    private List<Customer> customer;

    @Column(name = "meal", nullable = false)
    @OneToMany(cascade = CascadeType.ALL, mappedBy="order")
    private List<Meal> meal;

    @Column(name = "staff", nullable = false)
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy="order", targetEntity=Staff.class)
    private List<Staff> staff;

    // used to serialize object to json
    @Override
    public String toString() {
        return "DishAllergies{" +
            "id=" + id +
            ", customer='" + customer + '\'' +
            ", meal='" + meal + '\'' +
            ", staff='" + staff + '\'' +
            '}';
    }

    public Order() {}

}
