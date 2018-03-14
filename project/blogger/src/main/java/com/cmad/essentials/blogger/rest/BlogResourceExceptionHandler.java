package com.cmad.essentials.blogger.rest;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.cmad.essentials.blogger.api.BlogException;
import com.cmad.essentials.blogger.api.BlogNotFoundException;
import com.cmad.essentials.blogger.api.DuplicateBlogException;
import com.cmad.essentials.blogger.dao.BlogDAOException;

@Provider
public class BlogResourceExceptionHandler implements ExceptionMapper<BlogException> {

	@Override
	public Response toResponse(BlogException blogException) {
		// TODO Auto-generated method stub
		if (blogException instanceof BlogDAOException) {
			return Response.status(Status.NOT_FOUND).build();
		}
		if (blogException instanceof DuplicateBlogException) {
			return Response.status(Status.CONFLICT).build();
		}
		if (blogException instanceof BlogNotFoundException) {
			return Response.status(Status.GONE).build();
		}
		if (blogException instanceof BlogException) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return Response.status(Status.INTERNAL_SERVER_ERROR).build();
	}

}
