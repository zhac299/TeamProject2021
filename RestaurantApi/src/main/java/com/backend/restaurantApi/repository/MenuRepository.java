package com.backend.restaurantApi.repository;

import java.util.List;

import com.backend.restaurantApi.model.Menu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository class for the Menu.
 */
@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    /**
     * Sends query to the database using SQL syntax for derived from input alergins.
     * @param peanuts allergin.
     * @param celery allergin.
     * @param gluten allergin.
     * @param crustaceans allergin.
     * @param eggs allergin.
     * @param fish allergin.
     * @param lupin allergin.
     * @param milk allergin.
     * @param molluscs allergin.
     * @param mustard allergin.
     * @param nuts allergin.
     * @param soya allergin.
     * @param sesame_seeds allergin.
     * @param sulphites allergin.
     * @param calories allergin.
     * @return a list of menu corresponding with the input allergins.
     */
    @Query
    (value = 
    " SELECT * FROM restaurant_menu_item" +
    " WHERE " + 
    " 1 = CASE WHEN :peanuts = true THEN peanuts = false ELSE 1 END AND" +
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
    " 1 = CASE WHEN :sulphites = true THEN sulphites = false ELSE 1 END AND " +
    " :calories > calories",
     nativeQuery = true)
    public List<Menu> filter( 
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
        @Param("calories") Double calories);

    /**
     * Gets menu according to a specific category by sending a query to the database using SQL syntax.
     * @param category of the Menu you wish to return.
     * @return list of menu items corresponding with the input category.
     */
    @Query
    (value = "SELECT * FROM restaurant_menu_item WHERE :category = category", nativeQuery = true)
    public List<Menu> getMenuByCategory( @Param("category") String category);
}