package com.backend.restaurantApi.service;

import java.util.Optional;

import com.backend.restaurantApi.exception.MenuNotFoundException;
import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.repository.MealRepository;
import com.backend.restaurantApi.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MealService {

    @Autowired
    private MealRepository mealRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private OrderService orderService;

    public Meal createNewMeal(Meal meal) {
        if(meal.getOrder() == null){
            Order order = new Order();
            orderService.createNewOrder(order);
            meal.setOrder(order);
        }
        return mealRepository.save(meal);
    }

	public Menu getMealById(Long mealId) {
		Optional<Menu> optionalMenu = menuRepository.findById(mealId);

        if (!optionalMenu.isPresent()) {
            throw new MenuNotFoundException("Meal Record is not available...");
        }
        return optionalMenu.get();
	}

	public Meal updateMeal(Long id, Meal meal) {
		meal.setId(id);
        return mealRepository.save(meal);
	}

	public void deleteMeal(Long id) {
        mealRepository.deleteById(id);
	}
    
}
