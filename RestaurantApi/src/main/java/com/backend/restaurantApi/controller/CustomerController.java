package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Customer;
import com.backend.restaurantApi.repository.*;
import com.backend.restaurantApi.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class CustomerController {

  @Autowired
  CustomerRepository customerRepo;

  @Autowired
  CustomerService customerService;

  @GetMapping("/customer")
  public List<Customer> index() {
    return customerRepo.findAll();
  }  

  @PostMapping("/customer")
  public Customer newCustomer(@RequestBody Customer Customer){
    return customerService.createNewCustomer(Customer);
  }

  @GetMapping("/customer/{id}")
  public Customer getCustomerById(@PathVariable("id") Long id) {
    return customerService.getCustomerById(id);
  }

  @PutMapping("/customer/{id}")
  public Customer updateCustomer(@PathVariable("id") Long id, @RequestBody Customer Customer) {
    return customerService.updateCustomer(id, Customer);
  }

  @DeleteMapping("/customer/{id}")
  public void deleteCustomer(@PathVariable("id") Long id) {
    customerService.deleteCustomer(id);
  }
}
