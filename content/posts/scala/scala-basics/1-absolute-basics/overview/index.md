---
title: 'Scala - The Absolute Basics - Post Series'
date: 2019-05-01
tags: [all, scala, scala_basics_series]
slug: scala-absolute-basics-overview
image: ./scala-basics-overview-cover.png
summary: This post is the introduction and overview to the Absolute Basics in Scala post series. Includes initial instructions for setting up your development environment
category: Scala
next: scala-values-variables-types
---

This is a series of posts covering the _**Absolute Basics in Scala**_. If you are just starting out with using Scala for the first time, this should be a great place to start. Scala can be a difficult language to learn. Particularly if you are used to a purely object oriented language like Java.

Because of the depth and complexity of the language, textbooks and documentation can be huge and overwhelming. This is especially true for beginners to programming. This and the subsequent other series of posts about Scala on this site attempt to condense the key functionality of the language into easily digestible portions.

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

You can view all the posts in the [Scala - Absolute Basics Series](../blog/scala_basics_series/) here.

Otherwise, go straight on to the first post in the series - [Values, Variables and Types in Scala](./scala-values-variables-types)
