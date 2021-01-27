package com.backend.restaurantApi.service;


import com.backend.restaurantApi.model.Message;

import java.util.List;

public interface messageService {

  List<Message> findAll();
}
