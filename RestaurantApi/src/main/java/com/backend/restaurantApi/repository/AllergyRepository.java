package com.backend.restaurantApi.repository;


import com.backend.restaurantApi.model.Allergy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllergyRepository extends JpaRepository<Allergy, Long> {}