---
title: 'Groovy GPath in REST Assured – Part 1: Overview of Groovy'
date: 2017-05-06
tags: [tag1, tag2, tag3, tag4]
slug: groovy-gpath-in-rest-assured-part1-overview
image: ./restAssuredPurple.png
category: REST Assured
next: rest-assured-gpath-json
---

Currently I am working on a video tutorial series for REST Assured. One of the topics that I will cover in-depth is how to use GPath in REST Assured properly. I figured I would publish a series of posts on my blog as a warm up to the topic.

**(Update: My [REST Assured Fundamentals](https://www.udemy.com/rest-assured-fundamentals/?couponCode=TECHIETESTER) course is out now!)**

When working with REST Assured you will almost certainly at some stage want to extract values from elements and perform assertions on them (or do something else). These extractions can be simple, like getting a single unique value that only appears once in the response.

Often though, in the real world of production systems and huge swathes of data, things aren’t as simple. You may have a huge JSON array containing many JSON objects in an undefined order, and only want to pick ones that match a certain condition. This is where GPath in REST Assured comes in.

Not to worry if any of this is new to! We will be looking at a range of techniques for data extraction in this series of posts (and the video tutorial series to follow soon) that will have you adapt at using GPath in REST Assured in no time.

---

# REST Assured Fundamentals – Out now on Udemy!

My Udemy course on **REST Assured Fundamentals** is out now on Udemy.

[![REST Assured Fundamentals course title image](../../extract-JSON-response/RestAssuredFundamentalsUdemyLogo.png)](https://www.udemy.com/rest-assured-fundamentals/?couponCode=TECHIETESTER)

For readers of my blog, I am offering the course with an 80% discount – [just use this promotion code](https://www.udemy.com/rest-assured-fundamentals/?couponCode=TECHIETESTER) !

---

## Introduction to GPath in REST Assured

In this first post I’ll set the scene with a bit of background information. REST Assured uses [Groovy](http://groovy-lang.org/) under the hood. This means we can use the Groovy syntax when writing our code, and it gives us immense power. Groovy comes with a path expression language called GPath. It is this that is used to extract responses. You could say that GPath is similar to XPath for XML, but the great thing is that it works for both XML and JSON. Perfect for REST Assured!

GPath in REST Assured is so powerful, that you would think there would be loads of information and examples on the web of how to utilise it…Not true! Actually I have really struggled to find a decent resource for it, so I decided I would go ahead and create one myself.

Now if you are reading this post, you probably want to know how to harness this Groovy / GPath power as quickly as possible. Preferably without having to do a deep dive and learn yet another programming language. If this is you, then you are in the right place.

## Install Groovy (or don't...)

You might well want to do a full install of Groovy, and explore the language in depth on your own machine. In fact, if you have the time and motivation to do it, I recommend you do! Groovy is a powerful language for the Java Platform that continues to gain popularity and is used on many production systems. See this [post on Quora](https://www.quora.com/Whos-using-Groovy-in-production) for more details.

I’m not going to cover Groovy installation and configuration in this post, but if you want to grab it and install it just head to the [Groovy download page](http://groovy-lang.org/download.html) and follow the instructions for your OS. Do let me know in the comments if you want to see a more comprehensive guide to installing and getting started with Groovy. I will create one if there is demand.

If you are in a hurry, and just want to get some GPath goodness into your REST Assured script quickly, I suggest using the [Groovy Playground](https://groovy-playground.appspot.com/) . This will let you quickly practice your Groovy and GPath expressions that you will ultimately use in your REST Assured code, without having to install anything.

## Introduction to Groovy – Super Fast Crash Course Style

In case you have no Groovy exposure whatsoever, let’s take a quick look at some very basic concepts. It will be useful for you to have a basic grasp of Groovy so that you can understand how to use GPath in REST Assured. You can follow along and type all of these examples in the [Groovy Playground](https://groovy-playground.appspot.com/)

### Closures & it

Groovy closures harness real power for GPath in REST Assured. Closures work like [Java 8 lambdas](https://www.tutorialspoint.com/java8/java8_lambda_expressions.htm), allowing for the execution of anonymous blocks of code. Type in the following at the Groovy Playground:

```groovy
def helloMessage = {
    println "Hello user!
}
helloMessage()
```

We defined a function called **helloMessage()** and called it. Simple.

You can also put parameters into the function like this:

```groovy
def multiply = { int x, int y ->
  return (x * y)
}
println multiply(2, 4) // Will print 8
```

Now if you don’t specify any parameters, the closure can accept one special parameter, the implicit variable called **it**. You will be seeing and using it alot with GPath in REST Assured. This special variable holds the current value of the loop.

So you could use **it** simply like this:

```groovy
def talk = { println  it }
talk "Hello there"
```

or this:

```groovy
def square = { it * it }
println square(5) // will print 25
```

In the examples above the “loop” or closure only iterates once. This isn’t how we will use **it** with GPath in REST Assured, but I wanted to show you how **it** works at the basic level.

Let’s see another example. First define a simple list, and use a closure with **it** to print out everything in the list:

```groovy
def myList = [2,3,4,4,4,5,5,6]
myList.each {
    println it
}
```

This will iterate through the list and printout the current value of **it** each time. Remember, **it** holds the current value of the loop.

Now that we know some very basics about Groovy and **it**, let’s take a quick look at some other key methods we will likely use with GPath in REST Assured.

### Find

Find will return a single value that matches the closure predicate:

```groovy
def greaterThanFive = myList.find { it > 5 } // returns 6 when called
```

If there is more than one condition satisfied by the close, Find will return the first occurrence only:

```groovy
def firstValueGreaterThanTwo = myList.find { it > 2 } // returns 3
```

### FindAll

We can use findAll to return a new collection with all the results that match the condition. Similar to the example above:

```groovy
def allValuesGreaterThanTwo = myList.findAll { it > 2 } // returns a list with all the values greater than 2
```

We can also call additional methods on it, such as length():

```groovy
def people = ['Tom', 'Dick', 'Harry', 'Kester']
def peopleWithMoreThanFourLetters = people.findAll { it.length() > 4 } // returns a list with Harry and Kester
```

We will be seeing examples of how powerful and useful this is for GPath in REST Assured over this series of posts.

### Collect

If you want to do some transformation to each element of a list, and collect the responses in a new list, you can use the collect method:

```groovy
def peopleNamesToUpperCase = people.collect { it.toUpperCase() }
```

This will iterate through the list, and create a new list of names in uppercase. The difference between this and findAll() is the transformation that happens on **it**, instead of looking for **it** to satisfy a condition.

### Max / Min / Sum

Finally, see the examples below for how we can use the max(), min() and sum() methods:

```groovy
def myList = [2,3,4,4,4,5,5,6]
def sumOfMyListValuesGreaterThanFour = myList.findAll { it > 4 }.sum() // returns 16
def minValueGreaterThanTwo = myList.findAll { it > 2 }.min() // returns 3
def maxValueBetweenThreeAndFive = myList.findAll { it > 3 && it < 5 }.max() // returns 4
```

In the example, you can see that results are returned to a new list that match the condition in the closure. The methods sum(), min() or max() are then called on the new list, and the result is assigned to the variable.

## Conclusion

If you have followed through this post and had no previous experience of Groovy, then you should have some basic primer knowledge now. You may not have a concrete understanding, especially if this is your first exposure to Groovy, but that is OK. With the examples here, and the specific ones to use GPath in XML and JSON to follow, you will have enough knowledge and flexibility to do really powerful stuff in with GPath in REST Assured!

I hope that you found this post useful. Please subscribe to the mailing list to be informed of the latest REST Assured posts as soon as they are published!

---
