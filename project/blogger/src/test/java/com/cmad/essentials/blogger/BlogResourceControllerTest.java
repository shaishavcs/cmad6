package com.cmad.essentials.blogger;

import static org.junit.Assert.assertEquals;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.cmad.essentials.blogger.api.Blog;
import com.cmad.essentials.blogger.api.BlogCategory;
import com.cmad.essentials.blogger.api.BlogCategoryType;
import com.cmad.essentials.blogger.api.Comment;
import com.cmad.essentials.blogger.api.User;
import com.cmad.essentials.blogger.rest.BlogResource;
import com.cmad.essentials.blogger.service.BlogService;
import com.cmad.essentials.blogger.service.UserService;

@RunWith(SpringRunner.class)
@WebMvcTest(value = BlogResource.class, secure = false)
public class BlogResourceControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private BlogService blogService;

	@MockBean
	private UserService userService;

	static Blog mockBlog;

	static User mockUser;

	static User mockCommenter;

	static LocalDateTime ldt = LocalDateTime.of(2018, 4, 10, 10, 0, 0, 0);

	@Test
	public void retrieveBlogResource() throws Exception {

		Mockito.when(blogService.getBlog(Mockito.anyLong())).thenReturn(mockBlog);
		//		Mockito.when(blogService.postBlog(mockBlog);

		// Send course as body to /students/Student1/courses
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/rest/blog/get/33333")
				.accept(MediaType.APPLICATION_JSON);

		MvcResult result = mockMvc.perform(requestBuilder).andReturn();

		MockHttpServletResponse response = result.getResponse();
		String expectedContentResult = "{\"id\":33333,\"title\":\"Mock Blog\",\"blogContent\":\"The raging debate of tennis GOAT. Like any sport, its always difficult to compare players from different eras. Its insane to even discuss GOAT topics. I rest my case.\",\"likes\":[],\"author\":{\"userId\":\"mocker\",\"userType\":null,\"firstName\":\"mockFirstName\",\"lastName\":\"mockLastName\",\"emailId\":\"primary@xyz.com\",\"phoneNumber\":9090909090,\"alternateEmailId\":\"alternate@xyz.com\",\"password\":\"mockPassword\",\"address\":null,\"company\":null,\"token\":null},\"comments\":[],\"createdDate\":\"2018-03-24T10:00:00.000+0000\",\"modifiedDate\":\"2018-03-25T10:00:00.000+0000\",\"blogCategory\":{\"id\":null,\"blogCategoryType\":null,\"followers\":null}}";
		JSONAssert.assertEquals(expectedContentResult, result.getResponse().getContentAsString(), false);

		assertEquals("application/json;charset=UTF-8", response.getHeader(HttpHeaders.CONTENT_TYPE));
	}

	@BeforeClass
	public static void classLevelObjectSetup() {
		mockUser = createMockUser(false);
		mockCommenter = createMockUser(true);
		createMockBlog();
	}

	private static void createMockBlog() {
		mockBlog = new Blog();
		mockBlog.setId(33333l);
		mockBlog.setAuthor(mockUser);
		BlogCategory blogCategory = new BlogCategory();
		blogCategory.setId(44444l);
		blogCategory.setBlogCategoryType(BlogCategoryType.SPORTS);
		mockBlog.setBlogCategory(new BlogCategory());
		Date creationDate = Date.from(ldt.toInstant(ZoneOffset.UTC));
		Calendar cal = Calendar.getInstance();
		cal.setTime(creationDate);
		cal.set(Calendar.DAY_OF_MONTH, -7);
		mockBlog.setCreatedDate(cal.getTime());
		Date modifiedDate = Date.from(ldt.toInstant(ZoneOffset.UTC));
		cal.setTime(modifiedDate);
		cal.set(Calendar.DAY_OF_MONTH, -6);
		mockBlog.setModifiedDate(cal.getTime());
		mockBlog.setTitle("Mock Blog");
		mockBlog.setBlogContent(
				"The raging debate of tennis GOAT. Like any sport, its always difficult to compare players from different eras. Its insane to even discuss GOAT topics. I rest my case.");
		mockBlog.setComments(getComments(mockBlog));
	}

	private static List<Comment> getComments(Blog mockBlog) {
		// TODO Auto-generated method stub
		List<Comment> comments = new ArrayList<>();
		Date creationDate = Date.from(ldt.toInstant(ZoneOffset.UTC));
		Calendar cal = Calendar.getInstance();
		cal.setTime(creationDate);
		cal.set(Calendar.DAY_OF_MONTH, -4);
		Comment comment1 = new Comment();
		comment1.setId(55555l);
		comment1.setBlog(mockBlog);
		comment1.setCommentContent(
				"Its hard to ignore when we see unbelievable accomplishments of current crop of players.");
		comment1.setCommentedBy(mockCommenter);
		comment1.setPostedDate(creationDate);
		Comment comment2 = new Comment();
		comment2.setId(55555l);
		comment2.setBlog(mockBlog);
		comment2.setCommentContent(
				"So much changes between eras - technology in  racquets/balls, courts, physicality etc.");
		comment2.setCommentedBy(mockCommenter);
		Date creationDateComment2 = Date.from(ldt.toInstant(ZoneOffset.UTC));
		cal = Calendar.getInstance();
		cal.setTime(creationDateComment2);
		cal.set(Calendar.DAY_OF_MONTH, -1);
		comment2.setPostedDate(creationDateComment2);
		return comments;
	}

	private static User createMockUser(boolean isCommenter) {

		User mockUser = new User();
		mockUser.setUserId(isCommenter ? "commenter" : "mocker");
		mockUser.setFirstName(isCommenter ? "ComFirstName" : "mockFirstName");
		mockUser.setLastName(isCommenter ? "ComLastName" : "mockLastName");
		mockUser.setEmailId(isCommenter ? "commenter@xyz.com" : "primary@xyz.com");
		mockUser.setPassword(isCommenter ? "commenterPassword" : "mockPassword");
		mockUser.setPhoneNumber(isCommenter ? 8080808080l : 9090909090l);
		mockUser.setAlternateEmailId(isCommenter ? "alt_commenter@xyz.com" : "alternate@xyz.com");
		return mockUser;
	}
}