package com.example.springapicrud.controller;

import com.example.springapicrud.dto.CreateCustomerDTO;
import com.example.springapicrud.dto.CustomerDTO;
import com.example.springapicrud.service.CustomerService;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService service;
    public CustomerController(CustomerService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<CustomerDTO> create(@Validated @RequestBody CreateCustomerDTO dto){
        CustomerDTO created = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getById(@PathVariable Long id){
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<Page<CustomerDTO>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort){
        return ResponseEntity.ok(service.list(page, size, sort));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerDTO> update(@PathVariable Long id, @Validated @RequestBody CreateCustomerDTO dto){
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
