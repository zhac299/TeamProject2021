package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Customer;
import com.backend.restaurantApi.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/customer")
public class CustomerController {

    @Autowired
    CustomerRepository customerRepo;

    @GetMapping
    public List<Customer> index() {
      return customerRepo.findAll();
  }  
}
