package com.backend.restaurantApi.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "restaurant_menu")
public class Menu {

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

    @Column(name = "calories")
    private long calories = 0;

    @Column(name = "category")
    private String category = null;

    @JsonManagedReference(value = "menu")
    @Column(name = "meal", nullable = false)
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "menu")
    private List<Meal> meal;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
    public double getPrice() {
        return price;
    }

    public boolean getPeanuts() {
        return peanuts;
    }

    public boolean getCelery() {
        return celery;
    }
    public boolean gluten() {
        return gluten;
    }
    public boolean getCrustaceans() {
        return crustaceans;
    }
    public boolean getEggs() {
        return eggs;
    }
    public boolean getFish() {
        return fish;
    }
    public boolean getLupin() {
        return lupin;
    }
    public boolean getMilk() {
        return milk;
    }
    public boolean getMolluscs() {
        return molluscs;
    }
    public boolean getMustard() {
        return mustard;
    }
    public boolean getNuts() {
        return nuts;
    }
    public boolean getSoya() {
        return soya;
    }
    public boolean getSesame() {
        return sesameSeeds;
    }
    public boolean getSulphites() {
        return sulphites;
    }
    public long getCalories() {
        return calories;
    }
    public String getCateory() {
        return category;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Meal> getMeal() {
        return meal;
    }

    public void setMeal(List<Meal> meal) {
        this.meal = meal;
    }
}
