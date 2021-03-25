package com.backend.restaurantApi.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.PriorityQueue;

import com.backend.restaurantApi.exception.MealNotFoundException;
import com.backend.restaurantApi.exception.OrderNotFoundException;
import com.backend.restaurantApi.model.Customer;
import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.model.RestaurantTable;
import com.backend.restaurantApi.repository.CustomerRepository;
import com.backend.restaurantApi.repository.OrderRepository;
import com.backend.restaurantApi.repository.RestaurantTableRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * The Service class of the Order model that handles the CRUD API functionality on the model.
 */
@Service
public class OrderService {
    /**
     * The order repository to be autowired.
     */
    @Autowired
    OrderRepository orderRepository;

     /**
     * The menu service to be autowired.
     */
    @Autowired
    MenuService menuService;
    /**
     * The customer service to be autowired.
     */
    @Autowired
    CustomerService customerService;
    
    /**
     * The restaurant table repository to be autowired.
     */
    @Autowired
    RestaurantTableRepository restaurantTableRepository;
    /**
     *The customer repository to be autowired.
     */
    @Autowired
    CustomerRepository customerRepository;
    /**
     * This method is tasked with creating a new order within the database.
     * 
     * @param order The order object to be added to the database.
     * @return The state of the order repository after adding the new order.
     */
    public Order createNewOrder(Order order) {
    	Optional<Customer> customer = customerRepository.findById(order.getCustomer().getId());
    	if(customer.isPresent()) {
    		RestaurantTable table = customer.get().getTable();
    		if(table != null) {
    			Long staff = table.getWaiterId();
				if(staff != null) {
			    	order.setWaiterId(staff);
				}
    		}
    	}
        return orderRepository.save(order);
    }
    /**
     * This method is tasked with getting a specific order by ID.
     * 
     * @param OrderId The order ID associated with the desired order.
     * @return The order which correlates with the given order ID.
     */
	public Order getOrderById(Long OrderId) {
		Optional<Order> optionalOrder = orderRepository.findById(OrderId);

        if (!optionalOrder.isPresent()) {
            throw new OrderNotFoundException("Order Record is not available...");
        }
        return optionalOrder.get();
	}
    /**
     * This method is tasked with updating an existing order.
     * 
     * @param id The order ID associated with the desired order.
     * @param Order The updated order object associated with the ID.
     * @return The state of the order repository after updating the order.
     */
	public Order updateOrder(Long id, Order Order) {
		Order.setOrderId(id);
        return orderRepository.save(Order);
	}
    /**
     * This method is tasked with deleting an order.
     * 
     * @param id The order ID of the order subject for deletion.
     */
	public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
	}

    /**
     * This method is purposed with converting the list of orders into a priority queue.
     * 
     * @return  The priority queue containing all orders.
     */
    public PriorityQueue<Order> convertIntoQueue() {
        List<Order> listOfOrders = new ArrayList<>();
        listOfOrders = orderRepository.findAll();
        Collections.sort(listOfOrders);

        PriorityQueue<Order> priorityQueueByDate = new PriorityQueue<>(listOfOrders);

        return priorityQueueByDate;
    }
    
    /**
     * This method is tasked with collecting all the meals ordered.
     * 
     * @param id The ID of the desired order.
     * @return The meals that were ordered as part of the order.
     */
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


    /**
     * This function is tasked with removing a meal form an already confirmed order.
     * 
     * 
     * @param order The order containing the meal in question.
     * @param meal The meal to be removed from the order.
     */
    public void removeOrderedMeal(Order order, Meal meal) {
        order.getMeal().remove(meal);
        this.updateOrder(order.getId(),order);
    }
    /**
     * This method is tasked with getting a list of confirmed orders form the database.
     * @return The list of confirmed orders.
     */
    public List<Order> getConfirmedOrders() {
        List<Order> confirmedOrders = new ArrayList<>();
        List<Order> allOrders = orderRepository.findAll();

        for (Order order : allOrders) {
            if (order.getIsConfirmed() == true && order.getIsDelivered() == false) {
                confirmedOrders.add(order);
            }
        }

        return confirmedOrders;
    }
    /**
     * This method is tasked with getting alll the orders that aren't confirmed in the database.
     * 
     * @return The list of orders which are not confirmed.
     */
    public List<Order> getNoConfirmedOrders() {
        List<Order> noConfirmedOrders = new ArrayList<>();
        List<Order> allOrders = orderRepository.findAll();

        for (Order order : allOrders) {
            if (order.getIsConfirmed() == false) {
                noConfirmedOrders.add(order);
            }
        }

        return noConfirmedOrders;
    }
    /**
     * This method is tasked with getting all orders that are ready to be served.
     * 
     * @return The list of orders that are ready to be served.
     */
    public List<Order> getReadyOrders() {
        List<Order> readyOrders = new ArrayList<>();
        List<Order> allOrders = orderRepository.findAll();

        for (Order order : allOrders) {
            if (order.getIsReady() == true) {
                readyOrders.add(order);
            }
        }

        return readyOrders;
    }
    /**
     * This method is tasked with getting all the individual waiters orders.
     * 
     * @param waiterId The ID of the specific waiter.
     * @return A list of orders assigned to the specific waiter.
     */
    public List<Order> getWaiterOrders(long waiterId) {
        List<Order> allOrders = orderRepository.findAll();
        List<Order> waiterOrders = new ArrayList<>();

        for (Order order : allOrders) {
            if (order.getWaiterId() == waiterId) {
                waiterOrders.add(order);
            }
        }

        return waiterOrders;
    }
}