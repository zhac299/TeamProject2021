package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.repository.MenuRepository;
import com.backend.restaurantApi.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
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
    public Menu  createNewMenu(Menu menu){

        return menuService.createNewMenu(menu);
    }
}
