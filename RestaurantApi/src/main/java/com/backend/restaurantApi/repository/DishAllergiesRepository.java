package com.backend.restaurantApi.repository;

import com.backend.restaurantApi.model.DishAllergies;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DishAllergiesRepository extends JpaRepository<DishAllergies, Long> {}