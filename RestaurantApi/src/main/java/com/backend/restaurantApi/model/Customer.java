package com.backend.restaurantApi.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table
public class Customer {

  public Customer() {}

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @JsonManagedReference
  @ManyToOne(cascade = CascadeType.REMOVE, optional = false)
  @JoinColumn(name = "table_number", nullable = true)
  private RestaurantTable table;

  public void setCustomerId(long id) {
    this.id = id;
  }

  public long getCustomerId() {
    return this.id;
  }

  public RestaurantTable getTable() {
     return this.table;
  }

  public void setTable(RestaurantTable newTable) {
    this.table = newTable;
  }

  // used to serialize object to json
  @Override
  public String toString() {
      return "Customer{" +
              "id=" + id +
              ", tableNumber='" + table + '\'' +
              '}';
  }
}
