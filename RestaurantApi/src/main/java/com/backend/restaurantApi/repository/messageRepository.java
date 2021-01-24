package com.backend.restaurantApi.repository;

import com.backend.restaurantApi.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface messageRepository extends JpaRepository<Message, Long> {
}
