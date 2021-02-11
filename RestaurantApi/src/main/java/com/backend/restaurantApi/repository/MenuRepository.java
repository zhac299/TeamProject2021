package com.backend.restaurantApi.repository;

import java.util.List;

import com.backend.restaurantApi.model.Menu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    @Query
    (value = 
    " SELECT * FROM restaurant_menu" +
    " WHERE " + 
    " (1 = CASE WHEN :peanuts = true THEN peanuts = false ELSE 1 END AND" +
    " 1 = CASE WHEN :celery = true THEN celery = false ELSE 1 END AND" +
    " 1 = CASE WHEN :gluten = true THEN gluten = false ELSE 1 END AND" +
    " 1 = CASE WHEN :crustaceans = true THEN crustaceans = false ELSE 1 END AND" + 
    " 1 = CASE WHEN :eggs = true THEN eggs = false ELSE 1 END AND" +
    " 1 = CASE WHEN :fish = true THEN fish = false ELSE 1 END AND" +
    " 1 = CASE WHEN :lupin = true THEN lupin = false ELSE 1 END AND" +
    " 1 = CASE WHEN :milk = true THEN milk = false ELSE 1 END AND" +
    " 1 = CASE WHEN :molluscs = true THEN molluscs = false ELSE 1 END AND" +
    " 1 = CASE WHEN :mustard = true THEN mustard = false ELSE 1 END AND" +
    " 1 = CASE WHEN :nuts = true THEN nuts = false ELSE 1 END AND" +
    " 1 = CASE WHEN :soya = true THEN soya = false ELSE 1 END AND" +
    " 1 = CASE WHEN :sesame_seeds = true THEN sesame_seeds = false ELSE 1 END AND" +
    " 1 = CASE WHEN :sulphites = true THEN sulphites = false ELSE 1 END ) AND"+
    "( calories < :calories ) ",
     nativeQuery = true)
    public List<Menu> filterByAllergens( 
        @Param("peanuts") Boolean peanuts,
        @Param("celery") Boolean celery,
        @Param("gluten") Boolean gluten,
        @Param("crustaceans") Boolean crustaceans,
        @Param("eggs") Boolean eggs,
        @Param("fish") Boolean fish,
        @Param("lupin") Boolean lupin,
        @Param("milk") Boolean milk,
        @Param("molluscs") Boolean molluscs,
        @Param("mustard") Boolean mustard,
        @Param("nuts") Boolean nuts,
        @Param("soya") Boolean soya,
        @Param("sesame_seeds") Boolean sesame_seeds,
        @Param("sulphites") Boolean sulphites,
        @Param("calories") long calories);

    @Query(
        value = "SELECT * FROM restaurant_menu WHERE calories < :calories",
        nativeQuery = true
    )
    public List<Menu> filterByCalories(
        @Param("calories") long calories
    );
}
