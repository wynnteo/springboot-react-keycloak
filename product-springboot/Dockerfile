# Use the official Maven image as the build environment
FROM maven:3.8.1-jdk-11 as build

# Set the working directory in the Docker container
WORKDIR /app

# Copy the pom.xml and source code to the container
COPY ./pom.xml ./pom.xml
COPY ./src ./src

# Build the application inside the container
RUN mvn clean package 

# Use OpenJDK to run the built JAR
FROM openjdk:17-jdk-slim-buster

WORKDIR /app

# Copy the built JAR from the 'build' stage to the current stage
COPY --from=build /app/target/productmgmt-0.0.1-SNAPSHOT.jar /app/product-microservice.jar

# Expose the application's port
EXPOSE 8081

# Command to run the application
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","product-microservice.jar"] 

