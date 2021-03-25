package com.backend.restaurantApi.repository;

import com.backend.restaurantApi.model.MenuCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository class for the MenuCategory.
 */
@Repository
public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {}
