package com.cmad.essentials.blogger.rest;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsResourceDetails;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2Request;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cmad.essentials.blogger.api.Blog;
import com.cmad.essentials.blogger.api.CurrentPasswordDoesNotMatchException;
import com.cmad.essentials.blogger.api.User;
import com.cmad.essentials.blogger.api.UserException;
import com.cmad.essentials.blogger.config.AuthorizationServerConfig;
import com.cmad.essentials.blogger.security.Authentication;
import com.cmad.essentials.blogger.security.JwtService;
import com.cmad.essentials.blogger.service.BlogService;
import com.cmad.essentials.blogger.service.UserService;

//import antlr.collections.List;

@RestController
@RequestMapping("/rest/user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

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

	@Value("${security.access.token.url}")
	private String accessTokenURL;

	@Autowired
	UserService userService;

	@Autowired
	BlogService blogService;

	@Autowired
	JwtService jwtService;

	@Autowired
	TokenStore tokenStore;

	@Autowired
	DefaultTokenServices tokenServices;

	@Autowired
	AuthorizationServerConfig authorizationServerConfig;

	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user) {
		// register the user with the site
		userService.register(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	@PostMapping("/login")
	public ResponseEntity<UserResourceResponse> login(@RequestBody Authentication authentication) {
		String userId = authentication.getUsername();
		String password = authentication.getPassword();
		//		String userId = httpHeaders.getRequestHeader("userId").get(0);
		//		String password = httpHeaders.getRequestHeader("password").get(0);
		boolean isSuccessful = userService.login(userId, password);
		if (!isSuccessful) {
			return new ResponseEntity<UserResourceResponse>(HttpStatus.UNAUTHORIZED);
		}
		User user = userService.getUser(userId);
		OAuth2AccessToken oAuth2AccessToken = token(authentication);
		String token = oAuth2AccessToken.getValue();
		OAuth2RestTemplate oAuth2RestTemplate = getToken(token);
		token = oAuth2RestTemplate.getAccessToken().getValue();
		//		String token = jwtService.getToken(authentication);
		UserResourceResponse userResourceResponse = new UserResourceResponse();
		userResourceResponse.setUser(user);
		userResourceResponse.setToken(token);
		ResponseEntity<UserResourceResponse> responseEntity = new ResponseEntity<UserResourceResponse>(
				userResourceResponse, HttpStatus.OK);
		return responseEntity;
	}

	private OAuth2RestTemplate getToken(String token) {
		ClientCredentialsResourceDetails clientCredentialsResourceDetails = new ClientCredentialsResourceDetails();
		//	        clientCredentialsResourceDetails.setAccessTokenUri(env.getRequiredProperty("monkeyman.api.accessToken.url"));
		clientCredentialsResourceDetails.setAccessTokenUri(accessTokenURL);
		clientCredentialsResourceDetails.setClientId(clientId);
		clientCredentialsResourceDetails.setClientSecret(clientSecret);
		clientCredentialsResourceDetails.setGrantType("client_credentials");
		java.util.List<String> scopeList = new ArrayList<String>();
		scopeList.add(scopeRead);
		scopeList.add(scopeWrite);
		clientCredentialsResourceDetails.setScope(scopeList);
		//		clientCredentialsResourceDetails.setAuthenticationScheme(new User);
		return new OAuth2RestTemplate(clientCredentialsResourceDetails);
		//	try
		//
		//	{
		//
		//		URL url = new URL("/oauth/token");
		//		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		//		conn.setDoOutput(true);
		//		conn.setRequestMethod("POST");
		//		conn.setRequestProperty("Content-Type", "application/json");
		//
		//		String input = "{\"qty\":100,\"name\":\"iPad 4\"}";
		//
		//		OutputStream os = conn.getOutputStream();
		//		os.write(input.getBytes());
		//		os.flush();
		//
		//		if (conn.getResponseCode() != HttpURLConnection.HTTP_CREATED) {
		//			throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
		//		}
		//
		//		BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
		//
		//		String output;
		//		System.out.println("Output from Server .... \n");
		//		while ((output = br.readLine()) != null) {
		//			System.out.println(output);
		//		}
		//
		//		conn.disconnect();
		//
		//	}catch(
		//	MalformedURLException e)
		//	{
		//
		//		e.printStackTrace();
		//
		//	}catch(
		//	IOException ioe)
		//	{
		//
		//		ioe.printStackTrace();
		//
		//	}
	}

	//	@RequestMapping("/token")
	//	@RequestBody 
	public OAuth2AccessToken token(Authentication principal) {
		Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

		Map<String, String> requestParameters = new HashMap<>();
		String clientIdToUse = clientId;
		boolean approved = true;
		Set<String> scope = new HashSet<>();
		scope.add(scopeRead);
		scope.add(scopeWrite);
		Set<String> resourceIds = new HashSet<>();
		Set<String> responseTypes = new HashSet<>();
		//		responseTypes.add("code");
		Map<String, Serializable> extensionProperties = new HashMap<>();

		OAuth2Request oAuth2Request = new OAuth2Request(requestParameters, clientIdToUse, null, approved, scope,
				resourceIds, null, responseTypes, extensionProperties);

		User userPrincipal = new User(principal.getUsername());

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userPrincipal,
				principal.getPassword(), authorities);
		OAuth2Authentication auth = new OAuth2Authentication(oAuth2Request, authenticationToken);
		DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
		defaultTokenServices.setTokenStore(tokenStore);
		//		authorizationServerConfig.accessTokenConverter().convertAccessToken(tokenServices.createAccessToken(auth),
		//				auth);
		OAuth2AccessToken token = tokenServices.createAccessToken(auth);
		return token;
	}

	@PostMapping("/changePassword/{userId}")
	public ResponseEntity<User> changePassword(@PathVariable("userId") String userId,
			@RequestBody ChangePassword changePassword) {
		// register the user with the site
		User currentUser = userService.getUser(userId);
		User user = currentUser;
		try {
			user = userService.changePassword(userId, changePassword);
		} catch (CurrentPasswordDoesNotMatchException cpdnme) {
			return new ResponseEntity<User>(currentUser, HttpStatus.CONFLICT);
		} catch (UserException userException) {
			return new ResponseEntity<User>(currentUser, HttpStatus.CONFLICT);
		}
		return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	}

	@PostMapping("/update/{userId}")
	public ResponseEntity<User> update(@PathVariable("userId") String userId, @RequestBody User user) {
		// register the user with the site
		userService.update(user);
		return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	}

	@GetMapping("/get/{userId}")
	public ResponseEntity<User> get(@PathVariable("userId") String userId) {
		// register the user with the site
		User user = userService.getUser(userId);
		User userToReturn = new User(user);
		userToReturn.setPassword("");
		return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	}

	@PostMapping("/blogs/{userId}")
	public ResponseEntity<Collection<Blog>> blogs(@PathVariable("userId") String userId) {
		User user = userService.getUser(userId);
		return new ResponseEntity<Collection<Blog>>(blogService.getBlogs(user), HttpStatus.ACCEPTED);
	}

	@PostMapping("/logout/{userId}")
	public ResponseEntity<User> logout(@PathVariable("userId") String userId,
			OAuth2Authentication auth2Authentication) {
		//		OAuth2AccessToken token = tokenStore.getAccessToken(auth2Authentication);
		//		tokenStore.removeAccessTokenUsingRefreshToken(token.getRefreshToken());
		//		authorizationServerConfig.
		return new ResponseEntity<User>(userService.getUser(userId), HttpStatus.OK);
	}

	@PostMapping("/logout")
	public ResponseEntity<User> logoutInternal(OAuth2Authentication auth) {
		String userName = null;
		if (auth.getPrincipal() != null && auth.getPrincipal() instanceof String) {
			userName = (String) auth.getPrincipal();
		}
		User user = userService.getUser(userName);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

}
