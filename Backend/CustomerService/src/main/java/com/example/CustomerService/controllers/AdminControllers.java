package com.example.CustomerService.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CustomerService.models.Admin;
import com.example.CustomerService.service.AdminService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/admin")
public class AdminControllers {
	@Autowired
	private AdminService adminService;

	@PostMapping("/login")
	public ResponseEntity<String> adminLogin(@RequestBody Admin admin) {
		String username = admin.getUsername();
		String password = admin.getPassword();
		String token = "Admin-Token";
		if (adminService.validateAdminCredentials(username, password)) {
			return ResponseEntity.ok("Login successful! Token: " + token);
		} else {
			return ResponseEntity.status(401).body("Invalid credentials! Access denied.");
		}
	}
}