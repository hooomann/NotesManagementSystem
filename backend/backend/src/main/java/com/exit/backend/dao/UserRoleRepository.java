package com.exit.backend.dao;

import com.exit.backend.entity.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends CrudRepository<Role, String> {

}