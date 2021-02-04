package com.backend.restaurantApi.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Table
public class DishAllergies {

  @Id
  @Column(name = "dishallergy_id", unique = true, nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  @Column(name = "starter", nullable = true)
  @OneToMany(cascade = CascadeType.REMOVE, mappedBy="dAllergies", targetEntity=Starter.class)
  private List<Starter> starter;
  
  @Column(name = "main", nullable = true)
  @OneToMany(cascade = CascadeType.REMOVE, mappedBy="dAllergies", targetEntity=Main.class)
  private List<Main> main;
  
  @Column(name = "side", nullable = true)
  @OneToMany(cascade = CascadeType.REMOVE, mappedBy="dAllergies", targetEntity=Side.class)
  private List<Side> side;
  
  @Column(name = "desert", nullable = true)
  @OneToMany(cascade = CascadeType.REMOVE, mappedBy="dAllergies", targetEntity=Desert.class)
  private List<Desert> desert;
  
  @Column(name = "drink", nullable = true)
  @OneToMany(cascade = CascadeType.REMOVE, mappedBy="dAllergies", targetEntity=Drink.class)
  private List<Drink> drink;
 
  @Column(name = "allergies")
  @OneToMany(cascade=CascadeType.ALL, mappedBy="dAllergies", targetEntity=Allergy.class)
  private List<Allergy> allergies;
  
// used to serialize object to json
  @Override
  public String toString() {
      return "DishAllergies{" +
              "id=" + id +
              ", starter='" + starter + '\'' +
              ", main='" + main + '\'' +
              ", side='" + side + '\'' +
              ", desert='" + desert + '\'' +
              ", drink='" + drink + '\'' +
              ", allergies='" + allergies + '\'' +
              '}';
  }

//  public DishAllergies(Starter starter, Allergy allergy) {
//    this.starter.add(starter);
//    this.main = null;
//    this.side = null;
//    this.desert = null;
//    this.drink = null;
//    this.allergies.add(allergy);
//  }
//
//  public DishAllergies(Main main, Allergy allergy) {
//    this.starter = null;
//    this.main .add(main);
//    this.side = null;
//    this.desert = null;
//    this.drink = null;
//    this.allergies.add(allergy);
//  }
//
//  public DishAllergies(Side side, Allergy allergy) {
//    this.starter = null;
//    this.main = null;
//    this.side.add(side);
//    this.desert = null;
//    this.drink = null;
//    this.allergies.add(allergy);
//  }

//  public DishAllergies(Drink drink, Allergy allergy) {
//    this.starter = null;
//    this.main = null;
//    this.side = null;
//    this.desert = null;
//    this.drink.add(drink);
//    this.allergies.add(allergy);
//  }

  public DishAllergies() {}

//  public List<Starter> getStarter() {
//    return this.starter;
//  }
//
//  public List<Main> getMain() {
//    return this.main;
//  }
//
//  public List<Side> getSide() {
//    return this.side;
//  }
//
//  public List<Desert> getDesert() {
//    return this.desert;
//  }
//
//  public List<Drink> getDrink() {
//    return this.drink;
//  }
//
//  public List<Allergy> getAllergies() {
//    return this.allergies;
//  }
}
