package com.backend.restaurantApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.restaurantApi.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {}
