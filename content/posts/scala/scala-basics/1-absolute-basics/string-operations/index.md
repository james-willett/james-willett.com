---
title: 'String Operations in Scala'
date: 2019-06-18
tags: [tag1, tag2, tag3, tag4]
slug: scala-string-operations
image: ./string-operations-cover.png
summary: In this final post of the series, we focus on some of the main operations used to manipulate strings in Scala
category: Scala
prev: scala-default-named-arguments
---

[[info]]
| This blog post focuses on some of the main operations used to manipulate strings in Scala
| You should be able to follow along with the code examples either in the Scala REPL or Scala Playground of any IDE.
| Alternatively you can use [ScalaFiddle](https://scalafiddle.io/) to follow along in your browser.
| The source code for the examples in this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/absoluteBasics/StringOperations.scala).

This is the final blog post in this series on some of the absolute basics of Scala. In it, we will look at some of the most common operations that are used to manipulate strings in Scala. Some of these operations are taken from Java, whilst others are exclusive to Scala.

# Java String Operators

Remember that Scala runs on top of the JVM, and as such has access to all the traditional Java code including it's string operators. Let's look at some string operators from Java and their use in Scala.

Take a simple string like this in Scala:

```scala
  val str: String = "Hi, my name is James"
```

## Print a character at a certain index

This will print the character at the specified index in the string:

```scala
  println(str.charAt(4))
```

## Print all characters between 2 indexes

Returns a string with all the characters between two indexes of the string:

```scala
  println(str.substring(4,11))
```

## Split a string

Returns an array of strings, with each string separated by the specified value, in this case a space:

```scala
  println(str.split(" ").toList)
```

## Check string starts with specified characters

This returns true or false depending on if the string starts with the string specified:

```scala
  println(str.startsWith("Hi,"))
```

## Replace characters in a string

Replace functions will replace two characters within the string, for example replace all spaces with dashes is a common use of this operation:

```scala
  println(str.replace(" ", "-"))
```

## To upper or lower case

This one is commonly used, makes everything in the string lowercase or uppercase. Note that you can omit the empty parentheses here if you so wish, although I prefer to keep them in. We discussed calling parameters without parentheses in this [blog post on functions](./scala-basics-functions#functions-with-no-parameters):

```scala
  println(str.toLowerCase())
  println(str.toUpperCase())
```

## Length of a string

Finally, another common operation used is getting the length of the string. Again, you can call this function either with or without parameters:

```scala
  println(str.length())
  println(str.length)
```

# Scala String Operators

Let's move on and look at some Scala specific string operators:

## Convert a string

You can convert a string to another type, for example to an integer:

```scala
  val aNumberString = "43"
  val aNumber = aNumberString.toInt
```

## Concatenate a string

There is also concatenation with pre-pending and appending - i.e. putting a value either in front or at the end. For prepending the syntax is _+:_, for appending the syntax is _:+_:

```scala
  println('a' +: aNumberString :+ 'z')
```

## Reverse characters

Scala can also reverse the characters in a string:

```scala
  println(str.reverse)
```

## Extract characters from a string

You can also take a specified number of characters out of the string:

```scala
  println(str.take(6))
```

# String interpolators in Scala

Let's look at String interpolators, another Scala specific feature.

## S-interpolators

We will start with **S-interpolators**... note the 's' at the front of the _message_ string below. This allows us to replace the parameters in the String with their corresponding values:

```scala
  val name = "James"
  val age = 21
  val message = s"Hello, my name is $name and I am $age years old"
```

We can also evaluate complex expressions in S-interpolated expressions, for example like so:

```scala
  val anotherMessage = s"Hello, my name is $name and I will soon be ${age+1} years old"
  println(anotherMessage)
```

## F-interpolators

We also have Function interpolators, or **F-interpolators**. This is for formatted strings in a [printf](https://www.baeldung.com/java-printstream-printf) like fashion.

The **f** at the start of the string says that some values might be injected.

The **\$** sign says that this will expand a value, followed by the name of the parameter (e.g. name, or speed in this case).

The **%s** at the end indicates that this should be a string... or in the case of speed, that this should be a floating point number with 2 characters total and 2 decimal places.

```scala
  val speed = 3.4f
  val phrase = f"$name is running at $speed%2.2f miles per hour"
  println(phrase)
```

F-interpolators can also check for type correctness. In **someString** below, the %3d format requires that x be an integer. Otherwise the compiler fails with a _required Int found Float_ exception:

```scala
  val x = 1.1f
  val someString = f"$x%3d"
```

## Raw interpolator

Finally let's look at the raw interpolator, which is used to print a String literally. For example, this will print the entire string without going to a new line:

```scala
  println(raw"This is a \n newline")
```

One thing to note with raw interpolators is that injected variables DO get escaped. So for example in the below, a new line will be inserted:

```scala
  val escaped = "This is a \n newline"
  println(raw"$escaped")
```

---

# Summary

In this post we looked at some of the most common string operations that are used in Scala. Some of these operators come from Java (remember Scala runs on the JVM), whilst others are exclusive to Scala.

This post concludes our series on the absolute basics of Scala.

# Source code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/absoluteBasics/StringOperations.scala).

---
