package com.backend.restaurantApi.service;

import java.util.Optional;

import com.backend.restaurantApi.exception.CustomerNotFoundException;
import com.backend.restaurantApi.model.Customer;
import com.backend.restaurantApi.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * The Service class of the Customer model  that handles
 * creating the the table, updating it and getting information from it.
 */
@Service
public class CustomerService {    
    
    /**
     * The customerRepo that is autowired.
     */
    @Autowired
    CustomerRepository custRepository;

    /**
     * Creates a new customer and updates the repo.
     * 
     * @param Customer new customer
     * @return updated Customer repo
     */
    public Customer createNewCustomer(Customer Customer) {
        return custRepository.save(Customer);
    }

    /**
     * Gets a customer by its id.
     * 
     * @param CustomerId the id of the customer
     * @return the customer if present in the repo
     * @throws CustomerNotFoundException if customer not found in the repo
     */
	public Customer getCustomerById(Long CustomerId) {
		Optional<Customer> optionalCustomer = custRepository.findById(CustomerId);

        if (!optionalCustomer.isPresent()) {
            throw new CustomerNotFoundException("Customer Record is not available...");
        }
        return optionalCustomer.get();
	}

    /**
     * Updates the customer id.
     * 
     * @param id the new id
     * @param Customer the customer to be updated
     * @return the updated repo
     */
	public Customer updateCustomer(Long id, Customer Customer) {
		Customer.setId(id);
        return custRepository.save(Customer);
	}

    /**
     * Deletes a customer from the repo.
     * 
     * @param id the id of the customer to be deleted
     */
	public void deleteCustomer(Long id) {
        custRepository.deleteById(id);
	}
}