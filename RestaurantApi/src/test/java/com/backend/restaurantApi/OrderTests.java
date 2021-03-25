package com.backend.restaurantApi;

import java.util.List;

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

/**
 * A tester class for the Order Model.
 */
@SpringBootTest
public class OrderTests {

    /**
     * Tester field that is used to make requests to the meal DB.
     */
    @Autowired
    MealService mealService;

    /**
     * Tester field that is used to make requests to the order DB.
     */
    @Autowired
    OrderService orderService;

    /**
     * The service used to make requests to the table DB.
     */
    @Autowired
    RestaurantTableService tableService;

    /**
     * The service that is used to make requests to the customer DB.
     */
    @Autowired
    CustomerService customerService;

    /**
     * The service used to make requests to the menu DB.
     */
    @Autowired
    MenuService menuService;

    /**
     * Setting up Variables to be used in tests.
     */
    static Meal meal;
    static Order order;
    static Menu menu;
    static RestaurantTable table;
    static Customer customer;

    /**
     * Set up test that is run before each test.
     */
    @BeforeEach
    void setUp() {
        meal = new Meal();
        menu = new Menu();
        order = new Order();
        customer = new Customer();

        table = tableService.createNewRestaurantTable(new RestaurantTable());
        // Check if table is created
        Assertions.assertNotNull(tableService.getTableByNumber(table.getTableNumber()));

        customer.setTable(table);
        customer = customerService.createNewCustomer(customer);
        // Check if customer is created
        Assertions.assertNotNull(customerService.getCustomerById(customer.getId()));
    
        order.setCustomer(customer);
        order = orderService.createNewOrder(order);
        // Check if order has been created
        Assertions.assertNotNull(orderService.getOrderById(order.getId()));
    }

    /**
     * Test 1.
     * Check if deleting an order remoces all the items in the lists.
     */
    @Test
    void testDeleteOrder() {
        List<Order> list1 = orderService.getNoConfirmedOrders();
         for (Order order : list1) {
             System.out.println(order);
         }
        orderService.deleteOrder(order.getId());

        List<Order> list2 = orderService.getNoConfirmedOrders();
         for (Order order : list2) {
             System.out.println(order);
         }
        Assertions.assertEquals(orderService.getNoConfirmedOrders(),null);
    }
}
