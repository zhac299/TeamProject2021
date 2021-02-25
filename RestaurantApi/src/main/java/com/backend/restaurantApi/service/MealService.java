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

    @Autowired
    private MenuService menuService;

    public Meal createNewMeal(Meal meal, Long menu_id) {
        if(meal.getOrder() == null){
            Order order = new Order();
            orderService.createNewOrder(order);
            meal.setOrder(order);
        }
        if(meal.getMenu() != null){
            throw new MenuNotFoundException("Menu Item already set!");
        }
        Optional<Menu> orderedMenuItem = menuRepository.findById(menu_id);
        if(!orderedMenuItem.isPresent()){
            throw new MenuNotFoundException("Menu item not found...");
        } else {
            meal.setMenu(orderedMenuItem.get());
        }
        return mealRepository.save(meal);
    }

	public Meal getMealById(Long mealId) {
		Optional<Meal> optionalMenu = mealRepository.findById(mealId);

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
