package com.backend.restaurantApi;

import com.backend.restaurantApi.exception.MealNotFoundException;
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

/**
 * A tester class for the Menu Model.
 */
@SpringBootTest
public class MenuTests {

    /**
     * A tester field used to create a new Menu instance.
     */
    private Menu menu;

    /**
     * A tester field used to create a new Meal instance.
     */
    private Meal meal;

    /**
     * A tester field used to create a new RestaurantTable instance.
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
     * The service that is used to make requests to the Menu DB.
     */
    @Autowired
    private MenuService menuService;

    /**
     * The service that is used to make requests to the Meal DB.
     */
    @Autowired
    private MealService mealService;

    /**
     * The service that is used to make requests to the customer DB.
     */
    @Autowired
    private CustomerService customerService;

    /**
     * The service that is used to make requests to the order DB.
     */
    @Autowired
    private OrderService orderService;

    /**
     * The service used to make requests to the table DB.
     */
    @Autowired
    private RestaurantTableService tableService;

    /**
     * Set up test that is run before each test.
     */
    @BeforeEach
    void setUp(){
        menu = new Menu();
        menu.setName("Cheesy Nachos");
        menu.setPrice((double) 12);
//        menu.setCategory("Nachos");

        menu = menuService.createNewMenu(menu);

        table = new RestaurantTable();
        table = tableService.createNewRestaurantTable(table);

        customer = new Customer();
        customer.setTable(table);
        customer = customerService.createNewCustomer(customer);

        order = new Order();
        order.setCustomer(customer);
        order = orderService.createNewOrder(order);

        Meal meal = new Meal();
        meal.setMenu(menu);
        meal.setOrder(order);
    }

    /**
     * Test1.
     * Check if deleting an order, also deletes its meals.
     * 
     * @throws OrderNotFoundEception if the order is not found in the DB
     * @throws MealNotFoundException if the meal is not found in the DB
     */
    @Test
    void testDeleteOrderCheckMeal() {
        orderService.deleteOrder(order.getId());

        Assertions.assertThrows(OrderNotFoundException.class, () ->{
            orderService.getOrderById(order.getId());
        }, "Check if the order was deleted.");

        Assertions.assertThrows(MealNotFoundException.class, () ->{
            mealService.getMealById(meal.getId());
        }, "Check if also the meal got deleted.");
    }
}
