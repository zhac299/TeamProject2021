package com.backend.restaurantApi.repository;


import com.backend.restaurantApi.model.Staff;

import  java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    @Query
    (value ="SELECT * from staff  WHERE :user_name = user_name AND :password = password", nativeQuery = true)
    List<Staff> getStaffMember(@Param("user_name") String userName, @Param("password")String password);
    
    @Query
    (value ="SELECT * from staff where is_waiter = true ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Staff getRandomWaiter();

}