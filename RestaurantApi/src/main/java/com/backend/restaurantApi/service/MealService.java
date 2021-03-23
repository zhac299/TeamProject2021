package com.backend.restaurantApi.service;

import java.util.Optional;

import com.backend.restaurantApi.exception.MealNotFoundException;
import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.repository.MealRepository;
import com.backend.restaurantApi.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MealService {

    /**
     * The Meal Repository used to query the database.
     */
    @Autowired
    private MealRepository mealRepository;
     /**
     * The Menu Repository used to query the database.
     */
    @Autowired
    private MenuRepository menuRepository;
    /**
     * The method for creating a new meal in the database.
     * 
     * @param meal the object representing the meal to be created in the database.
     * @return the state of the meal repository after adding the meal.
     */
    public Meal createNewMeal(Meal meal) {
//        if(meal.getOrder() == null){
//            Order order = new Order();
//            orderService.createNewOrder(order);
//            meal.setOrder(order);
//        }
        if(meal.getMenu()!=null){
            Optional<Menu> menu = menuRepository.findById(meal.getMenu().getId());
            if(menu.isPresent()) {
                meal.setMenu(menu.get());
            } else throw new MealNotFoundException("Menu item not found...");
        }
        return mealRepository.save(meal);
    }
    /**
     *  The method for retrieving a meal by id.
     * 
     * 
     * @param mealId the ID of the meal in question.
     * @return the object of meal associated with the ID.
     */
	public Meal getMealById(Long mealId) {
		Optional<Meal> optionalMenu = mealRepository.findById(mealId);

        if (!optionalMenu.isPresent()) {
            throw new MealNotFoundException("Meal Record is not available...");
        }
        return optionalMenu.get();
	}

	public Meal updateMeal(Long id, Meal meal) {
		meal.setId(id);
        return mealRepository.save(meal);
	}

	public void deleteMeal(Long id) {
        Optional<Meal> meal = mealRepository.findById(id);
        if (!meal.isPresent()) {
            throw new MealNotFoundException("Meal Record is not available...");
        }

        mealRepository.deleteById(id);
	}
}