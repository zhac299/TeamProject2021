package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.repository.*;
import com.backend.restaurantApi.service.MealService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/") 
public class MealController {

    @Autowired
    MealRepository mealRepo;

    @Autowired
    MealService mealService;

    @GetMapping("/meals")
    public List<Meal> index() {
      return mealRepo.findAll();
    }

    @PostMapping("/meals")
    public Meal createNewMeal(@RequestBody Meal meal){
        return mealService.createNewMeal(meal);
    }

    @GetMapping("/meals/{id}")
    public Menu getMealById(@PathVariable("id") Long id) {
        return mealService.getMealById(id);
    }

    @PutMapping("/meals/{id}")
    public Meal updateMeal(@PathVariable("id") Long id, @RequestBody Meal meal) {
        return mealService.updateMeal(id, meal);
    }

    @DeleteMapping("/meals/{id}")
    public void deleteMeal(@PathVariable("id") Long id) {
        mealService.deleteMeal(id);
    }
}
