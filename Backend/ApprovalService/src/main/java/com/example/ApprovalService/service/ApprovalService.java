package com.example.ApprovalService.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.ApprovalService.models.Kyc;
import com.example.ApprovalService.models.LoanTransaction;
import com.example.ApprovalService.repository.ApprovalRepository;

@Service
public class ApprovalService {
	@Autowired
	private ApprovalRepository approvalRepository;

	@Autowired
	private KycService kycService;

	public String approveLoan(Long loanId, String reason) {
		Optional<LoanTransaction> loan = approvalRepository.findById(loanId);
		if (loan.isPresent()) {
			LoanTransaction transaction = loan.get();
			Optional<Kyc> customerKyc = kycService.getKycByCustomerId(transaction.getCustomerId());

			if (customerKyc.isPresent()) {
				transaction.setLoanStatus("Approved");
				transaction.setReason(reason);
				approvalRepository.save(transaction);
				return "Loan Approved.";
			} else {
				return "KYC not found for customer.";
			}
		}
		return "Loan not found.";
	}

	public String rejectLoan(Long loanId, String reason) {
		Optional<LoanTransaction> loan = approvalRepository.findById(loanId);
		if (loan.isPresent()) {
			LoanTransaction transaction = loan.get();
			transaction.setLoanStatus("Rejected");
			transaction.setReason(reason);
			approvalRepository.save(transaction);
			return "Loan Rejected.";
		}
		return "Loan not found.";
	}
}