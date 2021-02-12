package com.backend.restaurantApi.model;

import javax.persistence.*;

@Entity
@Table(name = "restaurant_menu_item")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "calories")
    private int calories = 0;

    @Column(name = "category")
    private String category = null;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

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

    @Column(name = "sulphites")
    private String meal = "";

    public Menu() {}

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
    public boolean getGluten() {
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
    public int getCalories() {
        return calories;
    }
    public String getCategory() {
        return category;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public void setPeanuts(boolean peanuts) {
        this.peanuts = peanuts;
    }
    public void setCelery(boolean celery) {
        this.celery = celery;
    }
    public void setGluten(boolean gluten) {
        this.gluten = gluten;
    }
    public void setCrustaceans(boolean crustaceans) {
        this.crustaceans = crustaceans;
    }
    public void setEggs(boolean eggs) {
        this.eggs = eggs;
    }
    public void setFish(boolean fish) {
        this.fish = fish;
    }
    public void setLupin(boolean lupin) {
        this.lupin = lupin;
    }
    public void setMilk(boolean milk) {
        this.milk = milk;
    }
    public void setMolluscs(boolean molluscs) {
        this.molluscs = molluscs;
    }
    public void setMustard(boolean mustard) {
        this.mustard = mustard;
    }
    public void setNuts(boolean nuts) {
        this.nuts = nuts;
    }
    public void setSoya(boolean soya) {
        this.soya = soya;
    }
    public void setSesame(boolean sesameSeeds) {
        this.sesameSeeds = sesameSeeds;
    }
    public void setSulphites(boolean sulphites) {
        this.sulphites = sulphites;
    }
    public void setCalories(int calories) {
        this.calories = calories;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    
    @Override
    public String toString(){
        return "Menu{" +
                "id=" + id +
                ", meal=" + meal + 
                ", name=" + name +
                ", price=" + price +
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
                ", calories=" + calories +
                ", category=" + category +
                "}";
    }
}
