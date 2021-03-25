package com.backend.restaurantApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.backend.restaurantApi.model.RestaurantTable;

/**
 * The repository of the RestaurantTable.
 */
@Repository
public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
    /**
     * Sellects everything from the restaurant table where is it marked as not occupied, to return all empty tables.
     * @return a list of table that are empty.
     */
    @Query
    (value = 
    "SELECT * FROM restaurant_table" +
    " WHERE is_occupied = false",
     nativeQuery = true)
    public List<RestaurantTable> getUnoccupiedTables();

    /**
     * Gets all tables that need help.
     * @return list of tables that need help.
     */
    @Query
    (value = 
    "SELECT * FROM restaurant_table" +
    " WHERE needs_help = true",
     nativeQuery = true)
    public List<RestaurantTable> getNeedHelpTables();
    
    RestaurantTable findByTableNumber(long tableNumber);
}