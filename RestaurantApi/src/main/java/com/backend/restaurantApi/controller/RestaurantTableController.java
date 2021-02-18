package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.RestaurantTable;
import com.backend.restaurantApi.repository.RestaurantTableRepository;
import com.backend.restaurantApi.service.RestaurantTableService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The Controller of the Restaurant Table.
 */
@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class RestaurantTableController {
    
    /**
     * Autowires to the the Restaurant Table repository.
     */
    @Autowired
    RestaurantTableRepository restaurantTableRepository;

    /**
     * Autowires to the Restaurant Table Service.
     */
    @Autowired
    RestaurantTableService restaurantTableService;

    /**
     * Fetches all the elements in the table.
     * 
     * @return a list with all the tables
     */
    @GetMapping("/tables")
    public List<RestaurantTable> index() {
        return restaurantTableRepository.findAll();
    }  

    /**
     * Creates a new table and calls the service to add it to the repo.
     * 
     * @param table the new table to be added
     * @return the updated Restaurant Table
     */
    @PostMapping("/tables")
    public RestaurantTable createNewMeal(@RequestBody RestaurantTable table){
        return restaurantTableService.createNewRestaurantTable(table);
    }

    @PutMapping("/tables/{tableNumber}")
    public RestaurantTable updateRestaurantTableNumber
    (@PathVariable("tableNumber") long tableNumber, @RequestBody RestaurantTable table) {
        return restaurantTableService.updateRestaurantTableNumber(table, tableNumber);
    }
}
