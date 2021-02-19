package com.backend.restaurantApi.service;

import java.util.List;
import java.util.Optional;

import com.backend.restaurantApi.exception.MealNotFoundException;
import com.backend.restaurantApi.exception.OrderNotFoundException;
import com.backend.restaurantApi.model.Meal;
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

    public List<Meal> getOrderedMeals(Long id) {
        Optional<Order>  order = orderRepository.findById(id);
        if (!order.isPresent()) {
            throw new OrderNotFoundException("Order Record is not available...");
        } else {
            if(order.get().getMeal().isEmpty()) {
                throw new MealNotFoundException("No meals in this order...");
            }
        }
        return order.get().getMeal();
    }
}
