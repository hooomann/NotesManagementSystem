package com.exit.backend.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.exit.backend.entity.User;

@Repository
public interface UserAuthRepository extends CrudRepository<User, String> {
}