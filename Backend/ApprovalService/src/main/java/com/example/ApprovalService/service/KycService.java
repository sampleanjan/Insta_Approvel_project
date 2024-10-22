package com.example.ApprovalService.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ApprovalService.models.Kyc;
import com.example.ApprovalService.repository.KycRepository;

@Service
public class KycService {
	@Autowired
	private KycRepository kycRepository;

	public Optional<Kyc> getKycByCustomerId(Long customerId) {
		return kycRepository.findByCustomerId(customerId);
	}

	public Kyc addOrUpdateKyc(Kyc kyc) {
		return kycRepository.save(kyc);
	}
}
