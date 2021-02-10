package com.backend.restaurantApi.repository;

import java.util.List;

import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.model.MenuItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    @Query(value = "select * FROM restaurant_menu WHERE peanuts = false", nativeQuery = true)
    public List<Menu> filterByPeanuts();

    @Query(value = "select * FROM restaurant_menu WHERE celery = false", nativeQuery = true)
    public List<Menu> filterByCelery();

    @Query(value = "select * FROM restaurant_menu WHERE gluten = false", nativeQuery = true)
    public List<Menu> filterByGluten();

    @Query(value = "select * FROM restaurant_menu WHERE crustaceans = false", nativeQuery = true)
    public List<Menu>filterByCrustaceans();

    @Query(value = "select * FROM restaurant_menu WHERE eggs = false", nativeQuery = true)
    public List<Menu> filterByEggs();

    @Query(value = "select * FROM restaurant_menu WHERE fish = false", nativeQuery = true)
    public List<Menu> filterByFish();

    @Query(value = "select * FROM restaurant_menu WHERE lupin = false", nativeQuery = true)
    public List<Menu> filterByLupin();

    @Query(value = "select * FROM restaurant_menu WHERE milk = false", nativeQuery = true)
    public List<Menu> filterByMilk();

    @Query(value = "select * FROM restaurant_menu WHERE molluscs = false", nativeQuery = true)
    public List<Menu>filterByMolluscs();

    @Query(value = "select * FROM restaurant_menu WHERE mustard = false", nativeQuery = true)
    public List<Menu> filterByMustard();

    @Query(value = "select * FROM restaurant_menu WHERE nuts = false", nativeQuery = true)
    public List<Menu>filterByNuts();

    @Query(value = "select * FROM restaurant_menu WHERE soya = false", nativeQuery = true)
    public List<Menu> filterBySoya();

    @Query(value = "select * FROM restaurant_menu WHERE sesameSeeds = false", nativeQuery = true)
    public List<Menu> filterBySesameSeeds();

    @Query(value = "select * FROM restaurant_menu WHERE sulphites = false", nativeQuery = true)
    public List<Menu> filterBySulphites();
}
