package com.backend.restaurantApi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.restaurantApi.exception.MenuCategoryNotFoundException;
import com.backend.restaurantApi.model.Ingredient;
import com.backend.restaurantApi.repository.IngredientRepository;

@Service
public class RestaurantStockService {

	@Autowired
	IngredientRepository ingredientRepository;

	public Ingredient createNewStock(Ingredient menuCategory) {
		return this.ingredientRepository.save(menuCategory);
	}

	public Ingredient findStockById(Long id) {
		Optional<Ingredient> ingredient = this.ingredientRepository.findById(id);
		if (ingredient.isPresent()) {
			return ingredient.get();
		} else
			throw new MenuCategoryNotFoundException("Ingredient not found...");
	}

	public Ingredient updatStock(Long id, Ingredient ingredient) {
		ingredient.setId(id);
		return ingredientRepository.save(ingredient);
	}

	public void deleteStock(Long id) {
		Optional<Ingredient> ingredient = ingredientRepository.findById(id);
		if (ingredient.isPresent()) {
			ingredientRepository.delete(ingredient.get());
		} else
			throw new MenuCategoryNotFoundException("Ingredient not found...");
	}
}
