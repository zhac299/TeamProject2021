package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Desert;
import com.backend.restaurantApi.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/desert")
public class DesertController {

    @Autowired
    DesertRepository desertRepo;

    @GetMapping
    public List<Desert> index() {
        return desertRepo.findAll();
    }

    //Adds deserts
    @PostMapping
    public String addDesert() {
        return"HTTP POST request recieved";
    }

    //Deletes deserts
    @DeleteMapping
    public String deleteDesert() {
        return"HTTP DELETE request recieved";
    }

    //Updates deserts
    @PutMapping
    public String updateDesert() {
        return"HTTP PUT request recieved";
    }
}