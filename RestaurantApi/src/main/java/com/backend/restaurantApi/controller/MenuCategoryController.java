package com.backend.restaurantApi.controller;

import java.util.List;

import com.backend.restaurantApi.model.MenuCategory;
import com.backend.restaurantApi.repository.*;
import com.backend.restaurantApi.service.MenuCategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class MenuCategoryController {

    @Autowired
    MenuCategoryRepository menuCategoryRepository;

    @Autowired
    MenuCategoryService menuCategoryService;
    
    @GetMapping("/menuCategory")
    public List<MenuCategory> index() {
        return menuCategoryRepository.findAll();
    }

    @PostMapping("/menuCategory")
    public MenuCategory createNewCategory(@RequestBody MenuCategory menuCategory){
        return menuCategoryService.createNewCategory(menuCategory);
    }

    @GetMapping("/menuCategory/{id}")
    public MenuCategory getMealById(@PathVariable("id") Long id) {
        return menuCategoryService.findCategoryById(id);
    }

    @PutMapping("/menuCategory/{id}")
    public MenuCategory updateMenuCategory(@PathVariable("id") Long id, @RequestBody MenuCategory menuCategory) {
        return menuCategoryService.updateMenuCategory(id, menuCategory);
    }

    @DeleteMapping("/menuCategory/{id}")
    public void deleteMenuCategory(@PathVariable("id") Long id) {
        menuCategoryService.deleteMenuCategory(id);
    }
}
