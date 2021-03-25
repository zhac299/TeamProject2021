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

/**
 * The Service class of the Menu model that handles the CRUD API functionality on the model.
 */
@Service
public class MenuService {

    /**
     * The Menu Repository used to query the database.
     */
    @Autowired
    MenuRepository menuRepository;

    /**
     * The repository used to make ingredient related queries.
     */
    @Autowired
    MenuIngredientRepository menuIngredientRepository;

     /**
     * The second repository used to make ingredient related queries.
     */
    @Autowired
    IngredientRepository ingredientRepository;
    
    /**
     * The service involved with the meals on the database. 
     */
    @Autowired
    MealService mealService;

    /**
     * The enity manager.
     */
    @Autowired
    EntityManager em;

    /**
     * The method for creating a new menu in the database.
     * 
     * @param menu the object to be added to the database.
     * @return the state of the meal repository after adding the meal.
     */
    public Menu createNewMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    /**
     * The method for adding a list of ingredients to the meal.
     * 
     * 
     * @param id the ID of the meal in which the ingredients will be added to.
     * @param ingredients the list of ingredients to be added.
     * @return the state of the meal repository after adding the ingredients.
     */
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
    
    /**
     * The method for retrieving ingredients from the database.
     * 
     * 
     * @param id the id of the menu oject in which you want to get ingredients from.
     * @return the list of ingredients of the menu object.
     */
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

    /**
     * The method for adding a meal to the menu in the database.
     * 
     * 
     * @param meal the meal object to be added in the database.
     * @param id 
     * @return
     */
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

    
    /**
     * Used to filter through each allergen. 
     * 
     * @param peanuts allergin.
     * @param celery allergin.
     * @param gluten allergin.
     * @param crustaceans allergin.
     * @param eggs allergin.
     * @param fish allergin.
     * @param lupin allergin.
     * @param milk allergin.
     * @param molluscs allergin.
     * @param mustard allergin.
     * @param nuts allergin.
     * @param soya allergin.
     * @param sesame_seeds allergin.
     * @param sulphites allergin.
     * @param calories allergin.
     * @return a list of dishes filtered by allergen.
     */
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
    
    /** 
     * Updates the id of a Menu item.
     * 
     * @param id the value the Id is being set to.
     * @param menu the menu item being updated.
     * @return the updated menu item.
     */
    public Menu updateMenuItem(Long id, Menu menu) {
		menu.setMenuId(id);
        return menuRepository.save(menu);
	}
    
    /** 
     * Deletes the menu item from the database by id.
     * 
     * @param id the menu entry being deleted.
     */
    public void deleteMenuItem(Long id) {
        menuRepository.deleteById(id);
	}

    
    /** 
     * Gets a specific menu item by its id. If it doesn't exist a MenuNotFoundException exception is thrown.
     * 
     * @param id the id of the menu item that is going to be returned.
     * @return the menu item which the id is assocaited with.
     */
    public Menu getMenuById(Long id) {
        Optional<Menu> menu = menuRepository.findById(id);
        if(!menu.isPresent()) {
            throw new MenuNotFoundException("Menu record is not available...");
        }
        return menu.get();
    }

    
    /** 
     * Gets and returns a list of menu items which are in a category specified by the param value.
     * 
     * @param category the category the menu items are being filterd by,
     * @return the menu items in the specified category.
     */
    public List<Menu> getMenuByCategory(String category) {
        return this.menuRepository.getMenuByCategory(category);
    }

}