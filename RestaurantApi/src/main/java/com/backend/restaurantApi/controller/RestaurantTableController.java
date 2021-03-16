package com.backend.restaurantApi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.restaurantApi.model.RestaurantTable;
import com.backend.restaurantApi.repository.RestaurantTableRepository;
import com.backend.restaurantApi.service.RestaurantTableService;

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

    @PutMapping("/tables/{id}")
    public RestaurantTable updateRestaurantTable(@RequestBody RestaurantTable table, @PathVariable Long id) {
        System.out.println(table);
        return restaurantTableService.updateRestaurantTable(table, id);
    }
    /**
     * Updates the tables number and calls the service to update the repo.
     * 
     * @param tableNumber the new table number
     * @param table the intial table 
     * @return the updated RestaurantTable
     */
    @PutMapping("/tables/updateTableNumber/{tableNumber}")
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
    @PutMapping("/tables/updateNeedsHelp/{needsHelp}")
    public RestaurantTable updateRestaurantTableNeedsHelp
    (@PathVariable("needsHelp") boolean needsHelp, @RequestBody RestaurantTable table) {
        return restaurantTableService.updateRestaurantTableNeedsHelp(table, needsHelp);
    }

    @PutMapping("/tables/updateIsReady/{isReady}")
    public RestaurantTable updateRestaurantTableIsReady
    (@PathVariable("isReady") boolean isReady, @RequestBody RestaurantTable table) {
        return restaurantTableService.updateRestaurantTableIsReady(table, isReady);
    }
    
    /**
     * Updates the isOccupied field and calls the service to update the repo.
     * 
     * @param isOccupied the new isOccupied field
     * @param table the table to be updated
     * @return the updated table
     */
    @PutMapping("/tables/updateIsOccupied/{isOccupied}")
    public RestaurantTable updateRestaurantTableIsOccupied
    (@PathVariable("isOccupied") boolean isOccupied, @RequestBody RestaurantTable table) {
        return restaurantTableService.updateRestaurantTableIsOccupied(table, isOccupied);
    }

    /**
     * Fetches a table by its number by calling the service.
     * 
     * @param tableNumber the table number of the table
     * @param table the tables table 
     * @return the table 
     */
    @GetMapping("/tables/{tableNumber}")
    public RestaurantTable getTableByNumber(@PathVariable("tableNumber") Long tableNumber) {
        return restaurantTableService.getTableByNumber(tableNumber);
    }

    /**
     * Deletes a table by its table number by calling the service method to update the repo.
     * 
     * @param tableNumber the table number to be deleted
     */
    @DeleteMapping("/tables/{tableNumber}")
    public void deleteTable(@PathVariable("tableNumber") Long tableNumber) {
        restaurantTableService.deleteRestaurantTable(tableNumber);
    }

    /**
     * Gets all the unoccupied tables in the table.
     * 
     * @return a list of unoccupied tables
     */
    @GetMapping("/tables/unoccupied")
    public List<RestaurantTable> getUnoccupiedTables() {
        return restaurantTableService.getUnoccupiedTables();
    }

    /**
     * Gets all the tables that need help.
     * 
     * @return a list of all the tables that need help
     */
    @GetMapping("/tables/needHelp")
    public List<RestaurantTable> getNeedHelpTables() {
        return restaurantTableService.getNeedHelpTables();
    }
    
    /**
     * Creates a new table and calls the service to add it to the repo.
     * 
     * @param table the new table to be added
     * @return the updated Restaurant Table
     */
    @PostMapping("/tables/assignTable")
    public RestaurantTable assignTableToWaiter(@RequestBody RestaurantTable restaurantTable){
        return restaurantTableService.assignTableToWaiter(restaurantTable);
    }
}