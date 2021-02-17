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
    (value = "SELECT id FROM staff  WHERE :user_name = username AND :password = password ", nativeQuery = true)

    List<Staff> getStaffMember(@Param("username") String userName, @Param("password")String password);

}