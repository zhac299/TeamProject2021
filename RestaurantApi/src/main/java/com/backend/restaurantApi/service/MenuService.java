package com.backend.restaurantApi.service;

import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {

    @Autowired
    MenuRepository menuRepository;

    public Menu createNewMenu(Menu menu) {
        return menuRepository.save(menu);
    }
}
