package com.backend.restaurantApi.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "peanuts")
    private boolean peanuts = false;

    @Column(name = "celery")
    private boolean celery = false;

    @Column(name = "gluten")
    private boolean gluten = false;

    @Column(name = "crustaceans")
    private boolean crustaceans = false;

    @Column(name = "eggs")
    private boolean eggs = false;

    @Column(name = "fish")
    private boolean fish = false;

    @Column(name = "lupin")
    private boolean lupin = false;

    @Column(name = "milk")
    private boolean milk = false;

    @Column(name = "molluscs")
    private boolean molluscs = false;

    @Column(name = "mustard")
    private boolean mustard = false;

    @Column(name = "nuts")
    private boolean nuts = false;

    @Column(name = "soya")
    private boolean soya = false;

    @Column(name = "sesame_seeds")
    private boolean sesameSeeds = false;

    @Column(name = "sulphites")
    private boolean sulphites = false;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Override
    public String toString() {
        return "Meal{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", order=" + order +
                ", peanuts=" + peanuts +
                ", celery=" + celery +
                ", gluten=" + gluten +
                ", crustaceans=" + crustaceans +
                ", eggs=" + eggs +
                ", fish=" + fish +
                ", lupin=" + lupin +
                ", milk=" + milk +
                ", molluscs=" + molluscs +
                ", mustard=" + mustard +
                ", nuts=" + nuts +
                ", soya=" + soya +
                ", sesameSeeds=" + sesameSeeds +
                ", sulphites=" + sulphites +
                '}';
    }

    public Meal() {}

}
