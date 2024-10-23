package com.example.DashboardService.service;

import java.util.List;

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

	public LoanTransaction applyForLoan(String loandescription, int loanAmount, Long customerId) {
		
		LoanTransaction loanTransaction = new LoanTransaction();
		loanTransaction.setLoandescription(loandescription);
		loanTransaction.setLoanAmount(loanAmount);
		loanTransaction.setLoanStatus("Pending");
		loanTransaction.setReason(null);
		loanTransaction.setCustomerId(customerId);

		LoanTransaction createdLoan = loanTransactionRepository.save(loanTransaction);

		String customerServiceUrl = "http://localhost:8292/customer/" + customerId + "/addLoanId";
		restTemplate.postForObject(customerServiceUrl, createdLoan.getLoanId(), Void.class);

		return createdLoan;
	}

	public List<LoanTransaction> getLoansByCustomerId(Long customerId) {
		return loanTransactionRepository.findByCustomerId(customerId);
	}
}