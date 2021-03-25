package com.backend.restaurantApi.service;

import com.backend.restaurantApi.exception.MenuCategoryNotFoundException;
import com.backend.restaurantApi.model.MenuCategory;
import com.backend.restaurantApi.repository.MenuCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * The Service class of the MenuCategory model that handles the CRUD API functionality on the model.
 */
@Service
public class MenuCategoryService {

    /**
     * The Menu Category Repository used to query the database.
     */
    @Autowired
    MenuCategoryRepository menuCategoryRepository;
    /**
     * The method for creating a new menu category to the database. 
     * 
     * 
     * @param menuCategory the category to be added.
     * @return the state of the menu category repository after adding the category.
     */
    public MenuCategory createNewCategory(MenuCategory menuCategory) {
        return this.menuCategoryRepository.save(menuCategory);
    }
    /**
     * The method involved in finding a paticular category from the database.
     * 
     * 
     * @param id the ID of the desired category.
     * @return the desire category or exception if it doesn't exist.
     */
    public MenuCategory findCategoryById(Long id) {
        Optional<MenuCategory> menuCategory =  this.menuCategoryRepository.findById(id);
        if (menuCategory.isPresent()) {
            return menuCategory.get();
        } else throw new MenuCategoryNotFoundException("Menu Category not found...");
    }

    /**
     * The method for updating the menu category with a new id.
     * 
     * 
     * @param id the ID involved with the update. 
     * @param menuCategory the category in which its current ID is going to be updated.
     * @return the state of the menu category repository after updating the ID.
     */
    public MenuCategory updateMenuCategory(Long id, MenuCategory menuCategory) {
        menuCategory.setId(id);
        return menuCategoryRepository.save(menuCategory);
    }

    /**
     * The method for deleting a menu category from the database.
     * 
     * 
     * @param id the ID for the menu category to be deleted.
     */
    public void deleteMenuCategory(Long id) {
        Optional<MenuCategory> menuCategory = menuCategoryRepository.findById(id);
        if (menuCategory.isPresent()) {
            menuCategoryRepository.delete(menuCategory.get());
        } else throw new MenuCategoryNotFoundException("Menu Category not found...");
    }
}
