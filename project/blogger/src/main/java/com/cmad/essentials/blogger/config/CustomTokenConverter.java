package com.cmad.essentials.blogger.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.stereotype.Component;

import com.cmad.essentials.blogger.dao.UserDAO;

@Component
public class CustomTokenConverter extends JwtAccessTokenConverter {

	@Autowired
	UserDAO userDAO;

	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {

		//		final Map<String, Object> additionalInfo = new HashMap<>();
		//		//		additionalInfo.put("customized", "true");
		//		User user = userDAO.getUserByUserId(((BloggerUserDetails) authentication.getPrincipal()).getUserId());
		//		additionalInfo.put("user", user);
		//		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInfo);

		return super.enhance(accessToken, authentication);
	}
}