package com.cmad.essentials.blogger.dao;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cmad.essentials.blogger.api.User;

@Repository
public interface BloggerUserRepository extends JpaRepository<User, Serializable> {

}
