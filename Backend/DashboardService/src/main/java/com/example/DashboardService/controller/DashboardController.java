package com.example.DashboardService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

	// API to apply for a new loan directly with LoanTransaction as the request body
	@PostMapping("/apply")
	public ResponseEntity<LoanTransaction> applyForLoan(@RequestBody LoanTransaction loanTransaction) {
		LoanTransaction createdLoan = dashboardService.applyForLoan(loanTransaction.getLoandescription(),
				loanTransaction.getLoanAmount(), loanTransaction.getCustomerId(), loanTransaction.getKyc(),
				loanTransaction.getReason());
		return new ResponseEntity<>(createdLoan, HttpStatus.CREATED);
	}

	// API to get all loans by customerId
	@GetMapping("/loans/{customerId}")
	public List<LoanTransaction> getLoansByCustomerId(@PathVariable Long customerId) {
		return dashboardService.getLoansByCustomerId(customerId);
	}

	@GetMapping("/loans")
	public List<LoanTransaction> getAllLoans() {
		return dashboardService.getAllLoans();
	}

	@PutMapping("/loans/update/{loanId}")
	public ResponseEntity<LoanTransaction> updateLoan(@PathVariable Long loanId,
			@RequestBody LoanTransaction loanTransaction) {

		LoanTransaction updatedLoan = dashboardService.updateLoan(loanId, loanTransaction);
		if (updatedLoan != null) {
			return new ResponseEntity<>(updatedLoan, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}