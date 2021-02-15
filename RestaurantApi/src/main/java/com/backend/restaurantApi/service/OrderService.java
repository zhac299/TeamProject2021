package com.backend.restaurantApi.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.PriorityQueue;

import com.backend.restaurantApi.exception.OrderNotFoundException;
import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    public Order createNewOrder(Order Order) {
        return orderRepository.save(Order);
    }

	public Order getOrderById(Long OrderId) {
		Optional<Order> optionalOrder = orderRepository.findById(OrderId);

        if (!optionalOrder.isPresent()) {
            throw new OrderNotFoundException("Order Record is not available...");
        }
        return optionalOrder.get();
	}

	public Order updateOrder(Long id, Order Order) {
		Order.setOrderId(id);
        return orderRepository.save(Order);
	}

	public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
	}

    public PriorityQueue<Date> convertIntoQueue() {
        List<Order> listOfOrders = new ArrayList<>();
        listOfOrders = orderRepository.findAll();
        List<Date> listOfDates = new ArrayList<>();
        for (Order order : listOfOrders) {
            listOfDates.add(order.getOrderPlacedTime());
        }
        PriorityQueue<Date> datePriorityQueue = new PriorityQueue<Date>(listOfDates);
        return datePriorityQueue;
    }
    
}
