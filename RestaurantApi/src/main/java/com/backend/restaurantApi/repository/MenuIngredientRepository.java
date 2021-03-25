package com.backend.restaurantApi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.model.MenuIngredient;

/**
 * Repository class for the MenuIngredient.
 */
@Repository
public interface MenuIngredientRepository extends JpaRepository<MenuIngredient, Long> {
	List<MenuIngredient> findByMenu(Menu menu);
}