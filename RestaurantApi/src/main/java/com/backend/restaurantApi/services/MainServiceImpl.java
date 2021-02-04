package com.backend.restaurantApi.services;

import com.backend.restaurantApi.model.Main;
import com.backend.restaurantApi.repository.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainServiceImpl implements MainService {

    @Autowired
    MainRepository mainRepository;

    @Override
    public List<Main> findAll() {
        return mainRepository.findAll();
    }
}
