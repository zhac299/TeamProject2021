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

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class RestaurantStockController {

	@Autowired
	IngredientRepository ingredientRepository;

	@Autowired
	RestaurantStockService restaurantStockService;

	@GetMapping("/stock")
	public List<Ingredient> findAll() {
		return ingredientRepository.findAll();
	}

	@PostMapping("/stock")
	public Ingredient createNewStock(@RequestBody Ingredient ingredient) {
		return restaurantStockService.createNewStock(ingredient);
	}

	@GetMapping("/stock/{id}")
	public Ingredient getStockById(@PathVariable("id") Long id) {
		return restaurantStockService.findStockById(id);
	}

	@PutMapping("/stock/{id}")
	public Ingredient updatStock(@PathVariable("id") Long id, @RequestBody Ingredient ingredient) {
		return restaurantStockService.updatStock(id, ingredient);
	}

	@DeleteMapping("/stock/{id}")
	public void deleteStock(@PathVariable("id") Long id) {
		restaurantStockService.deleteStock(id);
	}
}
