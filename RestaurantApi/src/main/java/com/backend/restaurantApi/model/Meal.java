package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "meal")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "name")
    String name;

    @Column(name = "price")
    Double price;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "peanuts")
    boolean peanuts = false;

    @Column(name = "celery")
    boolean celery = false;

    @Column(name = "gluten")
    boolean gluten = false;

    @Column(name = "crustaceans")
    boolean crustaceans = false;

    @Column(name = "eggs")
    boolean eggs = false;

    @Column(name = "fish")
    boolean fish = false;

    @Column(name = "lupin")
    boolean lupin = false;

    @Column(name = "milk")
    boolean milk = false;

    @Column(name = "molluscs")
    boolean molluscs = false;

    @Column(name = "mustard")
    boolean mustard = false;

    @Column(name = "nuts")
    boolean nuts = false;

    @Column(name = "soya")
    boolean soya = false;

    @Column(name = "sesame_seeds")
    boolean sesameSeeds = false;

    @Column(name = "sulphites")
    boolean sulphites = false;
    
//    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "order_id", nullable = true)
//    Order order;

    @Override
    public String toString() {
        return "Meal{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price='" + price + '\'' +
//                ", allergens='" + allergens + '\'' +
//                ", order='" + order + '\'' +
                '}';
    }

    public Meal() {}

}
