package com.backend.restaurantApi.repository;

import com.backend.restaurantApi.model.Allergens;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllergensRepository extends JpaRepository<Allergens, Long> {}