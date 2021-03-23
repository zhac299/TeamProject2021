package com.backend.restaurantApi.service;

import com.backend.restaurantApi.exception.MenuCategoryNotFoundException;
import com.backend.restaurantApi.model.MenuCategory;
import com.backend.restaurantApi.repository.MenuCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MenuCategoryService {

    /**
     * The Menu Category Repository used to query the database.
     */
    @Autowired
    MenuCategoryRepository menuCategoryRepository;
    /**
     * The method for creating a new menu category. 
     * 
     * @param menuCategory the category to be added.
     * @return the state of the menu category repository after adding the category.
     */
    public MenuCategory createNewCategory(MenuCategory menuCategory) {
        return this.menuCategoryRepository.save(menuCategory);
    }
    /**
     * The method involved in finding a paticular category.
     * @param id the ID of the desired category.
     * @return the desire category or exception if it doesn't exist.
     */
    public MenuCategory findCategoryById(Long id) {
        Optional<MenuCategory> menuCategory =  this.menuCategoryRepository.findById(id);
        if (menuCategory.isPresent()) {
            return menuCategory.get();
        } else throw new MenuCategoryNotFoundException("Menu Category not found...");
    }

    public MenuCategory updateMenuCategory(Long id, MenuCategory menuCategory) {
        menuCategory.setId(id);
        return menuCategoryRepository.save(menuCategory);
    }

    public void deleteMenuCategory(Long id) {
        Optional<MenuCategory> menuCategory = menuCategoryRepository.findById(id);
        if (menuCategory.isPresent()) {
            menuCategoryRepository.delete(menuCategory.get());
        } else throw new MenuCategoryNotFoundException("Menu Category not found...");
    }
}
