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
 * Controller of the Customer.
 */
@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class CustomerController {

  /**
   * Autowires to CustomerRepository.
   */
  @Autowired
  CustomerRepository customerRepo;

  /**
   * Autowires to CustomerService.
   */
  @Autowired
  CustomerService customerService;

  /**
   * Gets all the Customer objects from the customer repo.
   * @return a list of Customer objects.
   */
  @GetMapping("/customer")
  public List<Customer> index() {
    return customerRepo.findAll();
  }  

  /**
   * Creates a new Customer in the repo by calling the service. 
   * @param Customer the created customer.
   * @return the created Customer object.
   */
  @PostMapping("/customer")
  public Customer newCustomer(@RequestBody Customer Customer){
    return customerService.createNewCustomer(Customer);
  }

  /**
   * Retrieves a Customer Object according to its id from the repo by calling the service.
   * @param id of the Customer object to be deleted.
   * @return deleted Customer object.
   */
  @GetMapping("/customer/{id}")
  public Customer getCustomerById(@PathVariable("id") Long id) {
    return customerService.getCustomerById(id);
  }

  /**
   * Updates a specific Customer according to the id in the repo by calling the Service
   * @param id of Customer object to be updated.
   * @param Customer updated Customer object.
   * @return the updated Customer object. 
   */
  @PutMapping("/customer/{id}")
  public Customer updateCustomer(@PathVariable("id") Long id, @RequestBody Customer Customer) {
    return customerService.updateCustomer(id, Customer);
  }

  /**
   * Removes a Customer from the repo.
   * @param id of the specific Customer object to delete.
   */
  @DeleteMapping("/customer/{id}")
  public void deleteCustomer(@PathVariable("id") Long id) {
    customerService.deleteCustomer(id);
  }
}