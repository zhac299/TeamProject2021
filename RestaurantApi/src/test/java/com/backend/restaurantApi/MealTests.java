package com.backend.restaurantApi;

import com.backend.restaurantApi.exception.MealNotFoundException;
import com.backend.restaurantApi.model.*;
import com.backend.restaurantApi.service.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

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

    @Autowired
    MenuService menuService;

    static Meal meal;
    static Order order;
    static Menu menu;
    static RestaurantTable table;
    static Customer customer;
    static String MEAL_NAME = "MVP MEAL";

    @BeforeEach
    void setUp(){
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

        menu.setName(MEAL_NAME);
        menu = menuService.createNewMenu(menu);
        // Meal needs order to be created
        meal.setOrder(this.order);
        meal.setMenu(menu);
        meal = mealService.createNewMeal(meal);
        // Check if meal is created
        Assertions.assertNotNull(mealService.getMealById(meal.getId()));
    }

    @Test
    @Transactional
    void testMealSelections(){
        meal.setNumberSelections(10);
        mealService.updateMeal(meal.getId(), meal);
        Assertions.assertEquals(10, mealService.getMealById(meal.getId()).getNumberSelections(),
        "Returns true if the number of selections is correctly added.");
    }

    @Test
    @Transactional
    void testCreateMeal(){
        Assertions.assertNotNull(mealService.getMealById(meal.getId()));
        Assertions.assertTrue(mealService.getMealById(meal.getId()).getMenu().getName().equals(MEAL_NAME));
    }

    @Test
    @Transactional
    void testDelete(){
        Assertions.assertNotNull(orderService.getOrderById(this.order.getId()));
        Assertions.assertNotNull(menuService.getMenuById(menu.getId()));

        mealService.deleteMeal(meal.getId());

        Assertions.assertThrows(MealNotFoundException.class,() -> mealService.getMealById(meal.getId()));
        Assertions.assertNotNull(orderService.getOrderById(this.order.getId()));
        Assertions.assertNotNull(menuService.getMenuById(menu.getId()));
    }
}
