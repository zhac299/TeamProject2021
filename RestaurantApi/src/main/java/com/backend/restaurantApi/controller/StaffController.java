package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.model.Staff;
import org.springframework.ui.Model;
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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class StaffController {

    @Autowired
    StaffRepository staffRepo;

    @Autowired
    StaffService staffService;

    @GetMapping("/staff")
    public List<Staff> index() {
      return staffRepo.findAll();
    }  

    @GetMapping("/staff/getSales/{id}")
    public List<Order> getSales(@PathVariable("id") long id) {
      return staffService.getSales(id);
    }  

   @PostMapping("/staff")
    public Staff newstaff(@RequestBody Staff staff){
        return staffService.createNewStaff(staff);
    }

    @GetMapping("/staff/{id}")
    public Staff getstaffById(@PathVariable("id") Long id) {
        return staffService.getStaffById(id);
    }

    @PutMapping("/staff/{id}")
    public Staff updatestaff(@PathVariable("id") Long id, @RequestBody Staff staff) {
        return staffService.updateStaff(id, staff);
    }

    /**
     * Deletes staff member from the database.
     * @param id generated from the input of a staff member.
     */
    @DeleteMapping("/staff/{id}")
    public void deletestaff(@PathVariable("id") Long id) {
        staffService.deleteStaff(id);
    }

    /**
     * This method finds the staff member with the matching username and password
     * entered by a user. 
     * @param model
     * @param username generated from the input of a staff member. 
     * @param password generated from the input of a staff member.
     * @return a list of staff with the matching username and password.
     */
    @GetMapping("/staff/{user_name}/{password}")
    public List<Staff> findStaffByUserName(Model model, @PathVariable("user_name") String username,  @PathVariable("password") String password) {

        List<Staff> staff = staffRepo.getStaffMember(username, password);

        model.addAttribute("staff", staff);

        return staff;
    }

    /**
     * This method generates a list of all waiters stored in the database.
     * @return an ArrayList of all waiters.
     */
    @GetMapping("/staff/waiters")
    public List<Staff> getAllWaiters() {
        List<Staff> allStaff = index();
        List<Staff> waiters = new ArrayList<>();

        for (Staff i : allStaff) {
            if (i.isWaiter()) {
                waiters.add(i);
            }
        }
        return waiters;
    }

    /**
     * This method generates a random waiter from all members of staff.
     * @return the selected member of staff.
     */
    @GetMapping("/staff/randomwaiter")
    public Staff getRandomWaiter() {
        List<Long> allWaiterIds = new ArrayList<>();
        List<Staff> allStaff = index();

        for (Staff i : allStaff) {
            if (i.isWaiter()) {
                allWaiterIds.add(i.getId());
            }
        }    
        long largestId = Collections.max(allWaiterIds);
        long smallestId = Collections.min(allWaiterIds);
        long id = smallestId + (long) (Math.random() * (largestId - smallestId));

        Staff staffMember = null;

        for (Staff i : allStaff) {
            if (i.getId() == id) {
                staffMember = i;
            }
        }
        return staffMember;
    }
}