package com.backend.restaurantApi.service;

import java.util.Optional;

import com.backend.restaurantApi.exception.CustomerNotFoundException;
import com.backend.restaurantApi.model.Customer;
import com.backend.restaurantApi.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {    
    @Autowired
    CustomerRepository custRepository;

    public Customer createNewCustomer(Customer Customer) {
        return custRepository.save(Customer);
    }

	public Customer getCustomerById(Long CustomerId) {
		Optional<Customer> optionalCustomer = custRepository.findById(CustomerId);

        if (!optionalCustomer.isPresent()) {
            throw new CustomerNotFoundException("Customer Record is not available...");
        }
        return optionalCustomer.get();
	}

	public Customer updateCustomer(Long id, Customer Customer) {
		Customer.setCustomerId(id);
        return custRepository.save(Customer);
	}

	public void deleteCustomer(Long id) {
        custRepository.deleteById(id);
	}
}
