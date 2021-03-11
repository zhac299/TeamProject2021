package com.backend.restaurantApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.restaurantApi.model.WaiterTable;

/**
 * @author Yuwarajj
 *
 */
/**
 * The repository of the WaiterTable.
 */
@Repository
public interface WaiterTableRepository extends JpaRepository<WaiterTable, Long> {
}