package com.backend.restaurantApi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public List<Menu> getOrderedMeals(Long id) {
        Optional<Order>  order = orderRepository.findById(id);
        List<Menu> menus = new ArrayList<>();
        if (!order.isPresent()) {
            throw new OrderNotFoundException("Order Record is not available...");
        } else {
            if(order.get().getMeal().isEmpty()) {
                throw new MealNotFoundException("No meals in this order...");
            } else {
                order.get().getMeal().forEach((meal -> menus.add(this.menuService.getMenuById(meal.getMenu_id()))));
            }
        }
        return menus;
    }
}
