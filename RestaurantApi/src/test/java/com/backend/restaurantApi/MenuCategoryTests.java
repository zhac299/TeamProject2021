package com.backend.restaurantApi;

import com.backend.restaurantApi.exception.MenuCategoryNotFoundException;
import com.backend.restaurantApi.exception.MenuNotFoundException;
import com.backend.restaurantApi.model.*;
import com.backend.restaurantApi.service.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

/**
 * A tester class for the Category Model.
 */
@SpringBootTest
public class MenuCategoryTests {
     
    /**
     * Tester field that is used to create a new MenuCategory instance.
     */
    private MenuCategory menuCategory;

    /**
     * Tester field that is used to create a new MenuItem instance
     */
    private Menu menuItem;

    /**
     * The service used to make requests to the category DB.
     */
    @Autowired
    private MenuCategoryService menuCategoryService;

    /**
     * The service used to make requests to the menu DB.
     */
    @Autowired
    private MenuService menuService;

    /**
     * Set up test that is run before each test.
     */
    @BeforeEach
    void setUp() {
        //creating a menu category
        menuCategory = new MenuCategory();
        menuCategory.setCategory("Fajita");
        menuCategory = menuCategoryService.createNewCategory(menuCategory);

        //creating a menu item
        menuItem = new Menu();
        menuItem.setCalories((double) 111);
        menuItem.setName("cheesy fajita");
        menuItem.setCategory(menuCategory);
        menuItem = menuService.createNewMenu(menuItem);
    }

    /**
     * Test1.
     * Testing service getters.
     * 
     */
    @Transactional
    @Test
    void TestServiceGetters() {
        Assertions.assertTrue(menuCategoryService.findCategoryById(
            menuCategory.getId()).getCategory().equals(menuCategory.getCategory()));

        Assertions.assertEquals(menuService.getMenuById(
            menuItem.getId()).getCategory(), menuItem.getCategory());
    }

    /**
     * Test2.
     * Test if category deleted also deletes menu items in that category.
     * 
     * @throws MenuCategoryNotFoundException if the menu category is not found in the DB
     * @throws MenuNotFoundException if the menu is not found in the DB
     */
    @Test
    @Transactional
    void deleteMenuCategoryDeletesMenuItemTest() {
        menuCategoryService.deleteMenuCategory(menuCategory.getId());

        Assertions.assertThrows(MenuCategoryNotFoundException.class,
                ()-> menuCategoryService.findCategoryById(menuCategory.getId()));

        Assertions.assertThrows(MenuNotFoundException.class,
                ()-> menuService.getMenuById(menuItem.getId()));
    }

    /**
     * Test3.
     * Checks if menu category is deleted.
     * 
     * @throws MenuCategoryNotFoundException if the menu category is not found in the DB.
     */
    @Transactional
    @Test
    void testDeleteMenuCategory() {
        menuCategoryService.deleteMenuCategory(menuCategory.getId());
        Assertions.assertThrows(MenuCategoryNotFoundException.class, () -> {
            menuCategoryService.findCategoryById(menuCategory.getId());
        }, "Should throw an exception, since the menu category was deleted.");
    }

    /**
     * Test4.
     * Checks if deleting a menu item removes it from the menu category.
     */
    @Transactional
    @Test
    void testDeleteMenuCheckCategory() {
        menuService.deleteMenuItem(menuItem.getId());

        Assertions.assertDoesNotThrow(()->{
            menuCategoryService.findCategoryById(menuCategory.getId());
        },"Should not throw an exception, deleting the menu item should not delete the category.");

        Assertions.assertNotNull(
            menuCategoryService.findCategoryById(menuCategory.getId()),
            "Should not be null, deleting the menu item should not delete the category");
    }
}
