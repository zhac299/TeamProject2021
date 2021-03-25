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
/**
 * A tester class for the Meal Model.
 */
@SpringBootTest
public class MealTests {

    /**
     * A service that is used to make requests to the Meal DB.
     */
    @Autowired
    MealService mealService;

    /**
     * A service used to make requests to the Order DB.
     */
    @Autowired
    OrderService orderService;

    /**
     * A service used to make requests to the Table DB.
     */
    @Autowired
    RestaurantTableService tableService;

    /**
     * A service used to make requests to the Customer DB.
     */
    @Autowired
    CustomerService customerService;

    /**
     * A service used to make requests to the Menu DB.
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
    static String MEAL_NAME = "MVP MEAL";

    /**
     * Set up test that is run before each test.
     */
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

    /**
     * Test1.
     * Checking Meal selections are added correctly.
     */
    @Test
    @Transactional
    void testMealSelections(){
        meal.setNumberSelections(10);
        mealService.updateMeal(meal.getId(), meal);
        Assertions.assertEquals(10, mealService.getMealById(meal.getId()).getNumberSelections(),
        "Returns true if the number of selections is correctly added.");
    }

    /**
     * Test2.
     * Testing creating meal.
     */
    @Test
    @Transactional
    void testCreateMeal(){
        Assertions.assertNotNull(mealService.getMealById(meal.getId()));
        Assertions.assertTrue(mealService.getMealById(meal.getId()).getMenu().getName().equals(MEAL_NAME));
    }

    /**
     * Test3.
     * Test if deleting meal, also deletes the order.
     * 
     * @throws MealNotFoundException if the meal is not found in the DB
     */
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
