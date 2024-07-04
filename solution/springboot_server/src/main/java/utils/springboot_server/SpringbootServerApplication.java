package utils.springboot_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main class for the Spring Boot application.
 * This class serves as the entry point for the Spring Boot application.
 * It is annotated with @SpringBootApplication to enable auto-configuration, component scan, and to define this as a Spring Boot application.
 */
@SpringBootApplication
public class SpringbootServerApplication {

    /**
     * Main method which serves as the entry point for the Spring Boot application.
     * @param args Command line arguments passed to the application.
     */
    public static void main(String[] args) {
        SpringApplication.run(SpringbootServerApplication.class, args);
    }
}