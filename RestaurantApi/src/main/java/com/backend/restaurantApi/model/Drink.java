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

    @Column(name = "drinkName")
    private String drinkName;

    @Column(name = "price")
    private float price;

    // used to serialize object to json
    @Override
    public String toString() {
        return "Drink{" +
                "id=" + id +
                ", drinkName='" + drinkName + '\'' +
                ", price='" + price + '\'' +
                ", dAllergies'" + dAllergies + '\'' +
                '}';
    }

    public Drink(String dName, float price) {
        this.drinkName = dName;
        this.price = price;
    }

    public Drink(String dName, float price, DishAllergies da) {
        this.drinkName = dName;
        this.price = price;
        this.dAllergies = da;
    }

    public String getDishName() {
        return this.drinkName;
      }
    
    public long getId() {
        return this.id;
    }

    public float getPrice() {
          return this.price;
    }
}
