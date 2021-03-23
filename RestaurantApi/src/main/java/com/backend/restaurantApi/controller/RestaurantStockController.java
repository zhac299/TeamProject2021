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

import com.backend.restaurantApi.model.Ingredient;
import com.backend.restaurantApi.repository.IngredientRepository;
import com.backend.restaurantApi.service.RestaurantStockService;

/**
 * The Controller of the RestaurantStock.
 */
@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class RestaurantStockController {

	/**
	 * Autowires to the Ingredient repo.
	 */
	@Autowired
	IngredientRepository ingredientRepository;

	/**
	 * Autowires to the RestaurantStock service.
	 */
	@Autowired
	RestaurantStockService restaurantStockService;

	/**
	 * Gets all the ingredients from the ingredient repo.
	 * @return a list of all ingredients.
	 */
	@GetMapping("/stock")
	public List<Ingredient> findAll() {
		return ingredientRepository.findAll();
	}

	/**
	 * Creates a new ingredient to add to the stock.
	 * @param ingredient you want to add.
	 * @return the added ingredient object.
	 */
	@PostMapping("/stock")
	public Ingredient createNewStock(@RequestBody Ingredient ingredient) {
		return restaurantStockService.createNewStock(ingredient);
	}

	/**
	 * Retrieves ingredient by its id.
	 * @param id of the ingredient.
	 * @return the ingredient object.
	 */
	@GetMapping("/stock/{id}")
	public Ingredient getStockById(@PathVariable("id") Long id) {
		return restaurantStockService.findStockById(id);
	}

	/**
	 * Updates existing stock with new ingredient calling the service to update the repo.
	 * @param id of stock.
	 * @param ingredient to update stock with.
	 * @return the Ingredient object.
	 */
	@PutMapping("/stock/{id}")
	public Ingredient updatStock(@PathVariable("id") Long id, @RequestBody Ingredient ingredient) {
		return restaurantStockService.updatStock(id, ingredient);
	}

	/**
	 * Deletes ingredient from stock by id.
	 * @param id of the ingredient to be deleted.
	 */
	@DeleteMapping("/stock/{id}")
	public void deleteStock(@PathVariable("id") Long id) {
		restaurantStockService.deleteStock(id);
	}
}
