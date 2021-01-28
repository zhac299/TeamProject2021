package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Drink;
import com.backend.restaurantApi.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/drink")
public class DrinkController {

    @Autowired
    DrinkRepository drinkRepo;

    //Gets all drinks
    @GetMapping
    public List<Drink> index() {
        return drinkRepo.findAll();
    }

    //Adds drinks
    @PostMapping
    public String addDrink() {
        return"HTTP POST request recieved";
    }

    //Deletes drinks
    @DeleteMapping
    public String deleteDrink() {
        return"HTTP DELETE request recieved";
    }

    //Updates drinks
    @PutMapping
    public String updateDrink() {
        return"HTTP DELETE request recieved";
    }

}
