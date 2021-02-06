package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Meal;
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
    public Meal newMain(@RequestBody Meal meal){
        System.out.println(meal);
        return mealRepo.save(meal);
    }

    @GetMapping("/meals/{id}")
    public Meal getMealById(@PathVariable("id") Long id) {
        return mealService.getMealById(id);
    }
}
