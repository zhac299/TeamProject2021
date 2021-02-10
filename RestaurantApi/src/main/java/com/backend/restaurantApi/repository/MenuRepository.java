package com.backend.restaurantApi.repository;

import java.util.List;

import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.model.MenuItem;

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
    " :peanuts <> peanuts AND " +
    " :celery <> celery AND " +
    " :gluten <> gluten AND " +
    " :crustaceans <> crustaceans AND " + 
    " :eggs <> eggs AND " +
    " :fish <> fish AND " +
    " :lupin <> lupin AND " +
    " :milk <> milk AND " +
    " :molluscs <> molluscs AND " +
    " :mustard <> mustard AND " +
    " :nuts <> nuts AND " +
    " :soya <> soya AND " +
    " :sesame_seeds <> sesame_seeds AND " +
    " :sulphites <> sulphites",
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
        @Param("sulphites") Boolean sulphites);
}
