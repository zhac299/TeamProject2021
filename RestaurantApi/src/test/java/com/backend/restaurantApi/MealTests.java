package com.backend.restaurantApi;

import com.backend.restaurantApi.exception.MealNotFoundException;
import com.backend.restaurantApi.model.*;
import com.backend.restaurantApi.service.CustomerService;
import com.backend.restaurantApi.service.MealService;
import com.backend.restaurantApi.service.OrderService;
import com.backend.restaurantApi.service.RestaurantTableService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MealTests {

    @Autowired
    MealService mealService;

    @Autowired
    OrderService orderService;

    @Autowired
    RestaurantTableService tableService;

    @Autowired
    CustomerService customerService;

    Meal meal = new Meal();

    @Test
    void createOrderWithCustomer(){
        // Customer needs table to be created
        RestaurantTable t = tableService.createNewRestaurantTable(new RestaurantTable());
        Assertions.assertNotNull(tableService.getTableByNumber(t.getTableNumber()));
        Customer newCustomer = new Customer();
        newCustomer.setTable(t);
        newCustomer = customerService.createNewCustomer(newCustomer);
        Assertions.assertNotNull(customerService.getCustomerById(newCustomer.getId()));
        // Order created with customer
        Order order = new Order();
        order.setCustomer(newCustomer);
        order = orderService.createNewOrder(order);
        Assertions.assertNotNull(order);
    }

    @Test
    void testCreateMeal(){
        RestaurantTable t = tableService.createNewRestaurantTable(new RestaurantTable());
        Assertions.assertNotNull(tableService.getTableByNumber(t.getTableNumber()));
        Customer newCustomer = new Customer();
        newCustomer.setTable(t);
        newCustomer = customerService.createNewCustomer(newCustomer);
        Assertions.assertNotNull(customerService.getCustomerById(newCustomer.getId()));

        Order order = new Order();
        order.setCustomer(newCustomer);
        order = orderService.createNewOrder(order);
        Assertions.assertNotNull(order);

        // Meal needs order to be created
        meal.setOrder(order);

        meal = mealService.createNewMeal(meal);
        Assertions.assertNotNull(meal.getId());
    }

    @Test
    void testDeleteMeal(){
        Menu menu = meal.getMenu();
        Order order = meal.getOrder();
        mealService.deleteMeal(meal.getId());
        Assertions.assertThrows(MealNotFoundException.class, () -> mealService.getMealById(meal.getId()));
    }
}
