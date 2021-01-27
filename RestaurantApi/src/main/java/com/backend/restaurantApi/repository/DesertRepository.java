package com.backend.restaurantApi.repository;


import com.backend.restaurantApi.model.Desert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesertRepository extends JpaRepository<Desert, Long> {}