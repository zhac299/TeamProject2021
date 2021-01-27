package com.backend.restaurantApi.controller;

import com.backend.restaurantApi.model.Message;

import com.backend.restaurantApi.service.messageService;
import com.backend.restaurantApi.service.MessageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/")
public class MessageController {

  @Autowired
  messageService mesService;

  @GetMapping("/messages")
  public ResponseEntity<List<Message>> get(){
    List<Message> messages =  mesService.findAll();
    return new ResponseEntity<List<Message>>(messages, HttpStatus.OK);
  }
}
