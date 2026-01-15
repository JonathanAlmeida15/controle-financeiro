package com.fullstack.platform.controller;

import com.fullstack.platform.service.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class AuthController {

    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {

        String email = body.get("email");
        String password = body.get("password");

        // ⚠️ MOCK (depois você liga no banco)
        if (
            "jonathangabrielcar@gmail.com".equals(email) &&
            "66360180".equals(password)
        ) {
            String token = jwtService.generateToken(email);

            return ResponseEntity.ok(Map.of(
                "token", token
            ));
        }

        return ResponseEntity.status(401).body("Credenciais inválidas");
    }
}
