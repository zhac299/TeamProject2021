package com.backend.restaurantApi.model;

import javax.persistence.*;

@Entity
@Table(name = "meal")
@SecondaryTable(name = "allergens", pkJoinColumns = @PrimaryKeyJoinColumn(name = "meal_id"))
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "name")
    String name;

    @Column(name = "price")
    Double price;
    
    @Embedded
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

@Embeddable
class Allergens {

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


   public Allergens() {}

}