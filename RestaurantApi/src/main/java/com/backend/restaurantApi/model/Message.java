package com.backend.restaurantApi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
public class Message {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String message;

}
