package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.model.MenuItem;
import com.backend.restaurantApi.repository.MenuRepository;
import com.backend.restaurantApi.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/")
public class MenuController {

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    MenuService menuService;

    @GetMapping(path = "/menu")
    public List<Menu> getMenu() {
        return menuRepository.findAll();
    }

    @PostMapping(path = "/menu")
    public Menu createNewMenu(@RequestBody Menu menu) {
        return menuService.createNewMenu(menu);
    }

    @PostMapping(path = "/menuadd/{id}")
    public Menu addNewMeal(@RequestBody Meal meal, @PathVariable Long id) {
        return menuService.addMenuMeal(meal, id);
    }

    @GetMapping(path = "/menu/filterByAllergens")
    public List<Menu> filterByAllergens() {
        return menuService.filterByAllergens();
    }
}
