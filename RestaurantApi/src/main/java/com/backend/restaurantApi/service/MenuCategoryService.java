package com.backend.restaurantApi.service;

import com.backend.restaurantApi.exception.MenuCategoryNotFoundException;
import com.backend.restaurantApi.model.MenuCategory;
import com.backend.restaurantApi.repository.MenuCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MenuCategoryService {

    @Autowired
    MenuCategoryRepository menuCategoryRepository;

    public MenuCategory createNewCategory(MenuCategory menuCategory) {
        return this.menuCategoryRepository.save(menuCategory);
    }

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
