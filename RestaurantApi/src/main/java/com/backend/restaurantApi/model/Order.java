package com.backend.restaurantApi.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;

import javax.persistence.*;

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


    @JsonManagedReference(value = "order")
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
//            ", customer='" + customer + '\'' +
//            ", meal='" + meal + '\'' +
//            ", staff='" + staff + '\'' +
            '}';
    }

    public Order() {}

    public long getId() {
        return id;
    }

    public void setOrderId(Long id) {
        this.id = id;
    }

    public List<Meal> getMeal() {
        return meal;
    }

    public void setMeal(List<Meal> meal) {
        this.meal = meal;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Customer> getCustomer() {
        return customer;
    }

    public void setCustomer(List<Customer> customer) {
        this.customer = customer;
    }

    public List<Staff> getStaff() {
        return staff;
    }

    public void setStaff(List<Staff> staff) {
        this.staff = staff;
    }
}
