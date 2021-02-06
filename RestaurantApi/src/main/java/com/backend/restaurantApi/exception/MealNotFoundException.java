package com.backend.restaurantApi.exception;

public class MealNotFoundException extends RuntimeException {
    
    public MealNotFoundException(String message) {
        super(message);
    }
}
