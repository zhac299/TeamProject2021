package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
public class DishAllergies {

  @Id
  @Column(name = "allergy", unique = true, nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  @Column(name = "starter", nullable = true)
  @OneToMany(cascade=CascadeType.ALL, mappedBy="dAllergies", targetEntity=Starter.class)
  private List<Starter> starter;
  
  @Column(name = "main", nullable = true)
  @OneToMany(cascade=CascadeType.ALL, mappedBy="dAllergies", targetEntity=Main.class)
  private List<Main> main;
  
  @Column(name = "side", nullable = true)
  @OneToMany(cascade=CascadeType.ALL, mappedBy="dAllergies", targetEntity=Side.class)
  private List<Side> side;
  
  @Column(name = "desert", nullable = true)
  @OneToMany(cascade=CascadeType.ALL, mappedBy="dAllergies", targetEntity=Desert.class)
  private List<Desert> desert;
  
  @Column(name = "drink", nullable = true)
  @OneToMany(cascade=CascadeType.ALL, mappedBy="dAllergies", targetEntity=Drink.class)
  private List<Drink> drink;
 
  @Column(name = "allergies")
  @OneToMany(cascade=CascadeType.ALL, mappedBy="dAllergies", targetEntity=Drink.class)
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
}