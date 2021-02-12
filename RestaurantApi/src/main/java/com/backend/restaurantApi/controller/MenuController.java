package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Meal;
import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.repository.MenuRepository;
import com.backend.restaurantApi.service.MealService;
import com.backend.restaurantApi.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class MenuController {

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    MenuService menuService;

    @Autowired
    MealService mealService;

    @GetMapping(path = "/menu")
    public List<Menu> getMenu() {
        return menuRepository.findAll();
    }

    @PostMapping(path = "/menu")
    public Menu createNewMenu(@RequestBody Menu menu) {
        return menuService.createNewMenu(menu);
    }

    @GetMapping("/menu/{id}")
    public Menu getMealById(@PathVariable("id") Long id) {
        return mealService.getMealById(id);
    }

    @PostMapping(path = "/menuadd/{id}")
    public Menu addNewMeal(@RequestBody Meal meal, @PathVariable Long id) {
        return menuService.addMenuMeal(meal, id);
    }

    //Link model format to be tested in the browser http://localhost:8080/api/v1/menu/filterByAllergens/0/1/0/0/0/0/0/0/0/0/0/0/0/0
    //Boolean parameters are passed as either 1 or 0. 
    //When you make the get request, you also pass all the allergens in the link.
    @GetMapping(path = "/menu/filter/{peanuts}/{celery}/{gluten}/{crustaceans}/{eggs}/{fish}/{lupin}/{milk}/{molluscs}/{mustard}/{nuts}/{soya}/{sesame_seeds}/{sulphites}/{calories}")
    public List<Menu> filter(
        @PathVariable("peanuts") Boolean peanuts,
        @PathVariable("celery") Boolean celery,
        @PathVariable("gluten") Boolean gluten,
        @PathVariable("crustaceans") Boolean crustaceans,
        @PathVariable("eggs") Boolean eggs,
        @PathVariable("fish") Boolean fish,
        @PathVariable("lupin") Boolean lupin,
        @PathVariable("milk") Boolean milk,
        @PathVariable("molluscs") Boolean molluscs,
        @PathVariable("mustard") Boolean mustard,
        @PathVariable("nuts") Boolean nuts,
        @PathVariable("soya") Boolean soya,
        @PathVariable("sesame_seeds") Boolean sesame_seeds,
        @PathVariable("sulphites") Boolean sulphites,
        @PathVariable("calories") int calories
    ) {
        return menuService.filter(
            peanuts,
            celery,
            gluten,
            crustaceans,
            eggs,
            fish,
            lupin,
            milk,
            molluscs,
            mustard,
            nuts,
            soya,
            sesame_seeds,
            sulphites,
            calories);}
}
