# TeamProject2021_12 Restaurant App

# Dependencies required to run

1. Angular CLI
2. Maven

# Running The App

To run the app 2 things need to be run together in two terminals, 

1. The RestaurantWebApp front end. Cd into the RestaurantWebApp directory and run the following command `npm install && ng serve`

2. The RestaurantApi back end. Cd into the RestaurantApi directory and run the following command `mvn spring-boot:run`

# Documentation

Angular Documentation: `RestarauntWebApp/Documentation/index.html`. Most of our code is under 'Modules' in 'Components'. The services we use to communicate with our API will be under 'Injectables' as service classes.

Spring Documentation: Cd into RestaurantApi and run the following command `mvn javadoc:javadoc` to generate the doc. You can then view the docs by opening `target/site/index.html`.
