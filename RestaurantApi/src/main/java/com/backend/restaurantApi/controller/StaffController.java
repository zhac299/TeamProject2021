package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Staff;

import com.backend.restaurantApi.repository.*;
import com.backend.restaurantApi.service.StaffService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/staff")
public class StaffController {

    @Autowired
    StaffRepository staffRepo;

    @Autowired
    StaffService staffService;

    @GetMapping
    public List<Staff> index() {
      return staffRepo.findAll();
  }  

   @PostMapping("/staff")
    public Staff newstaff(@RequestBody Staff staff){
        return staffRepo.save(staff);
    }

    @GetMapping("/staff/{id}")
    public Staff getstaffById(@PathVariable("id") Long id) {
        return staffService.getStaffById(id);
    }

    @PutMapping("/staff/{id}")
    public Staff updatestaff(@PathVariable("id") Long id, @RequestBody Staff staff) {
        return staffService.updateStaff(id, staff);
    }

    @DeleteMapping("/staff/{id}")
    public void deletestaff(@PathVariable("id") Long id) {
        staffService.deleteStaff(id);
    }
}
