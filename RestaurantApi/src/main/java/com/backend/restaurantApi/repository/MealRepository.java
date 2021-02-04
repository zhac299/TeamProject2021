package com.backend.restaurantApi.repository;

import com.backend.restaurantApi.model.Meal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {}