package com.pictet.challenge;

import com.pictet.challenge.services.BookService;
import com.pictet.challenge.types.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import tools.jackson.databind.ObjectMapper;

@SpringBootApplication
public class BackendApplication {
    private static final String book_path = "books/*.json";

    @Autowired
    private BookService bookService;

    public static void main(String[] args) {

        SpringApplication.run(BackendApplication.class, args);
    }
/* Just for testing H2 Console, leaving here for extra versions
    @Bean
    public ServletRegistrationBean<JakartaWebServlet> h2servletRegistration() {
        ServletRegistrationBean<JakartaWebServlet> registration = new ServletRegistrationBean<>(new JakartaWebServlet());
        registration.addUrlMappings("/h2-console/*");
        registration.addInitParameter("-webAllowOthers", "true");
        return registration;
    }
*/
    @Bean
    CommandLineRunner init() {
        return args -> {
            PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
            Resource[] books = resolver.getResources(book_path);
            for (Resource book : books) {
                try {
                    Book temp = new ObjectMapper().readValue(book.getInputStream(),Book.class);
                    bookService.addBook(temp);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
            }
            System.out.println("Following Books have been added :");
            bookService.getBooks().forEach(System.out::println);
            System.out.println("---------------------------------");
        };
    }

}
