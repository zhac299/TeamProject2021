package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Main;

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
@RequestMapping(path = "/api/v1/main")
public class MainController {

    @Autowired
    MainRepository mainRepo;

    @GetMapping
    public List<Main> index() {
        return mainRepo.findAll();
    }

    //Adds mains
    @PostMapping
    public String addMain() {
        return"HTTP POST request recieved";
    }

    //Deletes mains
    @DeleteMapping
    public String deleteMain() {
        return"HTTP DELETE request recieved";
    }

    //Updates mains
    @PutMapping
    public String updateMain() {
        return"HTTP PUT request recieved";
    }
}
