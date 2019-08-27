---
title: Extracting a JSON Response with REST Assured
date: 2015-06-16
tags: [tag1, all, restassured]
slug: rest-assured-extract-json-response
summary: |
  How to extract a JSON response in REST Assured and then use that response later on in your tests
image: ./extract-json-response-cover.png
category: REST Assured
prev: getting-up-and-running-with-rest-assured
---

In the previous blog post, we went over everything that we needed to get up and running quickly. In this post I am going to focus on one of the features of Rest-Assured that I use regularly: **extracting a response.**

---

# REST Assured Fundamentals – Out now on Udemy!

My Udemy course on **REST Assured Fundamentals** is out now on Udemy.

[![REST Assured Fundamentals course title image](./RestAssuredFundamentalsUdemyLogo.png)](https://www.udemy.com/rest-assured-fundamentals/?couponCode=TECHIETESTER)

For readers of my blog, I am offering the course with an 80% discount – [just use this promotion code](https://www.udemy.com/rest-assured-fundamentals/?couponCode=TECHIETESTER) !

---

## Introduction

This post will cover REST Assured extracting a response from an API into a ‘Response‘ class. Once we have extracted the response, we can perform various tests to check the content of that response. I will also demonstrate how we can set the **Base URI** and the **Base Path** easily.

Please note that in all of my blog posts on REST Assured I am going to assume that you have a decent working knowledge of Java and Junit. If you have little or no experience with those, I can highly recommend the book from Alan Richardson called [Java For Testers](https://leanpub.com/javaForTesters) which will get you up to speed in no time!

## Setting Base URL and Path

Let’s start with an example that shows how to set the base URI and base Path. In your project in your IDE go ahead and create a new test class. Add the following code:

```java
public class RestAssuredTest {

    @BeforeClass
    public static void setupURL()
    {
        // here we setup the default URL and API base path to use throughout the tests
        RestAssured.baseURI = "http://yourwebsiteaddress.com";
        RestAssured.basePath = "/api/yourapi/";
    }
}
```

It should be quite obvious what we are doing here. We are simply setting the default URI and default basePath to use in all of our tests.

Now when we write out a test that calls an API (as we will do in the next step), we don’t have to type in the full address of the API.

## Extract a Response from the API

Moving on, let’s look at REST Assured extract response. Type out the following code so that your class looks like below, which will make a call to our API called ‘rides’:

```java
public class RestAssuredTest {

    public static Response response;
    public static String jsonAsString;

    @BeforeClass
    public static void setupURL()
    {
        // here we setup the default URL and API base path to use throughout the tests
        RestAssured.baseURI = "http://yourwebsiteaddress.com";
        RestAssured.basePath = "/api/yourapi/";
    }

    @BeforeClass
    public static void callRidesAPI()
    {
        // call the rides API, the full address is "http://yourwebsiteaddress.com/api/yourapi/rides",
        // but we set the default above, so just need "/rides"
        response =
            when().
                get("/rides").
            then().
                contentType(ContentType.JSON).  // check that the content type return from the API is JSON
            extract().response(); // extract the response

        // We convert the JSON response to a string, and save it in a variable called 'jsonAsString'
        jsonAsString = response.asString();
    }
}
```

Let’s talk through the code and work out what’s going on. At the top of the test we set a couple of variables:

```java
public static Response response;
public static String jsonAsString;
```

These will be used to hold our response from the API, and then to convert that response into a String.

On to the response code itself:

```java
response =
    when().
        get("/rides").
    then().
        contentType(ContentType.JSON).  // check that the content type return from the API is JSON
    extract().response(); // extract the response
```

So here we are using the traditional given / when / then structure that we outlined in the previous post, but we are skipping the ‘given’ part since we don’t have to specify any parameters for this call.

We start with the ‘when‘ method and use the ‘get’ method to call ‘/rides‘. Remember that we set the defaults for the base URI and Path at the start of the test, so the full address of the api that is actually being called here is ‘http://yourwebsiteaddress.com/api/yourapi/rides‘.

Next we move on to the ‘then‘ part to check the response. We simply add a check ‘contentType(ContentType.JSON)‘ to make sure that the response we get is in JSON format.

With all of the above completed we can now extract the response into the variable by calling the ‘extract().response()‘ methods.

Now that we have the response saved into a variable, it’s simply a case of converting that into a String:

```java
jsonAsString = response.asString();
```

We now have a variable with the JSON response as a String, and we can use that for our subsequent testing.

## Example JSON

The above API address is obviously not real and will not return any data. If you have access to an API that will return a JSON response then feel free to use that instead. I have developed a simple API that supports both JSON and XML and can be easily run locally, the [Video Game DB](https://github.com/james-willett/VideoGameDB)

For demonstration purpose in the meantime, this is an example of the JSON that would be returned from making a call to this sort of API – some data on rides in a theme park:

```json
[
  {
    "state": "open",
    "throughput": 800.0,
    "id": "ab76f-vaf3-2f2r",
    "name": "Stealth Strike",
    "description": "Are you brave enough to ride the legendary 'Stealth Strike' ?",
    "info": {
      "visible.restrictions.min_height": "140cm"
    }
  },
  {
    "state": "open",
    "throughput": 400.0,
    "id": "jfy3-34fg-45ht",
    "name": "The Rapids",
    "description": "Enjoy a leisurely ride on our famous boat ride",
    "info": {
      "visible.restrictions.min_height": "110cm",
      "visible.restrictions.min_accompanied_height": "90cm"
    }
  },
  {
    "state": "open",
    "throughput": 320.0,
    "id": "abfg-3432-gft5",
    "name": "Big Leap",
    "description": "Take a leap into the unknown on this scary roller coaster",
    "info": {
      "visible.restrictions.min_height": "130cm",
      "visible.restrictions.min_accompanied_height": "100cm"
    }
  }
]
```

## Asserting on the Response

So now that we have the above JSON as a String in our test, we can use Rest-Assured to do some testing to check the response.

A simple test would be to check the number of rides that our returned by the API call, i.e. the number of entries in the JSON response.

One way we could do this is with an ArrayList. Type out the following test below (still inside the ‘RestAssuredTest.class’ file):

```java
@Test
public void checkForNumberOfRides()
{
    // first we put our 'jsonAsString' into an ArrayList of Maps of type <String, ?>
    ArrayList<Map<String,?>> jsonAsArrayList = from(jsonAsString).get("");

    // now we count the number of entries in the JSON file, each entry is 1 ride
    assertThat(jsonAsArrayList.size(), equalTo(3));
}
```

In the above code, we use Rest-Assured to convert our ‘jsonAsString’ String into an ArrayList of Map<String,?> called ‘jsonAsArrayList’.

We then do an assertThat on the jsonAsArrayList to check that the size is equal to 3, the same as the number of entries in the JSON response.

Another test that we could perform is to check that the ‘state’ of all the rides is equal to open. This time we will just use the ‘response’ variable (not the string!) and we will convert that into a List<String>. Type out the following test:

```java
@Test
public void checkAllRidesAreOpen()
{
    // put all of the ride states into a list
    List<String> rideStates = response.path("state");

    // check that they are all 'open'
    for (String rideState : rideStates)
    {
        assertThat(rideState, equalTo("open"));
    }
}
```

In the above code we create a List of the rideStates by taking the response variable and calling the ‘.path‘ method with the argument (“state”).

What this REST Assured code simply does is goes through the JSON response and looks for all the ‘state’ keys and adds their value to a list. In this case, it should add three entries to the List that should all be “open”. Finally we use a foreach loop to check that all of the entries in the List are equal to “open”.

## Summary

In this post we explored how we can extract a JSON response from an API directly into our code and then how we can execute tests to check that the content is as we expected. This is barely scratching the surface of what REST Assured can do, and there are literally hundreds of different tests that we could execute, but hopefully after reading this you are getting some idea of what can be done.

Unfortunately in this test we didn’t have access to an API that we could actually use and therefore we couldn’t actually see any of these tests running. In the next post, I will type the JSON example in this post directly into our program and then we can use that as if we had called the API and converted it into a String (as we did in this post). Continuing with the ‘Rides’ theme, I am also going to demonstrate how you can write some test data into your program, add that to a Java Map, and then compare your test data with the response from the URL. We will also be executing some parameterised testing using the JUnitParams library.

---
