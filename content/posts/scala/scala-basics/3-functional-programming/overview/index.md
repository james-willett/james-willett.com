---
title: 'Functional Programming in Scala - Post Series'
date: 2019-09-17
tags: [all, scala, scala_fp_series]
slug: scala-functional-programming-overview
image: ./fp-overview-cover.png
summary: This post is the introduction and overview to the Functional Programming in Scala post series. Covers what you can expect to learn in this series of posts
category: Scala
prev: scala-packaging-imports
next: scala-functions-explained
---

This is the third series of blog posts on this site about Scala. In this series, we will be covering **Functional Programming in Scala**. I would recommend checking out the previous series, [Objected Oriented Programming in Scala](../blog/scala_oo_series/), before reading these posts.

As we have learned previously, Scala is simultaneously an object oriented AND functional programming language. In this series of posts, we will learn about the functional programming side of Scala.

# Rock the JVM

I was inspired to write these posts after taking the outstanding [Rock the JVM](https://rockthejvm.com) Scala courses by Daniel Ciocirlan. The material in these posts is heavily based on the [Scala for Beginners](https://www.udemy.com/course/rock-the-jvm-scala-for-beginners/?couponCode=ROCKTHEJVM) course on Udemy, and I would highly recommend enrolling on this course. _Thank you to Daniel for the work you do in producing such fantastic Scala content._

# Initial Setup

If this is your first time doing any coding in Scala, I recommend you first download the [Intellij IDE](https://www.jetbrains.com/idea/). The community edition is fine, and comes with Scala included.

Whenever you are writing new Scala code from these blog posts, first create a new Object by right-clicking in the [Project Panel](https://www.jetbrains.com/help/idea/project-tool-window.html) and choosing _New > Scala Class_ . Give the file a name, and select **Object**.

In the new file, extend the object from **App** like so:

```scala
object YourNewObject extends App {

}
```

And you are ready to go!

# Posts in the Series

You can view all the posts in the [Functional Programming in Scala](../blog/scala_fp_series/) series here.

Otherwise, go straight on to the first post in the series - [What is a Function in Scala?](../scala-functions-explained/)
