package com.example.CustomerService.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CustomerService.models.Customer;
import com.example.CustomerService.repository.CustomerRepository;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;

	public Customer registerUser(Customer customer) {
		return customerRepository.save(customer);
	}

	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}

	public Customer findCustomerByEmail(String email) {
		return customerRepository.findByEmail(email).orElse(null);
	}

	public Customer getCustomerById(Long id) {
		return customerRepository.findById(id).orElse(null);
	}

	
}