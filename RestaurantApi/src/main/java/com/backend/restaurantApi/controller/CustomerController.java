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

/**
 * The controller of the Customer model.
 */
@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class CustomerController {

  /**
   * The customer repo that is autowired.
   */
  @Autowired
  CustomerRepository customerRepo;

  /**
   * The Customer Service that is autowired.
   */
  @Autowired
  CustomerService customerService;

  /**
   * Returns all elements from the repository.
   * 
   * @return a list of all customers
   */
  @GetMapping("/customer")
  public List<Customer> index() {
    return customerRepo.findAll();
  }  

  /**
   * Creates a new customer.
   * 
   * @param Customer the new customer
   * @return the updated repo
   */
  @PostMapping("/customer")
  public Customer newCustomer(@RequestBody Customer Customer){
    return customerService.createNewCustomer(Customer);
  }

  /**
   * Gets a customer by its id.
   * 
   * @param id the id of the customer
   * @return the Customer
   */
  @GetMapping("/customer/{id}")
  public Customer getCustomerById(@PathVariable("id") Long id) {
    return customerService.getCustomerById(id);
  }

  /**
   * Updates the id of a customer 
   * 
   * @param id the new id
   * @param Customer the customer to be updated
   * @return the updated repo
   */
  @PutMapping("/customer/{id}")
  public Customer updateCustomer(@PathVariable("id") Long id, @RequestBody Customer Customer) {
    return customerService.updateCustomer(id, Customer);
  }

  /**
   * Deletes a customer from the repo.
   * 
   * @param id the id of the customer to be deleted
   */
  @DeleteMapping("/customer/{id}")
  public void deleteCustomer(@PathVariable("id") Long id) {
    customerService.deleteCustomer(id);
  }
}
