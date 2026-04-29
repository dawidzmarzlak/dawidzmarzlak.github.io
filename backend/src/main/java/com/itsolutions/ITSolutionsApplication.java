package com.itsolutions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ITSolutionsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ITSolutionsApplication.class, args);
    }
}
