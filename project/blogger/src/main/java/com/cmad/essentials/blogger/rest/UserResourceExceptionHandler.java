package com.cmad.essentials.blogger.rest;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.cmad.essentials.blogger.api.UserAlreadyExistsException;
import com.cmad.essentials.blogger.api.UserException;
import com.cmad.essentials.blogger.api.UserNotFoundException;

@Provider
public class UserResourceExceptionHandler implements ExceptionMapper<UserException> {

	@Override
	public Response toResponse(UserException userException) {
		// TODO Auto-generated method stub
		if (userException instanceof UserNotFoundException) {
			return Response.status(Status.GONE).build();
		}
		if (userException instanceof UserAlreadyExistsException) {
			return Response.status(Status.CONFLICT).build();
		}
		if (userException instanceof UserException) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return Response.status(Status.INTERNAL_SERVER_ERROR).build();
	}

}
