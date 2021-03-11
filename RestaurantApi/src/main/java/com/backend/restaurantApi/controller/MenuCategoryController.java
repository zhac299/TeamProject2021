package com.backend.restaurantApi.controller;

import java.util.List;

import com.backend.restaurantApi.model.MenuCategory;
import com.backend.restaurantApi.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class MenuCategoryController {

    @Autowired
    MenuCategoryRepository menuCategoryRepository;
    
    @GetMapping("/customer")
    public List<MenuCategory> index() {
        return menuCategoryRepository.findAll();
    }

    @PostMapping("/meals")
    public MenuCategory createNewCategory(@RequestBody MenuCategory menuCategory){
        //return mealService.createNewMeal(meal);
    }
}
