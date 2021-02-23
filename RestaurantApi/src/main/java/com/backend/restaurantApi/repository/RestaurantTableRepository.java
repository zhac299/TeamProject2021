package com.backend.restaurantApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.backend.restaurantApi.model.RestaurantTable;

/**
 * The repository of the RestaurantTable.
 */
@Repository
public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
    @Query
    (value = 
    "SELECT * FROM restaurant_table" +
    " WHERE is_occupied = false",
     nativeQuery = true)
    public List<RestaurantTable> getUnoccupiedTables();

    @Query
    (value = 
    "SELECT * FROM restaurant_table" +
    " WHERE needs_help = true",
     nativeQuery = true)
    public List<RestaurantTable> getNeedHelpTables();
}