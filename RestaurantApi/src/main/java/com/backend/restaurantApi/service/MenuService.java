package com.backend.restaurantApi.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.restaurantApi.exception.MenuNotFoundException;
import com.backend.restaurantApi.model.Ingredient;
import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.model.MenuIngredient;
import com.backend.restaurantApi.repository.IngredientRepository;
import com.backend.restaurantApi.repository.MenuIngredientRepository;
import com.backend.restaurantApi.repository.MenuRepository;

@Service
public class MenuService {

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    MenuIngredientRepository menuIngredientRepository;

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    MealService mealService;

    @Autowired
    EntityManager em;

    public Menu createNewMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    @Transactional
    public Menu addIngredients(Long id, List<Long> ingredients) {
    	Optional<Menu> menu = menuRepository.findById(id);
    	Menu m = null;
        if (!menu.isPresent()) {
            throw new MenuNotFoundException("Menu record is not available...");
        } else {
        	m = menu.get();
        	em.createNativeQuery("delete from menu_ingredient where restaurant_menu_item = "+m.getId()).executeUpdate();
            for(int i = 0; i < ingredients.size(); i++) {
            	MenuIngredient mIng = new MenuIngredient();
            	Optional<Ingredient> ing = ingredientRepository.findById(ingredients.get(i));
                if (ing.isPresent()) {
                	mIng.setMenu(m);
                	mIng.setIngredient(ing.get());
                	menuIngredientRepository.save(mIng);
                }
            }
        }
        return m;
    }
    
    public List<MenuIngredient> getIngredients(Long id) {
    	Optional<Menu> menu = menuRepository.findById(id);
    	Menu m = null;
        if (!menu.isPresent()) {
            throw new MenuNotFoundException("Menu record is not available...");
        } else {
        	m = menu.get();
        	return menuIngredientRepository.findByMenu(m);
        }
    }

    public Menu addMenuMeal(Meal meal, Long id) {
        // Check if menu with 'id' exists
        Optional<Menu> menu = menuRepository.findById(id);
        if (!menu.isPresent()) {
            throw new MenuNotFoundException("Menu record is not available...");
        } else {
            mealService.createNewMeal(meal);
        }
        return menuRepository.save(menu.get());
    }

    public List<Menu> filter(
        Boolean peanuts, 
        Boolean celery,
        Boolean gluten,
        Boolean crustaceans,
        Boolean eggs,
        Boolean fish,
        Boolean lupin,
        Boolean milk,
        Boolean molluscs,
        Boolean mustard,
        Boolean nuts,
        Boolean soya,
        Boolean sesame_seeds,
        Boolean sulphites,
        Double calories) {
        return menuRepository.filter(
            peanuts,
            celery,
            gluten,
            crustaceans,
            eggs,
            fish,
            lupin,
            milk,
            molluscs,
            mustard,
            nuts,
            soya,
            sesame_seeds,
            sulphites,
            calories);
    }
    public Menu updateMenuItem(Long id, Menu menu) {
		menu.setMenuId(id);
        return menuRepository.save(menu);
	}
    public void deleteMenuItem(Long id) {
        menuRepository.deleteById(id);
	}

    public Menu getMenuById(Long id) {
        Optional<Menu> menu = menuRepository.findById(id);
        if(!menu.isPresent()) {
            throw new MenuNotFoundException("Menu record is not available...");
        }
        return menu.get();
    }

    public List<Menu> getMenuByCategory(String category) {
        return this.menuRepository.getMenuByCategory(category);
    }

}