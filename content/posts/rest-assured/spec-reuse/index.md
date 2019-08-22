---
title: Specification Re-use in REST Assured
date: 2015-07-23
tags: [tag1, tag2, tag3, tag4]
slug: specification-re-use-in-rest-assured-with-responsespecbuilder-and-requestspecbuilder
image: ./spec-reuse-title.png
category: REST Assured
---

When you are writing tests against your API in Rest-Assured you might have some common expected results that you want to check every single time that you call the API. For example, look at the very simple test below:

```java
@Test
public void testSomeApi()
{
    when().
        get("http://yourWebsiteAddress.com/someAPIcall").
    then().
        statusCode(200).
        body(containsString("Your Website Title"));
}
```

What this test is doing is calling the ‘someAPIcall’ on ‘http://yourWebsiteAddress.com’ and then checking that the status code of the HTTP response is 200 (for an OK response) and that the body of the response contains a string with “Your Website Title“.

Suppose that you wanted to test lots of API calls on your website. It would probably be reasonable to test that every API call returned a status code of 200 and that the ‘Your Website Title’ string is present in the body of every call. Instead of having to write this into the test each time, you could specify a ResponseSpecBuilder at the top of your test class in a @BeforeClass annotated method like so:

```java
import com.jayway.restassured.builder.ResponseSpecBuilder;
import com.jayway.restassured.specification.ResponseSpecification;
import org.junit.BeforeClass;
import static org.hamcrest.Matchers.containsString;
public class ResponseSpecTest {

    public static ResponseSpecBuilder builder;
    public static ResponseSpecification responseSpec;

    @BeforeClass
    public static void setupResponseSpecBuilder()
    {
        builder = new ResponseSpecBuilder();

        builder.expectStatusCode(200);

        builder.expectBody(containsString("Your Website Title"));

        responseSpec = builder.build();
    }
}
```

Now we could re-write the original testSomeApi() test as below:

```java
@Test
public void testSomeApi()
{
    when().
        get("http://yourWebsiteAddress.com/someAPIcall").
    then().
        spec(responseSpec);
}
```

In all of your subsequent tests in this class, you can then simply make a call to spec(responseSpec) in the then() portion of the request and check for a status code of 200 and for the website title string to be in the body of the request.

You can also do a similar thing if you wish to re-use your request data in different tests. In the test below, we are specifying an Authorization code in our header and a login ID parameter when we make a POST request to our API :

```java
@Test
public void testAnApiPostCall()
{
    given().
        header("Authorization", "abcd-1234-xyz").
        param("loginID", "joebloggs").
    when().
        post("http://yourWebsiteAddress.com/somePostAPI").
    then().
        body("result.message", equalTo("success"));
}
```

Suppose that every time you made a POST call in your tests you always had to specify the authorization code in the header and the loginID as a parameter. You could specify a RequestSpecBuilder at the beginning of your test code, as in the example below:

```java
import com.jayway.restassured.builder.RequestSpecBuilder;
import com.jayway.restassured.specification.RequestSpecification;
import org.junit.BeforeClass;
public class RequestSpecTest {
    public static RequestSpecBuilder builder;
    public static RequestSpecification requestSpec;
    @BeforeClass
    public static void setupRequestSpecBuilder()
    {
        builder = new RequestSpecBuilder();
        builder.addHeader("Authorization", "abcd-123-xyz");
        builder.addParameter("loginID", "joebloggs");
        requestSpec = builder.build();
    }
}
```

Now you could re-write your original testAnApiPostCall() test as below, and you could reuse the requestSpec in all of the API calls that require the authorization header and the loginID parameter:

```java
@Test
public void testAnApiPostCall()
{
    given().
        spec(requestSpec).
    when().
        post("http://yourWebsiteAddress.com/somePostAPI").
    then().
        body("result.message", equalTo("success"));
}
```

I hope that you found this example useful. This functionality is of particular value if you have lots of different APIs to test but they all produce some common results. At a minimum, adding a check to ensure that every API call returns a response code of 200 is useful in itself.

---

# REST Assured Fundamentals – Out now on Udemy!

My Udemy course on **[REST Assured Fundamentals](https://www.udemy.com/rest-assured-fundamentals/?couponCode=TECHIETESTER)** is out now on Udemy.

[![REST Assured Fundamentals course title image](../extract-JSON-response/RestAssuredFundamentalsUdemyLogo.png)](https://www.udemy.com/rest-assured-fundamentals/?couponCode=TECHIETESTER)

For readers of my blog, I am offering the course with an 80% discount – [just use this promotion code](https://www.udemy.com/rest-assured-fundamentals/?couponCode=TECHIETESTER) !
