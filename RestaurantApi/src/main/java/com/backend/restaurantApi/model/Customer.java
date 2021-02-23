package com.backend.restaurantApi.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table
public class Customer {

  @Id
  @Column(name = "id", unique = true, nullable = false)
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

  public void setCustomerTable(RestaurantTable newTable) {
     this.table = newTable;
  }

  public void setCustomerId(long id) {
    this.id = id;
  }

  public RestaurantTable getTableNumber() {
     return this.table;
  }
}
