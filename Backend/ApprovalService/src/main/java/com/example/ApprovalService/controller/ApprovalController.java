package com.example.ApprovalService.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ApprovalService.service.ApprovalService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/approval")
public class ApprovalController {
	@Autowired
	private ApprovalService approvalService;

	@PostMapping("/approve/{loanId}")
	public String approveLoan(@PathVariable Long loanId, @RequestParam String reason) {
		return approvalService.approveLoan(loanId, reason);
	}

	@PostMapping("/reject/{loanId}")
	public String rejectLoan(@PathVariable Long loanId, @RequestParam String reason) {
		return approvalService.rejectLoan(loanId, reason);
	}
}