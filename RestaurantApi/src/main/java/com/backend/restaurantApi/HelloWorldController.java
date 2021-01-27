package com.backend.restaurantApi;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class HelloWorldController {

    @RequestMapping("/")
    public String sayHello(){
        return "Hello World!";
    }
}
