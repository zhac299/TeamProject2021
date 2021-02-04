package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table
public class Allergy {

  @Id
  @Column(name = "allergyId", unique = true, nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "dishAllergies_id", nullable = true)
  private DishAllergies dAllergies;

  @Column(name = "allergyName")
  private String allergyName;

// used to serialize object to json
  @Override
  public String toString() {
      return "Allergy{" +
              "id=" + id +
              ", allergyName='" + allergyName + '\'' +
              '}';
  }

  public Allergy() {}
//
//  public Allergy(String allergy) {
//    this.allergyName = allergy;
//  }
//
//  public Allergy(String allergy, DishAllergies da) {
//    this.allergyName = allergy;
//    this.dAllergies = da;
//  }
//
//  public String getAllergy() {
//    return this.allergyName;
//  }
//
//  public long getId() {
//    return this.id;
//  }
}
