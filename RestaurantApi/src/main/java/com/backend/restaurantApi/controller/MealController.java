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
     * Calls the service to create a new meal in the repo.
     * @param meal the meal to be created.
     * @return the created Meal object.
     */
    @PostMapping("/meals")
    public Meal createNewMeal(@RequestBody Meal meal){
        return mealService.createNewMeal(meal);
    }

    /**
     * Retrieves a meal according to if the input id matches.
     * @param id of the Meal to be retrieved.
     * @return the Meal object with matching id.
     */
    @GetMapping("/meals/{id}")
    public Meal getMealById(@PathVariable("id") Long id) {
        return mealService.getMealById(id);
    }

    /**
     * Updates a meal by using its id calling the mealService to update the repo.
     * @param id of the Meal to update.
     * @param meal the updated Meal.
     * @return the updated Meal object.
     */
    @PutMapping("/meals/{id}")
    public Meal updateMeal(@PathVariable("id") Long id, @RequestBody Meal meal) {
        return mealService.updateMeal(id, meal);
    }

    /**
     * Deletes a Meal calling the service to delete it from the repo.
     * @param id of the meal to be deleted.
     */
    @DeleteMapping("/meals/{id}")
    public void deleteMeal(@PathVariable("id") Long id) {
        mealService.deleteMeal(id);
    }

    /**
     * Updates the number of selections a Meal object has and saves it to the repo.
     * @param id of the Meal Object to be updated.
     * @param numberSelections amount of selections the meal has.
     * @return the updated Meal object.
     */
    @PutMapping("/meals/numberSelections/{id}/{numberSelections}")
    public Meal updateNumberSelections(@PathVariable("id") Long id, @PathVariable("numberSelections") int numberSelections) {
        Meal meal = mealService.getMealById(id);
        meal.setNumberSelections(numberSelections);
        mealRepo.save(meal);
        return meal;
    }
}