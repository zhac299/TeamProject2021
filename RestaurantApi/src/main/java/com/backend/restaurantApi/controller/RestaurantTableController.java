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
    public RestaurantTable createNewRestaurantTable(@RequestBody RestaurantTable table){
        return restaurantTableService.createNewRestaurantTable(table);
    }

    /**
     * Updates the tables number and calls the service to update the repo.
     * 
     * @param tableNumber the new table number
     * @param table the intial table 
     * @return the updated RestaurantTable
     */
    @PutMapping("/tables/tableNumber/{tableNumber}")
    public RestaurantTable updateRestaurantTableNumber
    (@PathVariable("tableNumber") long tableNumber, @RequestBody RestaurantTable table) {
        return restaurantTableService.updateRestaurantTableNumber(table, tableNumber);
    }

    /**
     * Updates the needsHelp field and calls the service to update the repo.
     * 
     * @param needsHelp the new needsHelp field
     * @param table the intial table 
     * @return the updated RestaurantTable
     */
    @PutMapping("/tables/needsHelp/{needsHelp}")
    public RestaurantTable updateRestaurantNeedsHelp
    (@PathVariable("needsHelp") boolean needsHelp, @RequestBody RestaurantTable table) {
        return restaurantTableService.updateRestaurantTableNeedsHelp(table, needsHelp);
    }

    
    /**
     * Updates the isOccupied field and calls the service to update the repo.
     * 
     * @param isOccupied the new isOccupied field
     * @param table the table to be updated
     * @return the updated table
     */
    @PutMapping("/tables/isOccupied/{isOccupied}")
    public RestaurantTable updateRestaurantIsOccupied
    (@PathVariable("isOccupied") boolean isOccupied, @RequestBody RestaurantTable table) {
        return restaurantTableService.updateRestaurantTableIsOccupied(table, isOccupied);
    }

    @PutMapping("/tables/{tableNumber}")
    public RestaurantTable updateOrder(@PathVariable("tableNumber") Long id, @RequestBody RestaurantTable table) {
        return restaurantTableService.getTableByNumber(id);
    }
}
