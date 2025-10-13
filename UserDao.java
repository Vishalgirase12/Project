package com.example.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repos.Userrepo;
import com.example.demo.service.UserService;

@Service
public class UserDao implements UserService {

	@Autowired
	Userrepo ureo;
	
	@Override
	public void saveUserData(User u) {
		// TODO Auto-generated method stub
		ureo.save(u);
	}

	@Override
	public User ckUser(String email) {
		User u = ureo.findByEmail(email);
		return u;
	}

	@Override
	public User get(String email) {
		// TODO Auto-generated method stub
		User u = ureo.findByEmail(email);
	System.out.println(u);
		return u;
		 
	}

	@Override
	public Object findById(Long userId) {
		// TODO Auto-generated method stub
		return null;
	}

}
