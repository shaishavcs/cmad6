package com.cmad.essentials.blogger;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/*import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
*/
//@EnableSwagger2
@Configuration
@ComponentScan(basePackages = "com.cmad.essentials.blogger")
public class BloggerConfiguration {

	// @Bean
	// public Docket productApi() {
	// return new Docket(DocumentationType.SWAGGER_2).select()
	// .apis(RequestHandlerSelectors.basePackage("com.cmad.essentials.blogger.rest"))
	// .paths(PathSelectors.regex("/rest.*")).build();
	// }
}
