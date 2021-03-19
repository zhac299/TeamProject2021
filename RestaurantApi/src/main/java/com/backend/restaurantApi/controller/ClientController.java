package com.backend.restaurantApi.controller;

import java.util.List;

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

import com.backend.restaurantApi.model.Client;
import com.backend.restaurantApi.repository.ClientRepository;
import com.backend.restaurantApi.service.ClientService;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/")
public class ClientController {

	@Autowired
	ClientRepository clientRepository;

	@Autowired
	ClientService clientService;

	@GetMapping("/client")
	public List<Client> findAll() {
		return clientRepository.findAll();
	}

	@PostMapping("/client")
	public Client create(@RequestBody Client client) {
		return clientService.create(client);
	}

	@GetMapping("/client/{id}")
	public Client findById(@PathVariable("id") Long id) {
		return clientService.findById(id);
	}

	@PutMapping("/client/{id}")
	public Client update(@PathVariable("id") Long id, @RequestBody Client client) {
		return clientService.update(id, client);
	}

	@DeleteMapping("/client/{id}")
	public void delete(@PathVariable("id") Long id) {
		clientService.delete(id);
	}
}
