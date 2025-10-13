package com.example.demo.entities;

import javax.persistence.Entity;

  import java.time.LocalDateTime;
 
 import javax.persistence.Entity;
 import javax.persistence.EntityListeners;
 import javax.persistence.GeneratedValue;
 import javax.persistence.GenerationType;
 import javax.persistence.Id;
 import javax.validation.constraints.Email;
 import javax.validation.constraints.NotBlank;
 import javax.validation.constraints.NotNull;
 import javax.validation.constraints.Size;
 import org.springframework.data.annotation.CreatedDate;
 import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Entity
@EntityListeners(AuditingEntityListener.class)
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@NotBlank(message = "username can not be null")
	private String username;
	
	@Email(message = "enter correct email")
	private String email;
	
	@Size(min=4,max=9,message = "password should be range 4 to 9")
	private String password;
	
	@Size(min=4,max=9,message = "password should be range 4 to 9")
	private String cpassword;
	
	@CreatedDate
	private LocalDateTime createdDateTime;
	@LastModifiedDate
	private LocalDateTime lastModifiedDateTime;
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public User(int id, @NotBlank(message = "username can not be null") String username,
			@Email(message = "enter correct email") String email,
			@Size(min = 4, max = 9, message = "password should be range 4 to 9") String password,
			@Size(min = 4, max = 9, message = "password should be range 4 to 9") String cpassword,
			LocalDateTime createdDateTime, LocalDateTime lastModifiedDateTime) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.cpassword = cpassword;
		this.createdDateTime = createdDateTime;
		this.lastModifiedDateTime = lastModifiedDateTime;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getCpassword() {
		return cpassword;
	}
	public void setCpassword(String cpassword) {
		this.cpassword = cpassword;
	}
	public LocalDateTime getCreatedDateTime() {
		return createdDateTime;
	}
	public void setCreatedDateTime(LocalDateTime createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	public LocalDateTime getLastModifiedDateTime() {
		return lastModifiedDateTime;
	}
	public void setLastModifiedDateTime(LocalDateTime lastModifiedDateTime) {
		this.lastModifiedDateTime = lastModifiedDateTime;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password
				+ ", cpassword=" + cpassword + ", createdDateTime=" + createdDateTime + ", lastModifiedDateTime="
				+ lastModifiedDateTime + "]";
	}
	 
	


}
