package com.backend.restaurantApi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.restaurantApi.exception.ClientNotFoundException;
import com.backend.restaurantApi.model.Client;
import com.backend.restaurantApi.repository.ClientRepository;

@Service
public class ClientService {

	@Autowired
	ClientRepository clientRepository;

	public Client create(Client client) {
		return this.clientRepository.save(client);
	}

	public Client findById(Long id) {
		Optional<Client> client = this.clientRepository.findById(id);
		if (client.isPresent()) {
			return client.get();
		} else
			throw new ClientNotFoundException("Client not found...");
	}

	public Client update(Long id, Client client) {
		client.setId(id);
		return clientRepository.save(client);
	}

	public void delete(Long id) {
		Optional<Client> client = this.clientRepository.findById(id);
		if (client.isPresent()) {
			clientRepository.delete(client.get());
		} else
			throw new ClientNotFoundException("Client not found...");
	}
}
