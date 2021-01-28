package com.backend.restaurantApi.model;

import javax.persistence.*;

@Entity
@Table
public class Customer {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  @Column(name = "tableNumber")
  private int tableNumber;
  
// used to serialize object to json
  @Override
  public String toString() {
      return "Customer{" +
              "id=" + id +
              ", tableNumber='" + tableNumber + '\'' +
              '}';
  }

  public Customer() {}

  public Customer(int tableNumber) {
    this.tableNumber = tableNumber;
  }

  public int getTableNumber() {
    return this.tableNumber;
  }
}