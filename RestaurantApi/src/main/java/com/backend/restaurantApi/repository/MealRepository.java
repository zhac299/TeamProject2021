package com.backend.restaurantApi.repository;

import com.backend.restaurantApi.model.Meal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository class for the Meal.
 */
@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
}