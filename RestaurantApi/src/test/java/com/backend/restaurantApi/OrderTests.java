package com.backend.restaurantApi;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class OrderTests {

    @Autowired
    MealService mealService;

    @Autowired
    OrderService orderService;

    @Autowired
    RestaurantTableService tableService;

    @Autowired
    CustomerService customerService;

    @Autowired
    MenuService menuService;

    static Meal meal;
    static Order order;
    static Menu menu;
    static RestaurantTable table;
    static Customer customer;

    @Test
    void testCreateOrder() {
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
}
