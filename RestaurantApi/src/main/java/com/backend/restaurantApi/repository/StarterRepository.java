package com.backend.restaurantApi.repository;


import com.backend.restaurantApi.model.Starter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StarterRepository extends JpaRepository<Starter, Long> {}