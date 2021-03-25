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

    /**
     * Autowires to the Order repository.
     */
    @Autowired
    OrderRepository orderRepo;

    /**
     * Autowires to the Order service.
     */
    @Autowired
    OrderService orderService;

    /**
     * Gets list of all orders.
     * @return a list of Order objects.
     */
    @GetMapping("/orders")
    public List<Order> index() {
        return orderRepo.findAll();
    }

    /**
     * Adds an order to the orders table in the database.
     * @param order an object of type Order.
     * @return the created Order.
     */
    @PostMapping("/orders")
    public Order newOrder(@RequestBody Order order) {
        return orderService.createNewOrder(order);
    }

    /**
     * Retrieves order from the orders table in the database by the id parameter.
     * @param id of particular order you want to retrieve.
     * @return the targetted order.
     */
    @GetMapping("/orders/{id}")
    public Order getOrderById(@PathVariable("id") Long id) {
        return orderService.getOrderById(id);
    }

    /**
     * Updates an already saved order in the database.
     * @param id of particular order you want to update.
     * @param Order 
     * @return the updated Order object.
     */
    @PutMapping("/orders/{id}")
    public Order updateOrder(@PathVariable("id") Long id, @RequestBody Order Order) {
        return orderService.updateOrder(id, Order);
    }

    /**
     * Deletes an order from the database according to the passed ID.
     * @param id of the order set for deletion.
     */
    @DeleteMapping("/orders/{id}")
    public void deleteOrder(@PathVariable("id") Long id) {
        orderService.deleteOrder(id);
    }

    /**
     * Gets all the meals that have been ordered from the database. 
     * @param id
     * @return
     */
    @GetMapping("orders/{id}/orderedMenuItems")
    public List<Menu> getOrderedMeals(@PathVariable("id") Long id) {
        return orderService.getOrderedMeals(id);
    }

    /**
     * Gets all the orders in a queue in order of priority from the database.
     * @return a PriorityQueue containing Order objects in order of priority.
     */
    @GetMapping("/orders/pq")
    public PriorityQueue<Order> getQueue() {
        return orderService.convertIntoQueue();
    }

    /**
     * This updates a specific order in the database according to whether the order has been delivered or not.
     * @param id of the Order object needed to be updated.
     * @param isDelivered boolean value whether that particular order has been delivered or not.
     * @return the updated Order Object.
     */
    @PutMapping("/orders/{id}/isdelivered/{isDelivered}")
    public Order updateIsDelivered(@PathVariable("id") Long id, @PathVariable("isDelivered") boolean isDelivered) {
        Order order = orderService.getOrderById(id);
        order.setIsDelivered(isDelivered);
        orderRepo.save(order);
        return order;
    }

    /**
     * This updates a specific order in the database according to whether the order has been confirmed or not.
     * @param id of the Order object needed to be confirmed.
     * @param isConfirmed boolean value whether that particular order has been confirmed or not.
     * @return the updated Order Object.
     */
    @PutMapping("/orders/{id}/isconfirmed/{isConfirmed}")
    public Order updateIsconfirmed(@PathVariable("id") Long id, @PathVariable("isConfirmed") boolean isConfirmed) {
        Order order = orderService.getOrderById(id);
        order.setIsConfirmed(isConfirmed);
        orderRepo.save(order);
        return order;
    }

    /**
     * Gets all orders from the database that are confirmed.
     * @return a list of all confirmed orders.
     */
    @GetMapping("/orders/isconfirmed")
    public List<Order> getConfrimedOrders() {
        return orderService.getConfirmedOrders();
    }

    /**
     * Gets all orders from the database that are not confirmed.
     * @return a list of all orders that are not confirmed.
     */
    @GetMapping("/orders/noisconfirmed")
    public List<Order> getNoConfrimedOrders() {
        return orderService.getNoConfirmedOrders();
    }

    /**
     * Gets all orders from the database that are ready.
     * @return list of ready orders.
     */
    @GetMapping("/orders/readyorders")
    public List<Order> getReadyOrders() {
        return orderService.getReadyOrders();
    }

    /**
     * Updates the order in the database with matching id by marking as paid. 
     * @param id of the order Object to be updated.
     * @param isPaid value to give updated isPaid attribute.
     * @return the updated order.
     */
    @PutMapping("/orders/isPaid/{id}/{isPaid}")
    public Order updateIsPaid(@PathVariable("id") Long id, @PathVariable("isPaid") boolean isPaid) {
        Order order = orderService.getOrderById(id);
        order.setIsPaid(isPaid);
        orderRepo.save(order);
        return order;
    }


    
    /** 
     * Updates the total of an order.
     * @param id the id of the order
     * @param total the total of the order
     * @return the Order which is getting its total updated.
     */
    @PutMapping("/orders/total/{id}/{total}")
    public Order updateTotal(@PathVariable("id") Long id, @PathVariable("total") int total) {
        Order order = orderService.getOrderById(id);
        order.setTotal(total);
        orderRepo.save(order);
        return order;
    }

    /**
     * Updates the order in the database with matching id by marking as ready. 
     * @param id of the order Object to be updated.
     * @param isReady value to give updated isReady attribute.
     * @return the updated order.
     */
    @PutMapping("/orders/{id}/isready/{isReady}")
    public Order updateIsReady(@PathVariable("id") Long id, @PathVariable("isReady") boolean isReady) {
        Order order = orderService.getOrderById(id);
        order.setIsReady(isReady);
        orderRepo.save(order);
        return order;
    }
}