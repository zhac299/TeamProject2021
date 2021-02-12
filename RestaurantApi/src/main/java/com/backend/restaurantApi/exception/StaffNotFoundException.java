package com.backend.restaurantApi.exception;

public class StaffNotFoundException extends RuntimeException {
    
    public StaffNotFoundException(String message) {
        super(message);
    }
}
