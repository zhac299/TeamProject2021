package com.backend.restaurantApi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.restaurantApi.model.Order;

/**
 * Repository class for the Order.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	/**
	 * Finds waiter by checking if order ispaid and id.
	 * @param id of the order.
	 * @param isPaid 
	 * @return list of orders corresponding with the given information.
	 */
	List<Order> findByWaiterIdAndIsPaid(Long id, boolean isPaid);
}