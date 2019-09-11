---
title: 'Object Oriented Programming in Scala - Post Series'
date: 2019-06-20
tags: [all, scala, scala_oo_series]
slug: scala-object-oriented-overview
image: ./object-oriented-cover.png
summary: This post is the introduction and overview to the Object Oriented Programming in Scala post series. Covers what you can expect to learn in this series of posts
category: Scala
next: scala-object-oriented-basics
prev: scala-string-operations
---

This is my second series of posts about Scala, specifically covering **Object Oriented Programming in Scala**. Check out the first series, [Scala - The Absolute Basics](../blog/scala_basics_series/), before reading these posts.

Scala is simultaneously an object oriented AND functional programming language. In this series of posts, we will focus heavily on the object oriented features of the language.

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

You can view all the posts in the [Object Oriented Programming in Scala](../blog/scala_oo_series/) series here.

Otherwise, go straight on to the first post in the series - [Object Oriented Basics in Scala](./scala-object-oriented-basics/).
