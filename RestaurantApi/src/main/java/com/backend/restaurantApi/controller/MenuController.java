package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.repository.MenuRepository;
import com.backend.restaurantApi.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/")
public class MenuController {

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    MenuService menuService;

    @GetMapping(path = "/menu")
    public List<Menu> getMenu(){
        return menuRepository.findAll();
    }

    @PostMapping(path = "/menu")
    public Menu  createNewMenu(@RequestBody Menu menu) {
        return menuService.createNewMenu(menu);
    }

    @PostMapping(path = "/menuadd/{id}")
    public Menu addNewMeal(@RequestBody Meal meal, @PathVariable Long id){
        return menuService.addMenuMeal(meal, id);
    }
    
    @GetMapping(path = "/menu")
    public List<Menu> filterByCelery() {
        return menuRepository.filterByCelery();
    }

    @GetMapping(path = "/menu")
    public List<Menu> filterByCrustaceans() {
        return menuRepository.filterByCrustaceans();
    }

    @GetMapping(path = "/menu")
    public List<Menu> filterByEggs() {
        return menuRepository.filterByEggs();
    }

    @GetMapping(path = "/menu")
    public List<Menu> filterByFish() {
        return menuRepository.filterByFish();
    }
    @GetMapping(path = "/menu")
    public List<Menu> filterByGluten() {
        return menuRepository.filterByGluten();
    }
    @GetMapping(path = "/menu")
    public List<Menu> filterByLupin() {
        return menuRepository.filterByLupin();
    }
    @GetMapping(path = "/menu")
    public List<Menu> filterByMilk() {
        return menuRepository.filterByMilk();
    }

    @GetMapping(path = "/menu")
    public List<Menu> filterByMolluscs() {
        return menuRepository.filterByMolluscs();
    }

    @GetMapping(path = "/menu")
    public List<Menu> filterByMustard() {
        return menuRepository.filterByMustard();
    }

    @GetMapping(path = "/menu")
    public List<Menu> filterByNuts() {
        return menuRepository.filterByNuts();
    }

    @GetMapping(path = "/menu")
    public List<Menu> filterByPeanuts() {
        return menuRepository.filterByPeanuts();
    }

    @GetMapping(path = "/menu")
    public List<Menu> filterBySesameSeeds() {
        return menuRepository.filterBySesameSeeds();
    }

    @GetMapping(path = "/menu")
    public List<Menu> filterBySoya() {
        return menuRepository.filterBySoya();
    }

    @GetMapping(path = "/menu")
    public List<Menu> filterBySulphites() {
        return menuRepository.filterBySulphites();
    }
}
