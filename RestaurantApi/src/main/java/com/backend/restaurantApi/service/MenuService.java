package com.backend.restaurantApi.service;

import com.backend.restaurantApi.exception.MealNotFoundException;
import com.backend.restaurantApi.exception.MenuNotFoundException;
import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MenuService {

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    MealService mealService;

    public Menu createNewMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    public Menu addMenuMeal(Meal meal) {
        mealService.createNewMeal(meal);
        Optional<Menu> menu = menuRepository.findById(meal.getId());
        if(!menu.isPresent()){
            throw new MenuNotFoundException("Menu record is not available...");
        } else {
            menu.get().getMeal().add(meal);
        }
        return menuRepository.save(menu.get());
    }
}
