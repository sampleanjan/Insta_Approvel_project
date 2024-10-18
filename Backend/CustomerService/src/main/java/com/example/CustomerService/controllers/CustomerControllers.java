package com.example.CustomerService.controllers;


import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CustomerService.models.Customer;
import com.example.CustomerService.service.CustomerService;

@RestController
@RequestMapping("/customer")
public class CustomerControllers {

	@Autowired
	private CustomerService customerService;

	@GetMapping
	public ResponseEntity<List<Customer>> getAllCustomers() {
		List<Customer> users = customerService.getAllCustomers();
		return ResponseEntity.ok(users);
	}

	@PostMapping("/register")
	public ResponseEntity<Customer> register(@RequestBody Customer customer) {
		return new ResponseEntity<>(customerService.registerUser(customer), HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Customer customer) {
		Customer foundUser = customerService.findCustomerByEmail(customer.getEmail());
		if (foundUser != null) {
			String token = "Customer-Token";
			return ResponseEntity.ok(Collections.singletonMap("token", token));
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Customer> getUserById(@PathVariable Long id) {
		Customer user = customerService.getCustomerById(id);
		return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
	}

	@PutMapping("/{id}")
	public ResponseEntity<Customer> updateUser(@PathVariable Long id, @RequestBody Customer customerDetails) {
		return ResponseEntity.ok(customerService.updateUser(id, customerDetails));
	}
}
