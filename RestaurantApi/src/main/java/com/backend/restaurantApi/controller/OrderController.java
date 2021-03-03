package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Menu;
import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.repository.*;
import com.backend.restaurantApi.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Order newOrder(@RequestBody Order order) {
        return orderService.createNewOrder(order);
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

    @GetMapping("orders/{id}/orderedMenuItems")
    public List<Menu> getOrderedMeals(@PathVariable("id") Long id) {
        return orderService.getOrderedMeals(id);
    }

    @GetMapping("/orders/pq")
    public PriorityQueue<Order> getQueue() {
        return orderService.convertIntoQueue();
    }

    @PutMapping("/orders/{id}/isdelivered/{isDelivered}")
    public Order updateIsDelivered(@PathVariable("id") Long id, @PathVariable("isDelivered") boolean isDelivered) {
        Order order = orderService.getOrderById(id);
        order.setIsConfirmed(isDelivered);
        return order;
    }

    @PutMapping("/orders/{id}/isconfirmed/{isConfirmed}")
    public Order updateIsconfirmed(@PathVariable("id") Long id, @PathVariable("isConfirmed") boolean isConfirmed) {
        Order order = orderService.getOrderById(id);
        order.setIsConfirmed(isConfirmed);
        return order;
    }
}
