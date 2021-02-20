package com.backend.restaurantApi.service;

import com.backend.restaurantApi.exception.RestaurantTableNotFoundException;
import com.backend.restaurantApi.model.RestaurantTable;
import com.backend.restaurantApi.repository.RestaurantTableRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * The Service clas of the ResturantTable model  that handles
 * creating the the table, updating it and getting information from it.
 */
@Service
public class RestaurantTableService {
    
    /**
     * Autowires to the the custom repository.
     */
    @Autowired
    RestaurantTableRepository restaurantTableRepository;

    /**
     * Creates a new Restaurant Table and upates the repository.
     * 
     * @param restaurantTable the new restaurant table
     * @return the updated repository
     */
    public RestaurantTable createNewRestaurantTable(RestaurantTable restaurantTable) {
        return restaurantTableRepository.save(restaurantTable);
    }

    /**
     * Changes the number of a restaurant table number with a new one.
     * 
     * @param restaurantTable the restaurant table that needs to be changed
     * @param newTableNumber the new table number
     * @return the updated repository
     */
    public RestaurantTable updateRestaurantTableNumber(RestaurantTable restaurantTable, long newTableNumber) {
		restaurantTable.setTableNumber(newTableNumber);
        return restaurantTableRepository.save(restaurantTable);
	}

    /**
     * Changes the needsHelp field of a restaurant table with a new one.
     * 
     * @param restaurantTable the restaurant table that needs to be changed
     * @param newNeedsHelp the new needsHelp field
     * @return the updated repository
     */
    public RestaurantTable updateRestaurantTableNeedsHelp(RestaurantTable restaurantTable, boolean newNeedsHelp) {
		restaurantTable.setNeedsHelp(newNeedsHelp);
        return restaurantTableRepository.save(restaurantTable);
	}

    /**
     * Changes the isOccupied field of a restaurant table with a new one.
     * 
     * @param restaurantTable the restaurant table that needs to be changed
     * @param newIsOccupied the new isOccupied field
     * @return the updated repository
     */
    public RestaurantTable updateRestaurantTableIsOccupied(RestaurantTable restaurantTable, boolean newIsOccupied) {
		restaurantTable.setIsOccupied(newIsOccupied);
        return restaurantTableRepository.save(restaurantTable);
	}

    /**
     * Gets a table by its table number.
     * 
     * @param tableNumber the number of the table to be returned
     * @return the table
     */
    public RestaurantTable getTableByNumber(long tableNumber) {
		Optional<RestaurantTable> table = RestaurantTableRepository.findById(tableNumber);

        if (!table.isPresent()) {
            throw new RestaurantTableNotFoundException("Restaurant Table Record is not available...");
        }
        return table.get();
	}

    /**
     * Deletes a table by its number.
     * 
     * @param tableNumber the table number of the table
     */
    public void deleteRestaurantTable(Long tableNumber) {
        RestaurantTableRepository.deleteById(tableNumber);
	}
}
