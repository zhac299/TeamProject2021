package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Staff;

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
@RequestMapping("/api/v1/")
public class StaffController {

    @Autowired
    StaffRepository staffRepo;

    @GetMapping(value = "/")
    public Page<Staff> index() {
    PageRequest p = null;
    return staffRepo.findAll(p);
  }  
}
