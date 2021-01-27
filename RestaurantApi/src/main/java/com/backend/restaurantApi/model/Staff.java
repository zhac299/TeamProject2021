package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
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

// used to serialize object to json
  @Override
  public String toString() {
      return "Staff{" +
              "id=" + id +
              ", userName='" + userName + '\'' +
              ", password='" + password + '\'' +
              ", email='" + email + '\'' +
              ", isWaiter='" + isWaiter + '\'' +
              '}';
  }
}