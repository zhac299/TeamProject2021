package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table
public class Customer {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  @Column(name = "table_number")
  private int tableNumber;

  @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "order_id", nullable = true)
  private Order order;

// used to serialize object to json
  @Override
  public String toString() {
      return "Customer{" +
              "id=" + id +
              ", tableNumber='" + tableNumber + '\'' +
              ", order='" + order + '\'' +
              '}';
  }

  public Customer() {}
//
//  public Customer(int tableNumber) {
//    this.tableNumber = tableNumber;
//  }
//
//  public int getTableNumber() {
//    return this.tableNumber;
//  }
}
