---
title: 'Exceptions in Scala'
date: 2019-09-11
tags: [all, scala, scala_oo_series]
slug: scala-exceptions
summary: Exceptions in Scala are inherited from the JVM, i.e. from Java. In this post, we will look at how to throw and catch exceptions, as well as defining our own custom ones
image: ./scala-exceptions-cover.png
category: Scala
prev: scala-case-classes
next: scala-packaging-imports
---

[[info]]
| This post is **part 9** of the _Object Oriented Programming in Scala_ series. You can view [all the posts in the series](../blog/scala_oo_series) here.

When it comes to dealing with Exceptions in Scala, know that we are dealing with a JVM concept. Or to put it another way, exceptions in Scala are actually just taken from Java.

How do you define an exception? Basically, an exception is the code that gets executed when your application crashes.

# Simple Example of Exceptions in Scala

Let's jump straight in with a simple example of how we could crash our Scala program:

```scala
val x: String = null
println(x.length) // this will crash with a null pointer exception
```

When we run this code, it will crash with the famous [null pointer exception](https://stackoverflow.com/questions/218384/what-is-a-nullpointerexception-and-how-do-i-fix-it). What happens here, is when the **length** method is called on x (which has been set to **null**), a null pointer exception is thrown and our application crashes because there is nothing to catch the exception.

# Throwing Exceptions in Scala

You may have heard the technical terms of _throwing and catching_ exceptions. Let's look at **throwing exceptions** first:

We can throw a null pointer exception in our code like so:

```scala
throw new NullPointerException
```

With this line, we are intentionally throwing an exception and crashing our program when this line is executed.

Like everything else in Scala, throwing an exception is an [expression](./scala-expressions/), so it could actually be assigned to something, e.g:

```scala
val someWeirdValue = throw new NullPointerException
```

If we look at the type of **someWeirdValue** in the compiler (by hovering over it), we can see that it is of type [Nothing](https://medium.com/@juntomioka/what-is-scalas-nothing-type-for-6d1a1d4bcc02) . So the variable doesn't actually hold the value of _Nothing_, but it can be assigned to point to something.

We could explicitly set the type of **someWeirdValue** to a String. This is also fine, because _Nothing_ is a valid substitute for any type:

```scala
val someWeirdValue: String = throw new NullPointerException
```

## Exceptions are Classes

If you have never dealt with Java or the JVM before, you might wonder why we have the **new** keyword here when throwing the exception. The answer is that [exceptions are actually instances of classes](https://docs.oracle.com/javase/specs/jls/se7/html/jls-11.html). **NullPointException** is a class. We instantiate it, and throw an _instance_ of it.

The property of a class to be throwable is restricted by that class extending (or deriving from) the [Throwable](https://docs.oracle.com/javase/7/docs/api/java/lang/Throwable.html) type. All throwable classes extend the 'Throwable' class.

## Exceptions vs Errors

Derided from the Throwable class are **Exceptions** (i.e. the class [Exception](https://docs.oracle.com/javase/7/docs/api/java/lang/Exception.html)) and Errors (i.e. the class [Error](https://stackoverflow.com/questions/14196820/why-do-we-need-error-class)) - these are the major throwable subtypes.

Both exceptions and errors will crash the JVM, but they are different in their semantics.

- **Exceptions** denote something that went wrong with the program, e.g. a NullPointerException
- **Errors** note something that went wrong with the system, for example a [Stack Overflow error](https://stackoverflow.com/questions/214741/what-is-a-stackoverflowerror) - you exceeded the memory of the JVM stack

# Catching Exceptions

Now that we know how to throw exceptions, let's next look at how we might catch exceptions in Scala.

The method below has the potential to throw an exception when called:

```scala
def getInt(withExceptions: Boolean): Int = {
  if (withExceptions) throw new RuntimeException("No int to be returned")
  else 43
}
```

If we call the above method with the parameter **true**, then the **RuntimeException** will be thrown.

The way that we guard against exceptions in Scala is by using a **try / catch / finally** block. For example, using the above method we could write:

```scala
try {
   // this is the that might throw an exception
   getInt(true)
} catch {
   // this code gets executed if the above try block throws an exception
   case e: RuntimeException => println("caught a Runtime exception")
} finally {
   // this code gets executed no matter what
   println("finally block")
}
```

When we run this code, the program doesn't crash, but instead prints out the exception and carries on:

> "caught a Runtime exception"

The code in the finally block _always_ gets executed, whether an exception is triggered in the catch block or not.

If we changed the above code to try and catch a **NullPointerException** instead of a RuntimeException:

```scala
try {
   // this is the that might throw an exception
   getInt(true)
} catch {
   // this code gets executed if the above try block throws an exception
   case e: NullPointerException => println("caught a Runtime exception")
} finally {
   // this code gets executed no matter what
   println("finally block")
}
```

Then this will crash the program, because we aren't catching the correct exception. It will print out the String for the error that we defined when creating the RuntimeException:

> "No int to be returned"

Notice that the **finally block** string was still printed out.

## Try / Catch / Finally block is an Expression

Like everything else in Scala, the try / catch / finally block is an expression. What is the type of this expression? If we assign it to a val, we can see in the IDE that the type is [AnyVal](https://www.scala-lang.org/api/current/scala/AnyVal.html):

```scala
val potentialFail = try {
   // this is the that might throw an exception
   getInt(true)
   } catch {
   // this code gets executed if the above try block throws an exception
   case e: RuntimeException => println("caught a Runtime exception")
   } finally {
   // this code gets executed no matter what
   println("finally block")
}
```

When we execute this block, the value returned from getInt is an **Int**, but the value returned from the catch block is a **Unit**. So when the compiler tries to unify int and unit, it gets **AnyVal**.

If we instead returned a number when catching the exception:

```scala
val potentialFail = try {
   // this is the that might throw an exception
   getInt(true)
} catch {
   // this code gets executed if the above try block throws an exception
   case e: RuntimeException => 44
   } finally {
   // this code gets executed no matter what
   println("finally block")
}
```

Then the type becomes an **Int**. Because the try block returns Int, and all the catch cases (there is only 1 case) return an Int.

The **finally** block is always optional, and it does not influence the return type of the expression. We only use **finally** for side effects, for example logging something to a file.

# Define your own Exceptions in Scala

Remember that exceptions are instances of special classes that derive from Exception or Error.

You normally only derive from Exception when writing custom exceptions, rarely from Error.

You could create and throw your own exception in Scala like so:

```scala
class MyException extends Exception
val exception = new MyException

throw exception
```

This will crash your program with a **MyException** custom exception.

# Crash your Scala Application with Out of Memory Exception

Let's look at how we can deliberately crash our program with an [Out of Memory](https://stackoverflow.com/questions/40406270/what-is-the-cause-of-outofmemoryerror-in-scala/40406481) error.

Basically we need to allocate more memory than the JVM has available. This is one way to do it:

```scala
val array = Array.ofDim(Int.MaxValue)
```

Here we are defining an array that has too many elements. We use [Array.ofDim](https://alvinalexander.com/scala/how-to-create-multidimensional-arrays-in-scala-cookbook) to allocate an array with a specific number of elements, in this case the **maximum value of Int**.

This will crash the program with:

> java.lang.OutOfMemoryError: Requested array size exceeds VM limit

# Crash your Scala Application with a Stack Overflow Error

To create a [stack overflow error](https://www.baeldung.com/java-stack-overflow-error), we can define an infinite recursive method:

```scala
def infinite: Int = 1 + infinite
```

So here we have a method called **infinite**, the return type is an int. When we call it, it returns 1 + infinite (i.e. itself).

If we now call it:

```scala
val noLimit = infinite
```

This will crash with:

> java.lang.StackOverflowError

And a large stack trace!

# Create a Pocket Calculator in Scala - with Exception Handling

To take our understanding of exceptions further, we are going to create a simple calculator application.

The application has methods to add, subtract, multiply and divide any two integers.

The following custom exceptions will be thrown:

- **OverflowException** if add(x,y) exceeds [Int.MAX_VALUE](http://www.java2s.com/Tutorial/SCJP/0160__Utility-Classes/IntegerMAXVALUEisthelargestvalueandIntegerMINVALUEthesmallestthatanintprimitivecancontain.htm)
- **UnderflowException** if subtract(x,y) exceeds [Int.MIN_VALUE](https://garygregory.wordpress.com/2011/02/02/what-are-javas-min-and-max-values/)
- **MathCalculationException** for division by 0

## The Add Method

Let's start by creating our calculator and implementing the add method. Before we include any exception handling, it might look like this:

```scala
object PocketCalculator {
    def add(x: Int, y: Int) = {
        val result = x + y
        result
    }
}
```

The problem we have here is, how to test if result exceeds **Int.MaxValue**? We can't do a simple comparison, because result will _never_ be able to hold an Int that is bigger than max value. But if we call the add method like this:

```scala
println(PocketCalculator.add(Int.MaxValue, 10))
```

We see that the result is **-2147483639** - i.e. it is _NEGATIVE_.

So a positive value plus another positive value returning a _negative_ value means that we have the overflow exception.

We can therefore rewrite our add method like so:

```scala
object PocketCalculator {
    def add(x: Int, y: Int) = {
      val result = x + y
      if(x > 0 && y > 0 && result < 0) throw new OverflowException
    }
}
```

Of course, we need to define the three exceptions as well. Let's define them all now:

```scala
class OverflowException extends RuntimeException
class UnderflowException extends RuntimeException
class MathCalculationException extends RuntimeException("Division by 0")
```

Notice that when we define the **MathCalculationException**, we add the string for the error message as a parameter for the parent constructor.

To complete our add method, we will also handle the **UnderflowException**, for when two negative values are added:

```scala
object PocketCalculator {
    def add(x: Int, y: Int) = {
      val result = x + y
      if(x > 0 && y > 0 && result < 0) throw new OverflowException
      else if(x < 0 && y < 0 && result > 0) throw new UnderflowException
      else result
    }
}
```

If neither of the expressions with exceptions are triggered, we return the result at the end.

## The Subtract Method

This is the method for subtracting:

```scala
def subtract(x: Int, y: Int) = {
    val result = x - y
    if (x > 0 && y < 0 && result < 0) throw new OverflowException
    else if (x < 0 && y > 0 && result > 0) throw new UnderflowException
    else result
}
```

We are saying that if x is _bigger_ than 0 and y is _less_ than 0, that means subtracting x from y means _adding 2 positive numbers_. The result is less than 0, so we throw an overflow exception.

Otherwise if x is _less_ than 0 and y is _bigger_ than 0 then we are adding two negative numbers and the result is positive, so throw an underthrow exception.

## The Multiply Method

Next up let's implement the multiply method:

```scala
def multiply(x: Int, y: Int) = {
   val result = x * y
   if (x > 0 && y > 0 && result < 0) throw new OverflowException
   else if (x < 0 && y < 0 && result < 0) throw new OverflowException
   else if (x > 0 && y < 0 && result > 0) throw new UnderflowException
   else if (x < 0 && y > 0 && result > 0) throw new UnderflowException
   else result
    }
```

This isn't as complicated as it first looks. Let's talk through the four possible exceptions in order:

- If x is _bigger_ than 0 and y is _bigger_ than 0, and the **result** is suddenly less than 0 (i.e. negative), then throw the OverflowException
- Next if both x and y are less than 0 (i.e. _negative_), we would expect the result of multiplying them both to be positive. So if the result is less than 0, we again throw the OverflowException
- If x is positive, and y is negative, we would expect the result to be negative. If the result is therefore positive, we will throw the UnderflowException
- And vice versa, if y is positive and x is negative we would expect the result to be negative. Again, if the result is positive, throw the UnderflowException

## The Divide Method

Finally for the divide method:

```scala
def divide(x: Int, y: Int) = {
   if (y == 0) throw new MathCaluclationException
   else x / y
}
```

This one is pretty simple. If y is 0 (i.e. we are trying to divide by 0) we throw the **MathCalculationException**

# Summary

From reading this post, you should now know that exceptions in Scala crash your program!

- We learned how to throw an exception, and throwing exceptions returns Nothing
- We saw how to catch exceptions with the **try / catch / finally** block
- And we learned how to define our own _custom exceptions_ by deriving **Exception** or **Error** or the **Throwable** types from Java

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/objectOriented/Exceptions.scala).
