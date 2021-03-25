package com.backend.restaurantApi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.restaurantApi.exception.MenuCategoryNotFoundException;
import com.backend.restaurantApi.model.Ingredient;
import com.backend.restaurantApi.repository.IngredientRepository;

/**
 * The Service class that handles the CRUD API functionality of the stock for dishes.
 */
@Service
public class RestaurantStockService {
    /**
     * The ingerdient repository to be autowired.
     */
	@Autowired
	IngredientRepository ingredientRepository;
    /**
     * This method is tasked with updating the ingredient repository with new stock.
     * 
     * @param menuCategory The ingredient to be added to the repository.
     * @return The saved state o the repository after the new ingredient has been added.
     */
	public Ingredient createNewStock(Ingredient menuCategory) {
		return this.ingredientRepository.save(menuCategory);
	}

    /**
     * This method is purposed with finding stock based on its ID.
     * 
     * @param id The ID of the stock item in question.
     * @return The ingredient associated with the given ID.
     */
	public Ingredient findStockById(Long id) {
		Optional<Ingredient> ingredient = this.ingredientRepository.findById(id);
		if (ingredient.isPresent()) {
			return ingredient.get();
		} else
			throw new MenuCategoryNotFoundException("Ingredient not found...");
	}
    /**
     * This method is tasked with updating the ID of an ingredient.
     * 
     * @param id The new ID for the stock item.
     * @param ingredient the ingredient to be updated.
     * @return the saved state of the ingredient repository after the update.
     */
	public Ingredient updatStock(Long id, Ingredient ingredient) {
		ingredient.setId(id);
		return ingredientRepository.save(ingredient);
	}

    /**
     * Thsi method is tasked with deleting a stock item from the database by ID.
     * 
     * @param id The ID of the stock item to be deleted.
     */
	public void deleteStock(Long id) {
		Optional<Ingredient> ingredient = ingredientRepository.findById(id);
		if (ingredient.isPresent()) {
			ingredientRepository.delete(ingredient.get());
		} else
			throw new MenuCategoryNotFoundException("Ingredient not found...");
	}
}
