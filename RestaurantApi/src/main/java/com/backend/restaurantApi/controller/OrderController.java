package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.repository.*;
import com.backend.restaurantApi.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.PriorityQueue;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class OrderController {

    @Autowired
    OrderRepository orderRepo;

    @Autowired
    OrderService orderService;

    @GetMapping("/orders")
    public List<Order> index() {
      return orderRepo.findAll();
  }

    @PostMapping("/orders")
    public Order newOrder(@RequestBody Order order){
        return orderRepo.save(order);
    }

    @GetMapping("/orders/{id}")
    public Order getOrderById(@PathVariable("id") Long id) {
        return orderService.getOrderById(id);
    }

    @PutMapping("/orders/{id}")
    public Order updateOrder(@PathVariable("id") Long id, @RequestBody Order Order) {
        return orderService.updateOrder(id, Order);
    }

    @DeleteMapping("/orders/{id}")
    public void deleteOrder(@PathVariable("id") Long id) {
        orderService.deleteOrder(id);
    }

    public PriorityQueue<Date> getQueue() {        
        List<Order> listOfOrders = index();
        List<Date> listOfDates = new ArrayList<>();
        for (Order order : listOfOrders) {
            listOfDates.add(order.getOrderPlacedTime());
        }
        PriorityQueue<Date> datePriorityQueue = new PriorityQueue<Date>(listOfDates);
        return datePriorityQueue;
    }
}
