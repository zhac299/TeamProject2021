package com.backend.restaurantApi.repository;

import java.util.List;

import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    @Query(value = "SELECT name FROM Menu WHERE peanuts = false")
    public Menu filterByPeanuts();

    @Query(value = "SELECT name FROM Menu WHERE celery = false")
    public Menu filterByCelery();

    @Query(value = "SELECT name FROM Menu WHERE gluten = false")
    public Menu filterByGluten();

    @Query(value = "SELECT name FROM Menu WHERE crustaceans = false")
    public Menu filterByCrustaceans();

    @Query(value = "SELECT name FROM Menu WHERE eggs = false")
    public Menu filterByEggs();

    @Query(value = "SELECT name FROM Menu WHERE fish = false")
    public Menu filterByFish();

    @Query(value = "SELECT name FROM Menu WHERE lupin = false")
    public Menu filterByLupin();

    @Query(value = "SELECT name FROM Menu WHERE milk = false")
    public Menu filterByMilk();

    @Query(value = "SELECT name FROM Menu WHERE molluscs = false")
    public Menu filterByMolluscs();

    @Query(value = "SELECT name FROM Menu WHERE mustard = false")
    public Menu filterByMustard();

    @Query(value = "SELECT name FROM Menu WHERE nuts = false")
    public Menu filterByNuts();

    @Query(value = "SELECT name FROM Menu WHERE soya = false")
    public Menu filterBySoya();

    @Query(value = "SELECT name FROM Menu WHERE sesame_seeds = false")
    public Menu filterBySesameSeeds();

    @Query(value = "SELECT name FROM Menu WHERE sulphites = false")
    public Menu filterBySulphites();
}
