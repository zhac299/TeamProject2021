package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.repository.*;
import com.backend.restaurantApi.service.MealService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for the Meal.
 */
@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/") 
public class MealController {

    /**
     * Autowires Meal repo.
     */
    @Autowired
    MealRepository mealRepo;

    /**
     * Autowires Meal service.
     */
    @Autowired
    MealService mealService;

    /**
     * Gets all the meals from the repo.
     * @return List of all Meal objects.
     */
    @GetMapping("/meals")
    public List<Meal> index() {
      return mealRepo.findAll();
    }

    /**
     * Calls the service to create a new meal.
     * @param meal the meal to be created.
     * @return the created Meal object.
     */
    @PostMapping("/meals")
    public Meal createNewMeal(@RequestBody Meal meal){
        return mealService.createNewMeal(meal);
    }

    @GetMapping("/meals/{id}")
    public Meal getMealById(@PathVariable("id") Long id) {
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

    @PutMapping("/meals/numberSelections/{id}/{numberSelections}")
    public Meal updateNumberSelections(@PathVariable("id") Long id, @PathVariable("numberSelections") int numberSelections) {
        Meal meal = mealService.getMealById(id);
        meal.setNumberSelections(numberSelections);
        mealRepo.save(meal);
        return meal;
    }
}