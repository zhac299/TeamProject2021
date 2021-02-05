package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
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
    Allergens allergens = new Allergens();
    
//    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "order_id", nullable = true)
//    Order order;

    @Override
    public String toString() {
        return "Meal{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price='" + price + '\'' +
                ", allergens='" + allergens + '\'' +
//                ", order='" + order + '\'' +
                '}';
    }

    public Meal() {}

//    public Meal(String name, double price, Allergens allergens) {
//       this.name = name;
//       this.price = price;
//       this.allergens = allergens;
//    }

//    public void setOrder(Order order) {
//        this.order = order;
//    }
//
//    public String getDishName() {
//        return this.name;
//    }
//
//    public long getId() {
//        return this.id;
//    }
//
//    public double getPrice() {
//        return this.price;
//    }
//
//    public Allergens getAllergens() {
//        return this.allergens;
//    }

//    public Order getOrder() {
//        return this.order;
//    }
}

@Embeddable
class Allergens {

   @Column(name = "peanuts", table = "allergens")
   boolean peanuts = false;

   @Column(name = "celery", table = "allergens")
   boolean celery = false;

   @Column(name = "gluten", table = "allergens")
   boolean gluten = false;

   @Column(name = "crustaceans", table = "allergens")
   boolean crustaceans = false;

   @Column(name = "eggs", table = "allergens")
   boolean eggs = false;

   @Column(name = "fish", table = "allergens")
   boolean fish = false;

   @Column(name = "lupin", table = "allergens")
   boolean lupin = false;

   @Column(name = "milk", table = "allergens")
   boolean milk = false;

   @Column(name = "molluscs", table = "allergens")
   boolean molluscs = false;

   @Column(name = "mustard", table = "allergens")
   boolean mustard = false;

   @Column(name = "nuts", table = "allergens")
   boolean nuts = false;

   @Column(name = "soya", table = "allergens")
   boolean soya = false;

   @Column(name = "sesame_seeds", table = "allergens")
   boolean sesameSeeds = false;

   @Column(name = "sulphites", table = "allergens")
   boolean sulphites = false;


   public Allergens() {}

}
