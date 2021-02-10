package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.repository.MenuRepository;
import com.backend.restaurantApi.service.MealService;
import com.backend.restaurantApi.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class MenuController {

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    MenuService menuService;

    @Autowired
    MealService mealService;

    @GetMapping(path = "/menu")
    public List<Menu> getMenu(){
        return menuRepository.findAll();
    }

    @PostMapping(path = "/menu")
    public Menu  createNewMenu(@RequestBody Menu menu){
        return menuService.createNewMenu(menu);
    }

    @GetMapping("/menu/{id}")
    public Menu getMealById(@PathVariable("id") Long id) {
        return mealService.getMealById(id);
    }

    @PostMapping(path = "/menuadd/{id}")
    public Menu addNewMeal(@RequestBody Meal meal, @PathVariable Long id){
        return menuService.addMenuMeal(meal, id);
    }

    @PutMapping("/menu/{id}")
    public Menu updateMeal(@PathVariable("id") Long id, @RequestBody Menu menu) {
        return menuService.updateMenuItem(id, menu);
    }

    @DeleteMapping("/menu/{id}")
    public void deleteMeal(@PathVariable("id") Long id) {
        menuService.deleteMenuItem(id);
    }
}
