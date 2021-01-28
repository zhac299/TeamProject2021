package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
public class Allergy {

  @Id
  @Column(name = "allergyId", unique = true, nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
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
}