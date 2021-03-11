package com.backend.restaurantApi;

import com.backend.restaurantApi.model.*;
import com.backend.restaurantApi.service.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

@SpringBootTest
public class MenuCategoryTests {
     
    private MenuCategory menuCategory;

    private Menu menuItem;

    @Autowired
    private MenuCategoryService menuCategoryService;

    @Autowired
    private MenuService menuService;

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

    @Transactional
    @Test
    void TestServiceGetters() {
        Assertions.assertTrue(menuCategoryService.findCategoryById(
            menuCategory.getId()).getCategory().equals(menuCategory.getCategory()));

        Assertions.assertEquals(menuService.getMenuById(
            menuItem.getId()).getCategory(), menuItem.getCategory());
    }
}
