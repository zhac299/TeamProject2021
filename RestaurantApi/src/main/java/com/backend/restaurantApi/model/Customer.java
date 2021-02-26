package com.backend.restaurantApi.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * Creates an SQL table that handles the customer information.
 */
@Entity
@Table
public class Customer {

  /**
   * Empty constructor of the class.
   */
  public Customer() {}

  /**
   * The primary key of the table.
   */
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  /**
   * The foreign key of the table that references the RestaurantTable
   * table. It uses a many to one annotation to realise it and JsonManagedReference
   * to avoid to avoid the infinte JSON serialization problem such that only this item
   * is serialised.
   */

  @JsonBackReference(value="restaurant_table")
  @ManyToOne(cascade = CascadeType.REMOVE, optional = false)
  @JoinColumn(name = "table_number", nullable = true)
  private RestaurantTable table;


  @JsonManagedReference(value="customer_order")
  @Column(name = "orders", nullable = false)
  @OneToMany(cascade = CascadeType.ALL, mappedBy="customer")
  private List<Order> orders = new ArrayList<>();

  /**
   * Sets the customer id to a new one.
   *
   * @param id the new id
   */
  public void setId(long id) {
    this.id = id;
  }

  /**
   * Getter for the private class field id.
   * 
   * @return the customer id
   */
  public long getId() {
    return this.id;
  }

  /**
   * Getter for the private class field table.
   * 
   * @return the foreign key table
   */
  public RestaurantTable getTable() {
     return this.table;
  }

  /**
   * Sets the foreign key to another.
   * 
   * @param newTable new foreign key
   */
  public void setTable(RestaurantTable newTable) {
    this.table = newTable;
  }

  public List<Order> getOrders() {
    return orders;
  }

  public void setOrders(List<Order> orders) {
    this.orders = orders;
  }

    /**
   * Serializes Customer to Json format.
   *
   * @return a string of Json format
   */
  @Override
  public String toString() {
      return "Customer{" +
              "id=" + id +
              ", tableNumber='" + table + '\'' +
              '}';
  }

}
