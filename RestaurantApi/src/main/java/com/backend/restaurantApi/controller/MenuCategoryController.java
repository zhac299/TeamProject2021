package com.backend.restaurantApi.controller;

import java.util.List;

import com.backend.restaurantApi.model.MenuCategory;
import com.backend.restaurantApi.repository.*;
import com.backend.restaurantApi.service.MenuCategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * The Controller of the MenuCategory.
 */
@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class MenuCategoryController {

    /**
     * Autowires to menuCategory repo.
     */
    @Autowired
    MenuCategoryRepository menuCategoryRepository;

    /**
    * The Controller of the menuCategory service.
    */
    @Autowired
    MenuCategoryService menuCategoryService;
    
    /**
     * Gets all the menu categories.
     * @return list of MenuCategory objects.
     */
    @GetMapping("/menuCategory")
    public List<MenuCategory> index() {
        return menuCategoryRepository.findAll();
    }

    /**
     * Creates a new category and calls the service to add it to the repo.
     * @param menuCategory the MenuCategory object to create.
     * @return the MenuCategory object.
     */
    @PostMapping("/menuCategory")
    public MenuCategory createNewCategory(@RequestBody MenuCategory menuCategory){
        return menuCategoryService.createNewCategory(menuCategory);
    }

    /**
     * Gets the MenuCategory Object accoring to its id.
     * @param id of the MenuCategory object you want to get.
     * @return MenuCategory object.
     */
    @GetMapping("/menuCategory/{id}")
    public MenuCategory getMenuCategoryById(@PathVariable("id") Long id) {
        return menuCategoryService.findCategoryById(id);
    }

    /**
     * Updates a category by using its id.
     * @return the updated MenuCategory.
     */
    @PutMapping("/menuCategory/{id}")
    public MenuCategory updateMenuCategory(@PathVariable("id") Long id, @RequestBody MenuCategory menuCategory) {
        return menuCategoryService.updateMenuCategory(id, menuCategory);
    }

    /**
     * Deletes a category depending on the given id.
     * @param id of the category to delete.
     */
    @DeleteMapping("/menuCategory/{id}")
    public void deleteMenuCategory(@PathVariable("id") Long id) {
        menuCategoryService.deleteMenuCategory(id);
    }
}
