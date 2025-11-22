package com.example.springapicrud.service;

import com.example.springapicrud.dto.CreateCustomerDTO;
import com.example.springapicrud.dto.CustomerDTO;
import com.example.springapicrud.entity.Customer;
import com.example.springapicrud.exception.ResourceNotFoundException;
import com.example.springapicrud.mapper.CustomerMapper;
import com.example.springapicrud.repository.CustomerRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomerService {
    private final CustomerRepository repo;

    public CustomerService(CustomerRepository repo) {
        this.repo = repo;
    }

    public CustomerDTO create(CreateCustomerDTO dto){
        Customer saved = repo.save(CustomerMapper.toEntity(dto));
        return CustomerMapper.toDto(saved);
    }

    public CustomerDTO getById(Long id){
        Customer c = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer not found with id " + id));
        return CustomerMapper.toDto(c);
    }

    public Page<CustomerDTO> list(int page, int size, String sort){
        Sort s = Sort.by(sort == null ? "id" : sort);
        Pageable p = PageRequest.of(page, size, s);
        return repo.findAll(p).map(CustomerMapper::toDto);
    }

    public CustomerDTO update(Long id, CreateCustomerDTO dto){
        Customer c = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer not found with id " + id));
        c.setName(dto.getName());
        c.setEmail(dto.getEmail());
        c.setPhone(dto.getPhone());
        return CustomerMapper.toDto(repo.save(c));
    }

    public void delete(Long id){
        if(!repo.existsById(id)) throw new ResourceNotFoundException("Customer not found with id " + id);
        repo.deleteById(id);
    }
}
