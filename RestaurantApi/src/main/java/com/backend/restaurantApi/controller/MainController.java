package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Main;
import com.backend.restaurantApi.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class MainController {

    @Autowired
    MainRepository mainRepo;

//    @GetMapping("/mains")
//    public ResponseEntity<List<Main>> get() {
//        List<Main> mains =  mainService.findAll();
//        return new ResponseEntity<List<Main>>(mains, HttpStatus.OK);
//    }

    //Adds mains
    @PostMapping(path = "/addMains", consumes = "application/json", produces = "application/json")
    public void addMain(@RequestBody Main main) {
        System.out.println(main);
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
