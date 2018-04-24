package com.cmad.essentials.blogger.security;

import java.util.Base64;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtServiceImpl implements JwtService {

	@Value("10")
	private Long expireHours;

	//	@Value("SecretKeyToGenJWTsForBlogger")
	//	private String plainSecret;
	private String encodedSecret;

	@Value("${security.jwt.client-id}")
	private String clientId;

	@Value("${security.jwt.client-secret}")
	private String clientSecret;

	@Value("${security.jwt.grant-type}")
	private String grantType;

	@Value("${security.jwt.scope-read}")
	private String scopeRead;

	@Value("${security.jwt.scope-write}")
	private String scopeWrite = "write";

	@Value("${security.jwt.resource-ids}")
	private String resourceIds;

	@Autowired
	private TokenStore tokenStore;

	@Autowired
	private JwtAccessTokenConverter accessTokenConverter;

	@PostConstruct
	protected void init() {
		this.encodedSecret = generateEncodedSecret(this.clientSecret);
	}

	protected String generateEncodedSecret(String clientSecret) {
		if (StringUtils.isEmpty(clientSecret)) {
			throw new IllegalArgumentException("JWT secret cannot be null or empty.");
		}
		return Base64.getEncoder().encodeToString(this.clientSecret.getBytes());
	}

	protected Date getExpirationTime() {
		Date now = new Date();
		Long expireInMilis = TimeUnit.HOURS.toMillis(expireHours);
		return new Date(expireInMilis + now.getTime());
	}

	protected Authentication getUser(String encodedSecret, String token) {
		Claims claims = Jwts.parser().setSigningKey(encodedSecret).parseClaimsJws(token).getBody();
		String userName = claims.getSubject();
		//		String role = (String) claims.get("role");
		Authentication securityUser = new Authentication();
		securityUser.setUsername(userName);
		return securityUser;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cmad.essentials.blog.security.jwtService#getUser(java.lang.String)
	 */
	@Override
	public Authentication getUser(String token) {
		return getUser(this.encodedSecret, token);
	}

	protected String getToken(String encodedSecret, Authentication jwtUser) {
		Date now = new Date();
		return Jwts.builder().setId(UUID.randomUUID().toString()).setSubject(jwtUser.getUsername()).setIssuedAt(now)
				.setExpiration(getExpirationTime()).signWith(SignatureAlgorithm.HS512, encodedSecret).compact();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cmad.essentials.blog.security.jwtService#getToken(com.cmad.essentials.
	 * blog.security.Authentication)
	 */
	@Override
	public String getToken(Authentication jwtUser) {
		//		OAuth2Authentication oAuth2Authentication = new OAuth2Authentication(storedRequest, userAuthentication);
		//		return tokenStore.getAccessToken(authentication);
		//		accessTokenConverter.getAccessTokenConverter().
		return getToken(this.encodedSecret, jwtUser);
	}
}
