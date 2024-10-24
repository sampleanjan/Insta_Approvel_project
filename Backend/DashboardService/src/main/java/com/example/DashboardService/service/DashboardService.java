package com.example.DashboardService.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.DashboardService.models.LoanTransaction;
import com.example.DashboardService.repository.LoanTransactionRepository;

@Service
public class DashboardService {

	@Autowired
	private LoanTransactionRepository loanTransactionRepository;

	@Autowired
	private RestTemplate restTemplate;

	
	public LoanTransaction applyForLoan(String loandescription, int loanAmount, Long customerId, String kyc,
			String reason) {
		
		LoanTransaction loanTransaction = new LoanTransaction();
		loanTransaction.setLoandescription(loandescription);
		loanTransaction.setLoanAmount(loanAmount);
		loanTransaction.setLoanStatus("Pending");
		loanTransaction.setReason(reason);
		loanTransaction.setKyc(kyc);
		loanTransaction.setCustomerId(customerId);

		LoanTransaction createdLoan = loanTransactionRepository.save(loanTransaction);
		
		String customerServiceUrl = "http://localhost:7007/customer/" + customerId + "/addLoanId";
		restTemplate.postForObject(customerServiceUrl, createdLoan.getLoanId(), Void.class);

		return createdLoan;
	}

	public List<LoanTransaction> getLoansByCustomerId(Long customerId) {
		return loanTransactionRepository.findByCustomerId(customerId);
	}

	public List<LoanTransaction> getAllLoans() {
		
		return loanTransactionRepository.findAll();
	}

	public LoanTransaction updateLoan(Long loanId, LoanTransaction newLoanData) {
		Optional<LoanTransaction> optionalLoan = loanTransactionRepository.findById(loanId);
		if (optionalLoan.isPresent()) {
			LoanTransaction existingLoan = optionalLoan.get();
			existingLoan.setLoandescription(newLoanData.getLoandescription());
			existingLoan.setLoanAmount(newLoanData.getLoanAmount());
			existingLoan.setKyc(newLoanData.getKyc());
			existingLoan.setReason(newLoanData.getReason());
			existingLoan.setLoanStatus(newLoanData.getLoanStatus());

			return loanTransactionRepository.save(existingLoan);
		} else {
			return null; 
		}
	}
}