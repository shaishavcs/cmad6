package com.cmad.essentials.blogger.dao;

import com.cmad.essentials.blogger.api.User;

//@Repository
public interface BloggerUserRepository {
	User findUser(String userName);

}
// extends JpaRepository<User, Serializable> {
// }
