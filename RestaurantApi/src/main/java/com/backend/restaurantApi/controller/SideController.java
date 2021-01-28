package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Side;
import com.backend.restaurantApi.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/side")
public class SideController {

    @Autowired
    SideRepository sideRepo;

    @GetMapping
    public List<Side> index() {
        return sideRepo.findAll();
    }

    //Adds mains
    @PostMapping
    public String addSide() {
        return"HTTP POST request recieved";
    }

    //Deletes mains
    @DeleteMapping
    public String deleteSide() {
        return"HTTP DELETE request recieved";
    }

    //Updates mains
    @PutMapping
    public String updateSide() {
        return"HTTP PUT request recieved";
    }
}
