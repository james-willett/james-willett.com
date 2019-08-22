---
title: 'Getting up and Running with Rest-Assured'
date: 2015-06-15
tags: [tag1, tag2, tag3, tag4]
slug: getting-up-and-running-with-rest-assured
image: ./up-and-running-cover.png
category: REST Assured
next: rest-assured-extract-json-response
---

Testing APIs directly is becoming a bigger trend in the Test Automation world. A great open-source Java library that I have been using for this testing, with great success, is Rest-Assured. In this blog post, I am going to cover everything that you need to get up and running quickly with Rest-Assured.

So just what exactly is Rest-Assured? Rest-Assured is an open-source Java Domain-Specific Language (DSL). It eliminates the requirement of using boiler-plate code to test complex API responses, and supports both XML and JSON.

Firstly I highly recommend having a read through the short page on the [Rest-Assured homepage](https://code.google.com/p/rest-assured/) to get a little bit of familiarity with the workings of the tool. There is also a great [Rest-Assured Usage Guide](https://github.com/rest-assured/rest-assured/wiki/Usage) on the site that is well worth working through if you are interested in learning more about the tool.

Before we go any further, I suggest that you install an extension for Google Chrome called Rest Console . This is an excellent tool that can be used to learn and play around with your APIs, and will help you greatly if you use it in conjunction with Rest-Assured when running your tests.

To install Rest Console, go to the [Rest Console Installation Page](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) in your Chrome browser.

In the rest of this post, we are going to get up and running very quickly with our Rest-Assured testing by using Maven to install everything that we need. If you don’t know anything about Maven, start by following the [Maven 5 minute guide](http://maven.apache.org/guides/getting-started/maven-in-five-minutes.html) to get Maven installed. With Maven installed, go ahead and create a new Maven project in your IDE (I am using Intellij from Jet brains, but you can use Eclipse or some other IDE if you wish).

In your POM file, add the following 4 dependencies so that your file looks something like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.yourcompany.restassured</groupId>
    <artifactId>restassuredtest</artifactId>
    <version>1.0-SNAPSHOT</version>
    <dependencies>
        <dependency>
            <groupId>com.jayway.restassured</groupId>
            <artifactId>rest-assured</artifactId>
            <version>2.4.1</version>
        </dependency>
        <dependency>
            <groupId>org.hamcrest</groupId>
            <artifactId>hamcrest-all</artifactId>
            <version>1.3</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.11</version>
        </dependency>
        <dependency>
            <groupId>pl.pragmatists</groupId>
            <artifactId>JUnitParams</artifactId>
            <version>1.0.4</version>
        </dependency>
    </dependencies>
</project>
```

We have added 4 dependencies to the POM as follows:

- **Rest-assured** – this is the Rest-Assured library itself
- **Hamcrest** – this is used for helping us to write better assertions in our tests
- **Junit** – our unit testing framework
- **JUnitParams** – a library that makes it easier for us to write and execute parameterised test

That should be everything that you need to get started. Ensure that the IDE imports all of the required files through Maven. Let’s start by writing a simple test to make sure that everything is working.

Now there are different ways of writing tests in Rest-Assured based on what it is you are trying to do. One way that it is common to start with is using the Given/When/Then structure that is borrowed from BDD (Behaviour Driven Development). The use of this structure in Rest-Assured can be broken down as follows:

- **Given** = This is where we would specify parameters when making the API call
- **When** = This is where we would call the API
- **Then** = This is where we check that the response is as we expect
  Ok, let’s start by writing a simple test that will call a HTTP GET. Create a new test class in your ‘test > java’ folder. Add the following code:

```java
@Test
    public void myFirstRestAssuredTest()
    {
        given().
            queryParam("name", "James").
        when().
            get("http://yourwebsiteaddress/api").
        then().
            body("title", equalTo("The Page Title"));
    }
```

Unfortunately we can’t run this test unless we have an API to call. Feel free to use the [Video Game DB](https://github.com/james-willett/VideoGameDB) for this.

In the above code, under the GIVEN we set a query parameter called ‘name‘ to ‘James’ (this isn’t actually used in this particular test, it’s just to demonstrate the functionality). Under the WHEN we call a ‘get‘ request to our API. Finally on the THEN line we check the HTML of the body, looking for the ‘title‘ and making sure that it is equal to ‘The Page Title’.

Rest-Assured supports all of the HTTP methods (GET, POST, PUT, DELETE). The most common ones that you will use are GET and POST. We looked at a GET above, so let’s now look at a POST. In the example below we are sending a POST to an API that returns a JSON response. Type out the code below:

```java
    @Test
    public void reserveARide()
    {
        given().
            header("Authorization", "abcdefgh-123456").
            param("rideId", "gffgr-3423-gsdgh").
            param("guestCount", 2).
        when().
            post("http://someWebsite/reserveRide").
        then().
            contentType(ContentType.JSON).
            body("result.message", equalTo("success"));
    }
```

Under the GIVEN, we are setting a HTTP header, which in this case is the Authorization header for the API. We are also setting a couple of parameters, rideId and guestCount, which will be set in the body of the HTTP request.

Under the WHEN, we perform a POST request to the specified URL.

Finally under the THEN, we first check that the content type is JSON as expected. We then check that the string in the JSON response under ‘result.message‘ is equal to ‘success‘. If this is confusing to you, fear not! In the upcoming posts, we will be looking in more detail at using Rest-Assured with JSON.

In the next post I will show a technique that I commonly use with Rest-Assured where I extract a JSON response from an API into an instance of a Rest-Assured class called ‘Response‘. Once we have extracted that response, we can go ahead and execute various tests against it.

---

# REST Assured Fundamentals – Out now on Udemy!

My Udemy course on **[REST Assured Fundamentals](https://www.udemy.com/rest-assured-fundamentals/?couponCode=TECHIETESTER)** is out now on Udemy.

[![REST Assured Fundamentals course title image](../extract-JSON-response/RestAssuredFundamentalsUdemyLogo.png)](https://www.udemy.com/rest-assured-fundamentals/?couponCode=TECHIETESTER)

For readers of my blog, I am offering the course with an 80% discount – [just use this promotion code](https://www.udemy.com/rest-assured-fundamentals/?couponCode=TECHIETESTER) !

---
