package com.example.demo.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Login;
import com.example.demo.entities.Product;
import com.example.demo.entities.User;
import com.example.demo.service.ProductServices;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})

class UserController {

	@Autowired
	UserService userservice;

	@SuppressWarnings("null")
	@PostMapping("/saveu")
	public ResponseEntity<?> saveUser(@RequestBody @Valid User u) {

		User u1 = userservice.ckUser(u.getEmail());

		if (u1 != null) {
			return new ResponseEntity<>("User alredy exists", HttpStatus.BAD_REQUEST);

		} else {
			if (u.getPassword().equals(u.getCpassword())) {
				userservice.saveUserData(u);
				return new ResponseEntity<>("User Created", HttpStatus.OK);
			} else {
				return new ResponseEntity<>("password didn't match.", HttpStatus.BAD_REQUEST);

			}
		}

	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Login request, HttpSession session) {
		User user = userservice.get(request.getEmail());
        System.out.println(user);
		if (user != null && user.getPassword().equals(request.getPassword())) {
			System.out.println(user);
			session.setAttribute("user", user.getUsername());
			return ResponseEntity.ok(Map.of("user", user.getUsername()));
		} 
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credential");
		}
	}

	@GetMapping("/logout")
	public ResponseEntity<String> logout(HttpSession session) {
		session.invalidate();
		return ResponseEntity.ok("logged out");
	}

	@GetMapping("/profile")
	public ResponseEntity<String> profile(HttpSession session) {
		String username = (String) session.getAttribute("user");
		if (username == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");
			}
		return ResponseEntity.ok("Welcome, " + username);
	}


}
