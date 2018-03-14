package com.cmad.essentials.blogger.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cmad.essentials.blogger.api.Blog;

public interface BlogRepository extends JpaRepository<Blog, Long> {

}
