package com.backend.restaurantApi;

import com.backend.restaurantApi.exception.CustomerNotFoundException;
import com.backend.restaurantApi.exception.OrderNotFoundException;
import com.backend.restaurantApi.model.Customer;
import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.model.RestaurantTable;
import com.backend.restaurantApi.service.CustomerService;
import com.backend.restaurantApi.service.OrderService;
import com.backend.restaurantApi.service.RestaurantTableService;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * A teser class for the Customer Model.
 */
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
     * Test1.
     * Check if deleting an order, also deletes its customer.
     * 
     * @throws OrderNotFoundException if the order is not found in the DB
     * @throws CustomerNotFoundException if the customer is not found in the DB
     */
    @Test
    void deleteOrderCheckCustomer() {
        orderService.deleteOrder(order.getId());

        Assertions.assertThrows(OrderNotFoundException.class, () -> {
            orderService.getOrderById(order.getId());
        },"Check if the order was deleted.");

        Assertions.assertDoesNotThrow(() -> {
            customerService.getCustomerById(customer.getId());
        },"Should not throw any exception, deleting an order should not delete the customer.");
    }

    /**
     * Test2.
     * Check if deleting a customer, also deletes its order.
     * 
     * @throws OrderNotFoundException if the order is not found in the DB
     * @throws CustomerNotFoundException if the customer is not found in the DB
     */
    @Test
    void deleteCustomerCheckOrder() {
        customerService.deleteCustomer((customer.getId()));

        Assertions.assertThrows(CustomerNotFoundException.class, () -> {
            customerService.getCustomerById(customer.getId());
        },"Check if the customer was deleted.");

        Assertions.assertThrows(OrderNotFoundException.class, () -> {
            orderService.getOrderById(order.getId());
        },"Check if also the order was deleted.");
    }

    /**
     * Test3.
     * Checks if deleting an order, also deletes its assigned table.
     * 
     * @throws OrderNotFoundException if the order is not found in the DB
     * @throws CustomerNotFoundException if the customer is not found in the DB
     * @throws TableNotFoundException if the table is not found in the DB
     */
    @Test
    void deleteOrderCheckTable() {
        orderService.deleteOrder(order.getId());

        Assertions.assertThrows(OrderNotFoundException.class, () -> {
            orderService.getOrderById(order.getId());
        },"Check if the order was deleted.");

        Assertions.assertDoesNotThrow(() -> {
            tableService.getTableByNumber(table.getTableNumber());
        }, "Nothing should get thrown, deleting an order should not delete the table.");
    }
}
