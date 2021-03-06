package com.backend.restaurantApi;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import com.backend.restaurantApi.exception.CustomerNotFoundException;
import com.backend.restaurantApi.exception.OrderNotFoundException;
import com.backend.restaurantApi.model.Customer;
import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.model.RestaurantTable;
import com.backend.restaurantApi.service.CustomerService;
import com.backend.restaurantApi.service.MealService;
import com.backend.restaurantApi.service.MenuService;
import com.backend.restaurantApi.service.OrderService;
import com.backend.restaurantApi.service.RestaurantTableService;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class CustomerTests {
    /**
     * Tester field that is used to create a new RestaurantTable instance.
     */
    private RestaurantTable table;

    /**
     * Tester field that is used to create a new Customer instance.
     */
    private Customer customer;

    /**
     * Tester field that is used to create a new Order instance.
     */
    private Order order;

    /**
     * The service used to make requests to the table DB.
     */
    @Autowired
    private RestaurantTableService tableService;

    /**
     * The service that is used to make requests to the customer DB.
     */
    @Autowired
    private CustomerService customerService;

    /**
     * The service that is used to make requests to he order DB.
     */
    @Autowired
    private OrderService orderService;

    /**
     * Set up test that is run before each test.
     */
    @BeforeEach
    void setUp() {
        table = new RestaurantTable();
        table = tableService.createNewRestaurantTable(table);

        customer = new Customer();
        customer.setTable(table);
        customer = customerService.createNewCustomer(customer);

        order = new Order();
        order.setCustomer(customer);
        order = orderService.createNewOrder(order);
    }

    /**
     * Check if deleting an order, also deletes its customer.
     */
    @Test
    void deleteOrderCheckCustomer() {
        orderService.deleteOrder(order.getId());

        Assertions.assertThrows(OrderNotFoundException.class, () -> {
            orderService.getOrderById(order.getId());
        },"Check if the order was deleted.");

        Assertions.assertThrows(CustomerNotFoundException.class, () -> {
            customerService.getCustomerById(customer.getId());
        },"Check if also the customer was deleted.");
    }

    @Test
    void deleteCustomerCheckOrder() {
        customerService.deleteCustomer(customer.getId());

        Assertions.assertThrows(CustomerNotFoundException.class, () -> {
            customerService.getCustomerById(customer.getId());
        },"Check if the customer was deleted.");

        Assertions.assertThrows(OrderNotFoundException.class, () -> {
            orderService.getOrderById(order.getId());
        },"Check if also the order was deleted.");
    }
}
