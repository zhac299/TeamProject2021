package com.backend.restaurantApi.service;

import com.backend.restaurantApi.repository.MenuCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuCategoryService {

    @Autowired
    MenuCategoryRepository menuCategoryRepository;




}
