package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Allergy;
import com.backend.restaurantApi.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/allergy")
public class AllergyController {

    @Autowired
    AllergyRepository allergyRepo;

    @GetMapping
    public List<Allergy> index() {
      return allergyRepo.findAll();
  }  
}
