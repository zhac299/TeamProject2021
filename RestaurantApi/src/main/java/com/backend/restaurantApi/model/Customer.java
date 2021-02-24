package com.backend.restaurantApi.model;

import javax.persistence.*;

@Entity
@Table
public class Customer {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  @Column(name = "table_number")
  private int tableNumber;

  @Column(name = "is_ready")
  private boolean isReady = false;

// used to serialize object to json
  @Override
  public String toString() {
      return "Customer{" +
              "id=" + id +
              ", tableNumber='" + tableNumber + '\'' +
              ", isReady='" + isReady + '\'' +
              '}';
  }

  public Customer() {}

  public Customer(int tableNumber) {
     this.tableNumber = tableNumber;
  }

  public void setCustomerId(long id) {
    this.id = id;
  }

  public int getTableNumber() {
     return this.tableNumber;
  }


  public boolean isIsReady() {
    return this.isReady;
  }

  public boolean getIsReady() {
    return this.isReady;
  }

  public void setIsReady(boolean isReady) {
    this.isReady = isReady;
  }

}
