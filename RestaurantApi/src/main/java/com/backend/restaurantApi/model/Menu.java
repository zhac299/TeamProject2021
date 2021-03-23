package com.backend.restaurantApi.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

/**
 * Class for the Menu model.
 */
@Entity
@Table(name = "restaurant_menu_item")
public class Menu {

    /**
     * Defining column for Menu called id that is generated every time there is a new instance.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /**
     * Column for the name of the Menu.
     */
    @Column(name = "name")
    private String name;

    /**
     * Column for the description of the menu.
     */
    @Column(name = "description")
    private String description;

    /**
     * Column for the price of the menu.
     */
    @Column(name = "price")
    private Double price = 0.0;

    /**
     * Column for category that has a ManyToOne relationship.
     */
    @ManyToOne
    @JoinColumn(name = "category")
    private MenuCategory category;

    /**
     * Column for the isSuggested.
     */
    @Column(name = "isSuggested")
    private String isSuggested;

    /**
     * Column for the calories.
     */
    @Column(name = "calories")
    private Double calories;

    /**
     * Column for the peanuts.
     */
    @Column(name = "peanuts")
    private boolean peanuts = false;

    /**
     * Column for the celery.
     */
    @Column(name = "celery")
    private boolean celery = false;

    /**
     * Column for the gluten.
     */
    @Column(name = "gluten")
    private boolean gluten = false;

    /**
     * Column for the crustaceans
     */
    @Column(name = "crustaceans")
    private boolean crustaceans = false;

    /**
     * Column for eggs.
     */
    @Column(name = "eggs")
    private boolean eggs = false;

    /**
     * Column for fish.
     */
    @Column(name = "fish")
    private boolean fish = false;

    /**
     * Column for lupin.
     */
    @Column(name = "lupin")
    private boolean lupin = false;

    /**
     * Column for milk.
     */
    @Column(name = "milk")
    private boolean milk = false;

    /**
     * Column for molluscs.
     */
    @Column(name = "molluscs")
    private boolean molluscs = false;

    /**
     * Column for mustard
     */
    @Column(name = "mustard")
    private boolean mustard = false;

    /**
     * Column for nuts.
     */
    @Column(name = "nuts")
    private boolean nuts = false;

    /**
     * Column for soya.
     */
    @Column(name = "soya")
    private boolean soya = false;

    /**
     * Column for sesameSeeds
     */
    @Column(name = "sesame_seeds")
    private boolean sesameSeeds = false;

    /**
     * Column for sulphites.
     */
    @Column(name = "sulphites")
    private boolean sulphites = false;

    /**
     * Column for time to cook.
     */
    @Column(name = "time_to_cook")
    private double timeToCook = 20;
    
    /**
     * Getter for the id.
     * @return the Meal object id.
     */
    public Long getId() {
        return id;
    }

    public Double getCalories() {
        return calories;
    }

    public void setCalories(Double calories) {
        this.calories = calories;
    }

    public void setMenuId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public boolean isPeanuts() {
        return peanuts;
    }

    public void setPeanuts(boolean peanuts) {
        this.peanuts = peanuts;
    }

    public boolean isCelery() {
        return celery;
    }

    public void setCelery(boolean celery) {
        this.celery = celery;
    }

    public boolean isGluten() {
        return gluten;
    }

    public void setGluten(boolean gluten) {
        this.gluten = gluten;
    }

    public boolean isCrustaceans() {
        return crustaceans;
    }

    public void setCrustaceans(boolean crustaceans) {
        this.crustaceans = crustaceans;
    }

    public boolean isEggs() {
        return eggs;
    }

    public void setEggs(boolean eggs) {
        this.eggs = eggs;
    }

    public boolean isFish() {
        return fish;
    }

    public void setFish(boolean fish) {
        this.fish = fish;
    }

    public boolean isLupin() {
        return lupin;
    }

    public void setLupin(boolean lupin) {
        this.lupin = lupin;
    }

    public boolean isMilk() {
        return milk;
    }

    public void setMilk(boolean milk) {
        this.milk = milk;
    }

    public boolean isMolluscs() {
        return molluscs;
    }

    public void setMolluscs(boolean molluscs) {
        this.molluscs = molluscs;
    }

    public boolean isMustard() {
        return mustard;
    }

    public void setMustard(boolean mustard) {
        this.mustard = mustard;
    }

    public boolean isNuts() {
        return nuts;
    }

    public void setNuts(boolean nuts) {
        this.nuts = nuts;
    }

    public boolean isSoya() {
        return soya;
    }

    public void setSoya(boolean soya) {
        this.soya = soya;
    }

    public boolean isSesameSeeds() {
        return sesameSeeds;
    }

    public void setSesameSeeds(boolean sesameSeeds) {
        this.sesameSeeds = sesameSeeds;
    }

    public boolean isSulphites() {
        return sulphites;
    }

    public void setSulphites(boolean sulphites) {
        this.sulphites = sulphites;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public double getTimeToTime() {
        return this.timeToCook;
    }
    public void setSuggested(String suggest) {
        this.isSuggested = suggest;
    }
    
    public String getSuggested() {
        return isSuggested;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MenuCategory getCategory() {
        return category;
    }

    public void setCategory(MenuCategory category) {
        this.category = category;
    }

    public double getTimeToCook() {
        return timeToCook;
    }

    public void setTimeToCook(double timeToCook) {
        this.timeToCook = timeToCook;
    }
}
