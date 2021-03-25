package com.backend.restaurantApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.restaurantApi.model.Ingredient;

/**
 * Repository class for the Ingredients.
 */
@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {}
