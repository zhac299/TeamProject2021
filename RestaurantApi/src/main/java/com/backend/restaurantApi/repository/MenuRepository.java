package com.backend.restaurantApi.repository;
import java.util.List;
import com.backend.restaurantApi.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    @Query(value = "SELECT name FROM restaurant_menu WHERE peanuts = false", nativeQuery = true)
    public List<String> filterByPeanuts();

    @Query(value = "se name from Menu WHERE celery = false", nativeQuery = true)
    public List<Menu> filterByCelery();

    @Query(value = "SELECT name FROM Menu WHERE gluten = false")
    public List<Menu> filterByGluten();

    @Query(value = "SELECT name FROM Menu WHERE crustaceans = false")
    public List<Menu>filterByCrustaceans();

    @Query(value = "SELECT name FROM Menu WHERE eggs = false")
    public List<Menu> filterByEggs();

    @Query(value = "SELECT name FROM Menu WHERE fish = false")
    public List<Menu> filterByFish();

    @Query(value = "SELECT name FROM Menu WHERE lupin = false")
    public List<Menu> filterByLupin();

    @Query(value = "SELECT name FROM Menu WHERE milk = false")
    public List<Menu> filterByMilk();

    @Query(value = "SELECT name FROM Menu WHERE molluscs = false")
    public List<Menu>filterByMolluscs();

    @Query(value = "SELECT name FROM Menu WHERE mustard = false")
    public List<Menu> filterByMustard();

    @Query(value = "SELECT name FROM Menu WHERE nuts = false")
    public List<Menu>filterByNuts();

    @Query(value = "SELECT name FROM Menu WHERE soya = false")
    public List<Menu> filterBySoya();

    @Query(value = "SELECT name FROM Menu WHERE sesame_seeds = false")
    public List<Menu> filterBySesameSeeds();

    @Query(value = "SELECT name FROM Menu WHERE sulphites = false")
    public List<Menu> filterBySulphites();
}
