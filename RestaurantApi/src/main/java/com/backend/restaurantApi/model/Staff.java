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
  
  @Column
  private String userName;
  
  @Column
  private String password;

  @Column
  private String email;

  @Column
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