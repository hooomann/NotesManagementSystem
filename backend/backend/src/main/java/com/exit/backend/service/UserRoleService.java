package com.exit.backend.service;

import com.exit.backend.dao.UserRoleRepository;
import com.exit.backend.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRoleService {

    @Autowired
    private UserRoleRepository roleDao;

    // Create a new role by saving it in the database
    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }
}
