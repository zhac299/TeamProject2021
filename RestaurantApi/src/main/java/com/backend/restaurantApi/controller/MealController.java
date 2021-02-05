package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class MealController {

    @Autowired
    MealRepository mealRepo;

    @GetMapping("/meals")
    public List<Meal> index() {
        return mealRepo.findAll();
    }

    @PostMapping("/meals")
    public Meal newMain(@RequestBody Meal main){
        return mealRepo.save(main);
    }
}
