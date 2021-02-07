package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class OrderController {

    @Autowired
    OrderRepository orderRepo;

    @GetMapping("/orders")
    public List<Order> index() {
      return orderRepo.findAll();
  }

    @PostMapping("/orders")
    public Order newOrder(@RequestBody Order order){
        return orderRepo.save(order);
    }
}
