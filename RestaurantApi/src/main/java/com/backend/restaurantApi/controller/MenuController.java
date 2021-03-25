package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.model.MenuIngredient;
import com.backend.restaurantApi.repository.MenuRepository;
import com.backend.restaurantApi.service.MealService;
import com.backend.restaurantApi.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The Controller of the Menu.
 */
@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class MenuController {
    /**
     * Autowires to the menu repo
     */
    @Autowired
    MenuRepository menuRepository;

    /**
     * Autowires to the menu service
     */
    @Autowired
    MenuService menuService;

    /**
     * Autowires to the meal service
     */
    @Autowired
    MealService mealService;

    /**
     * Gets all elements in the menu.
     * @return list of Menu objects.
     */
    @GetMapping(path = "/menu")
    public List<Menu> getMenu() {
        return menuRepository.findAll();
    }

    /**
     * Creates a new menu item.
     * @param menu the menu object to be created.
     * @return the created Menu object.
     */
    @PostMapping(path = "/menu") 
    public Menu createNewMenu(@RequestBody Menu menu) {
        return menuService.createNewMenu(menu);
    }

    
    /** 
     * Adds Ingredients to a Menu item.
     * @param id the id of the Menu item
     * @param ingredients the list of ingredients for the menu item
     * @return the menu item edited.
     */
    @GetMapping(path = "/menu/ingredients") 
    public Menu addIngredients(@RequestParam Long id, @RequestParam List<Long> ingredients) {
        return menuService.addIngredients(id, ingredients);
    }

    
    /** 
     * Gets all the ingredients for the menu item.
     * @param id the id of the Menu item.
     * @return the Ingredients associated with a menu item,
     */
    @GetMapping(path = "/menu/getIngredients") 
    public List<MenuIngredient> getIngredients(@RequestParam Long id) {
        return menuService.getIngredients(id);
    }

    
    /** 
     * Gets the meal item specific to the id.
     * @param id the id of the Menu item.
     * @return the Menu item being looked up by id.
     */
    @GetMapping("/menu/{id}")
    public Menu getMealById(@PathVariable("id") Long id) {
        return menuService.getMenuById(id);
    }

    /**
     * Adds a new new meal to the menu specified by its id.
     * @param meal to be added to the menu.
     * @param id of the menu you want to add to.
     * @return the Menu object with the added meal.
     */
    @PostMapping(path = "/menuadd/{id}")
    public Menu addNewMeal(@RequestBody Meal meal, @PathVariable Long id) {
        return menuService.addMenuMeal(meal, id);
    }

    /**
     * Updates a menu.
     * @param id of the menu to update.
     * @param menu the updated menu.
     * @return the updated Menu object.
     */
    @PutMapping("/menu/{id}")
    public Menu updateMeal(@PathVariable("id") Long id, @RequestBody Menu menu) {
        return menuService.updateMenuItem(id, menu);
    }

    /**
     * Deletes a meal from a given menu.
     * @param id of the meal to delete.
     */
    @DeleteMapping("/menu/{id}")
    public void deleteMeal(@PathVariable("id") Long id) {
        menuService.deleteMenuItem(id);
    }


    /**
     * Gets all the filters in the menu 
     * @param peanuts
     * @param celery
     * @param gluten
     * @param crustaceans
     * @param eggs
     * @param fish
     * @param lupin
     * @param milk
     * @param molluscs
     * @param mustard
     * @param nuts
     * @param soya
     * @param sesame_seeds
     * @param sulphites
     * @param calories
     * @return a list of Menu objects.
     */
    @GetMapping(path = "/menu/filter/{peanuts}/{celery}/{gluten}/{crustaceans}/{eggs}/{fish}/{lupin}/{milk}/{molluscs}/{mustard}/{nuts}/{soya}/{sesame_seeds}/{sulphites}/{calories}")
    public List<Menu> filter(
        @PathVariable("peanuts") Boolean peanuts,
        @PathVariable("celery") Boolean celery,
        @PathVariable("gluten") Boolean gluten,
        @PathVariable("crustaceans") Boolean crustaceans,
        @PathVariable("eggs") Boolean eggs,
        @PathVariable("fish") Boolean fish,
        @PathVariable("lupin") Boolean lupin,
        @PathVariable("milk") Boolean milk,
        @PathVariable("molluscs") Boolean molluscs,
        @PathVariable("mustard") Boolean mustard,
        @PathVariable("nuts") Boolean nuts,
        @PathVariable("soya") Boolean soya,
        @PathVariable("sesame_seeds") Boolean sesame_seeds,
        @PathVariable("sulphites") Boolean sulphites,
        @PathVariable("calories") Double calories
    ) {
        return menuService.filter(
            peanuts,
            celery,
            gluten,
            crustaceans,
            eggs,
            fish,
            lupin,
            milk,
            molluscs,
            mustard,
            nuts,
            soya,
            sesame_seeds,
            sulphites,
            calories);
        }

    /**
     * Gets the Menu according to the category.
     * @param category of the menu you want.
     * @return a List of menu items in the specified category.
     */
    @GetMapping(path = "/menu/getMenuByCategory/{category}")
    public List<Menu> getMenuByCategory(@PathVariable("category") String category) {
        return this.menuService.getMenuByCategory(category);
    }
}