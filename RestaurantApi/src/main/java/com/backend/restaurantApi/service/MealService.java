package com.backend.restaurantApi.service;

import java.util.Optional;

import com.backend.restaurantApi.exception.MealNotFoundException;
import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.repository.MealRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MealService {

    @Autowired
    private MealRepository mealRepository;

    public Meal createNewMeal(Meal meal) {
        return mealRepository.save(meal);
    }

	public Meal getMealById(Long mealId) {
		Optional<Meal> optionalMeal = mealRepository.findById(mealId);

        if (!optionalMeal.isPresent()) {
            throw new MealNotFoundException("Meal Record is not available...");
        }
        return optionalMeal.get();
	}

	public Meal updateMeal(Long id, Meal meal) {
		meal.setMealId(id);
        return mealRepository.save(meal);
	}

	public void deleteMeal(Long id) {
        mealRepository.deleteById(id);
	}
    
}
