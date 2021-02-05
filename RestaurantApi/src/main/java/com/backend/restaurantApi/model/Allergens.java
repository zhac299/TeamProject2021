package com.backend.restaurantApi.model;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "allergens")
public class Allergens {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meal_id")
    private Long mealId;

    @OneToOne
    @PrimaryKeyJoinColumn(name = "meal_id")
    private Meal meal;

    @Column(name = "peanuts", table = "allergens")
    boolean peanuts;
 
    @Column(name = "celery", table = "allergens")
    boolean celery;
 
    @Column(name = "gluten", table = "allergens")
    boolean gluten;
 
    @Column(name = "crustaceans", table = "allergens")
    boolean crustaceans;
 
    @Column(name = "eggs", table = "allergens")
    boolean eggs;
 
    @Column(name = "fish", table = "allergens")
    boolean fish;
 
    @Column(name = "lupin", table = "allergens")
    boolean lupin;
 
    @Column(name = "milk", table = "allergens")
    boolean milk;
 
    @Column(name = "molluscs", table = "allergens")
    boolean molluscs;
 
    @Column(name = "mustard", table = "allergens")
    boolean mustard;
 
    @Column(name = "nuts", table = "allergens")
    boolean nuts;
 
    @Column(name = "soya", table = "allergens")
    boolean soya;
 
    @Column(name = "sesame_seeds", table = "allergens")
    boolean sesameSeeds;
 
    @Column(name = "sulphites", table = "allergens")
    boolean sulphites;
 
    @Override
    public String toString() {
        return "AllergensAsEntity [peanuts=" + peanuts + ", celery=" + celery + ", sesameSeeds=" + sesameSeeds + "]";
    }
 }