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

    /**
     * Updates the table in the repo.
     * 
     * @param table the updated table
     * @param id the table id
     * @return the updated table saved in the repo
     */
    @PutMapping("/tables/{id}")
    public RestaurantTable updateRestaurantTable(@RequestBody RestaurantTable table, @PathVariable Long id) {
        return restaurantTableService.updateRestaurantTable(table, id);
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


    
    /** 
     * Allows a manager to assign a waiter to a table.
     * 
     * @param staffId the id of the waiter who is being assigned to a table.
     * @param tableId the id/tableNumber of the table being assigned a waiter.
     * @return the table which has been assigned a table.
     */
    @PutMapping("/tables/manager/assignTable/{staffId}/{tableId}")
    public RestaurantTable managerAssignTable(@PathVariable("staffId") long staffId, @PathVariable("tableId") long tableId) {
        RestaurantTable table = restaurantTableRepository.findByTableNumber(tableId);
        return restaurantTableService.mangagerAssignWaiterToTable(table, staffId);
    }
}