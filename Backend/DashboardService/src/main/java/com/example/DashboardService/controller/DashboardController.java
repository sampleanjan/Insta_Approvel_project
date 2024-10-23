package com.example.DashboardService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DashboardService.models.LoanTransaction;
import com.example.DashboardService.service.DashboardService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/dashboard")
public class DashboardController {

	@Autowired
	private DashboardService dashboardService;

	@PostMapping("/apply")
	public ResponseEntity<LoanTransaction> applyForLoan(@RequestBody LoanTransaction loanTransaction) {
		LoanTransaction createdLoan = dashboardService.applyForLoan(loanTransaction.getLoandescription(),
				loanTransaction.getLoanAmount(), loanTransaction.getCustomerId());
		return new ResponseEntity<>(createdLoan, HttpStatus.CREATED);
	}

	@GetMapping("/loans/{customerId}")
	public List<LoanTransaction> getLoansByCustomerId(@PathVariable Long customerId) {
		return dashboardService.getLoansByCustomerId(customerId);
	}
}