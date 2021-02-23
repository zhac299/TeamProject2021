package com.backend.restaurantApi.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table
public class Customer {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @JsonBackReference(value = "table")
  @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "table_number", nullable = true)
  private RestaurantTable table;

// used to serialize object to json
  @Override
  public String toString() {
      return "Customer{" +
              "id=" + id +
              ", tableNumber='" + table + '\'' +
              '}';
  }

  public Customer() {}

  public void setCustomerId(long id) {
    this.id = id;
  }

  public long getCustomerId() {
    return this.id;
  }

  public RestaurantTable getCustomerTable() {
     return this.table;
  }

  public void setCustomerTable(RestaurantTable newTable) {
    this.table = newTable;
 }
}
