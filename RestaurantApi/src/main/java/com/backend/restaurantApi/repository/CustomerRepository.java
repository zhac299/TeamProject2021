  
package com.backend.restaurantApi.repository;


import com.backend.restaurantApi.model.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
 * Repository class for the Customer.
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {}