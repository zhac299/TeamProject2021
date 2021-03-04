package com.backend.restaurantApi.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.PriorityQueue;

import com.backend.restaurantApi.exception.MealNotFoundException;
import com.backend.restaurantApi.exception.OrderNotFoundException;
import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    MenuService menuService;

    @Autowired
    CustomerService customerService;

    public Order createNewOrder(Order order) {
        return orderRepository.save(order);
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

    public PriorityQueue<Order> convertIntoQueue() {
        List<Order> listOfOrders = new ArrayList<>();
        listOfOrders = orderRepository.findAll();
        Collections.sort(listOfOrders);

        PriorityQueue<Order> priorityQueueByDate = new PriorityQueue<>(listOfOrders);

        return priorityQueueByDate;
    }
    

    public List<Menu> getOrderedMeals(Long id) {
        Optional<Order>  order = orderRepository.findById(id);
        List<Menu> menus = new ArrayList<>();
        if (!order.isPresent()) {
            throw new OrderNotFoundException("Order Record is not available...");
        } else {
            if(order.get().getMeal().isEmpty()) {
                throw new MealNotFoundException("No meals in this order...");
            } else {
                order.get().getMeal().forEach((meal -> menus.add(meal.getMenu())));
            }
        }
        return menus;
    }

    public void removeOrderedMeal(Order order, Meal meal) {
        order.getMeal().remove(meal);
        this.updateOrder(order.getId(),order);
    }

    public List<Order> getConfirmedOrders() {
        List<Order> confirmedOrders = new ArrayList<>();
        List<Order> allOrders = orderRepository.findAll();

        for (Order order : allOrders) {
            if (order.getIsConfirmed() == true) {
                confirmedOrders.add(order);
            }
        }

        return confirmedOrders;
    }
}
