package com.backend.restaurantApi.repository;


import com.backend.restaurantApi.model.Staff;

import  java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository class for the Staff.
 */
@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    /**
     * Gets a specific staff member from the database according to if the username and password matches.
     * @param userName of the staff member.
     * @param password of the staff member.
     * @return a list of matching staff members.
     */
    @Query
    (value ="SELECT * from staff  WHERE :user_name = user_name AND :password = password", nativeQuery = true)
    List<Staff> getStaffMember(@Param("user_name") String userName, @Param("password")String password);
    
    /**
     * Gets a random waiter.
     * @return random Staff object.
     */
    @Query
    (value ="SELECT * from staff where is_waiter = true ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Staff getRandomWaiter();

}