package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table
public class Staff {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  @Column(name = "userName")
  private String userName;
  
  @Column(name = "password")
  private String password;

  @Column(name = "email")
  private String email;

  @Column(name = "isWaiter")
  private boolean isWaiter;

  @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "order_id", nullable = true)
  private Order order;

// used to serialize object to json
  @Override
  public String toString() {
      return "Staff{" +
              "id=" + id +
              ", userName='" + userName + '\'' +
              ", password='" + password + '\'' +
              ", email='" + email + '\'' +
              ", isWaiter='" + isWaiter + '\'' +
              ", order='" + order + '\'' +
              '}';
  }

  public Staff() {}

 public Staff(String userName, String password, String email, boolean isWaiter) {
   this.userName = userName;
   this.password = password;
   this.email = email;
   this.isWaiter = isWaiter;
   this.order = null;
 }

 public void setOrder(Order order) {
   this.order = order;
 }

  public long getId() {
    return this.id;
  }

  public void setStaffId(long id) {
    this.id = id;
  }

 public void setOrderNull() {
   this.order = null;
 }

 public String getStaffUsername() {
   return this.userName;
 }

 public String getStaffPassword() {
   return this.password;
 }

 public String getStaffEmail() {
   return this.email;
 }

 public boolean getIsWaiter() {
   return this.isWaiter;
 }
}
