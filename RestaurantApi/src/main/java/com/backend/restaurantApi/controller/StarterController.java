package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Starter;

import com.backend.restaurantApi.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
