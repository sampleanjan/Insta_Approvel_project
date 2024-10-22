package com.example.ApprovalService.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ApprovalService.models.Kyc;
import com.example.ApprovalService.service.KycService;

@RestController
@RequestMapping("/kyc")
public class KycController {
	@Autowired
	private KycService kycService;

	@PostMapping("/addOrUpdate")
	public Kyc addOrUpdateKyc(@RequestBody Kyc kyc) {
		return kycService.addOrUpdateKyc(kyc);
	}

	@GetMapping("/view/{customerId}")
	public Optional<Kyc> viewKyc(@PathVariable Long customerId) {
		return kycService.getKycByCustomerId(customerId);
	}
}
