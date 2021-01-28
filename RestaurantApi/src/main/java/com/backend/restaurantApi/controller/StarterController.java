package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Starter;

import com.backend.restaurantApi.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/starter")
public class StarterController {

    @Autowired
    StarterRepository starterRepo;

    @GetMapping
    public List<Starter> index() {
        return starterRepo.findAll();
    }

    //Adds mains
    @PostMapping
    public String addStarter() {
        return"HTTP POST request recieved";
    }

    //Deletes mains
    @DeleteMapping
    public String deleteStarter() {
        return"HTTP DELETE request recieved";
    }

    //Updates mains
    @PutMapping
    public String updateStarter() {
        return"HTTP PUT request recieved";
    }
}
