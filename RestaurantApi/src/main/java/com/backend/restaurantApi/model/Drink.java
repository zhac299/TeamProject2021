package com.backend.restaurantApi.model;

import javax.persistence.*;

@Entity
@Table
public class Drink {

    @Id
    @Column(name = "drinkId", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dishAllergies_id", nullable = true)
    private DishAllergies dAllergies;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = true)
    private Order order;

    @Column(name = "drinkName")
    private String drinkName;

    @Column(name = "price")
    private double price;

    // used to serialize object to json
    @Override
    public String toString() {
        return "Drink{" +
                "id=" + id +
                ", drinkName='" + drinkName + '\'' +
                ", price='" + price + '\'' +
                ", dAllergies='" + dAllergies + '\'' +
                ", order='" + order + '\'' +
                '}';
    }

    public Drink() {}

    public Drink(String dName, double price) {
        this.drinkName = dName;
        this.price = price;
        this.dAllergies = null;
    }

    public Drink(String dName, double price, DishAllergies da) {
        this.drinkName = dName;
        this.price = price;
        this.dAllergies = da;
    }

    public Drink(String dName, double price, DishAllergies da, Order order) {
        this.drinkName = dName;
        this.price = price;
        this.dAllergies = da;
        this.order = order;
    }
    
    public Drink(String dName, double price, Order order) {
        this.drinkName = dName;
        this.price = price;
        this.order = order;
    }    

    public String getDishName() {
        return this.drinkName;
      }
    
    public long getId() {
        return this.id;
    }

    public double getPrice() {
          return this.price;
    }

    public Order getOrder() {
        return this.order;
  }
}
