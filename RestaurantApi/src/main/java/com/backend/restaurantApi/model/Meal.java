package com.backend.restaurantApi.model;

import javax.persistence.*;

@Entity
@Table(name = "meal")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;;

    @Column(name = "name")
    String name;

    @Column(name = "price")
    Double price;
    
    @OneToOne(mappedBy = "meal")
    Allergens allergens;
    
    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = true)
    Order order;

    @Override
    public String toString() {
        return "Meal{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price='" + price + '\'' +
                ", allergens='" + allergens + '\'' +
                ", order='" + order + '\'' +
                '}';
    }

    public Meal() {}

    public Meal(String name, double price, Allergens allergens) {
       this.name = name;
       this.price = price;
       this.allergens = allergens;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getDishName() {
        return this.name;
    }

    public long getId() {
        return this.id;
    }

    public double getPrice() {
        return this.price;
    }   

    public Allergens getAllergens() {
        return this.allergens;
    }

    public Order getOrder() {
        return this.order;
    }
}