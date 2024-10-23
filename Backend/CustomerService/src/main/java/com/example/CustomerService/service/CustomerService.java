package com.example.CustomerService.service;

import java.util.List;
import java.util.Optional;

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

	public Customer updateUser(Long id, Customer customerDetails) {
		Customer user = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
		user.setFirstName(customerDetails.getFirstName());
		user.setLastName(customerDetails.getLastName());
		user.setPassword(customerDetails.getPassword());
		user.setLoanIds(customerDetails.getLoanIds());
		return customerRepository.save(user);
	}

	public void addLoanId(Long customerId, Long loanId) {
		Optional<Customer> customerOptional = customerRepository.findById(customerId);
		if (customerOptional.isPresent()) {
			Customer customer = customerOptional.get();
			List<Long> loanIds = customer.getLoanIds();
			loanIds.add(loanId); 
			customer.setLoanIds(loanIds);
			customerRepository.save(customer); 
		} else {
			throw new RuntimeException("Customer not found with ID: " + customerId);
		}
	}
}