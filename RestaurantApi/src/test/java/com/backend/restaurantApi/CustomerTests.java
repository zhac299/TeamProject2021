package com.backend.restaurantApi;

import static org.junit.jupiter.api.Assertions.assertEquals;

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

    @BeforeEach
    void setUp() {

    }

}
