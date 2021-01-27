package com.backend.restaurantApi.repository;


import com.backend.restaurantApi.model.Main;
import com.backend.restaurantApi.model.Side;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SideRepository extends JpaRepository<Side, Long> {}