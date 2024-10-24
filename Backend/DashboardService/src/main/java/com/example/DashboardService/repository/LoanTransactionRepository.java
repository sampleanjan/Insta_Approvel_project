package com.example.DashboardService.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.DashboardService.models.LoanTransaction;

@Repository
public interface LoanTransactionRepository extends JpaRepository<LoanTransaction, Long> {
	
	List<LoanTransaction> findByCustomerId(Long customerId);

	List<LoanTransaction> findAll();
}