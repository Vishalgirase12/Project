package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.entities.User;

 
public interface UserService {

	void saveUserData(User u);

	User ckUser(String email);

	User get(String email);

	Object findById(Long userId);

	  
 
}
