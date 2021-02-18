package com.backend.restaurantApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.restaurantApi.model.RestaurantTable;

/**
 * The repository of the RestaurantTable.
 */
@Repository
public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {}