package com.backend.restaurantApi.repository;

import java.util.List;

import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.model.MenuItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    @Query(value = "select name, id, price FROM restaurant_menu WHERE peanuts = false", nativeQuery = true)
    public List<Object> filterByPeanuts();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE celery = false", nativeQuery = true)
    public List<Object> filterByCelery();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE gluten = false", nativeQuery = true)
    public List<Object> filterByGluten();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE crustaceans = false", nativeQuery = true)
    public List<Object>filterByCrustaceans();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE eggs = false", nativeQuery = true)
    public List<Object> filterByEggs();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE fish = false", nativeQuery = true)
    public List<Object> filterByFish();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE lupin = false", nativeQuery = true)
    public List<Object> filterByLupin();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE milk = false", nativeQuery = true)
    public List<Object> filterByMilk();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE molluscs = false", nativeQuery = true)
    public List<Object>filterByMolluscs();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE mustard = false", nativeQuery = true)
    public List<Object> filterByMustard();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE nuts = false", nativeQuery = true)
    public List<Object>filterByNuts();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE soya = false", nativeQuery = true)
    public List<Object> filterBySoya();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE sesameSeeds = false", nativeQuery = true)
    public List<Object> filterBySesameSeeds();

    @Query(value = "select name, id, price FROM restaurant_menu WHERE sulphites = false", nativeQuery = true)
    public List<Object> filterBySulphites();
}
