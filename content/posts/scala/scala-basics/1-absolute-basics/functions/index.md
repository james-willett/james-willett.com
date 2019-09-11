---
title: 'Functions in Scala'
date: 2019-06-07
tags: [all, scala, scala_basics_series]
slug: scala-functions
image: ./functions-cover.png
summary: No doubt you will have heard of functions from other programming languages, but in this post we introduce them in Scala
category: Scala
prev: scala-expressions
next: scala-recursion
---

[[info]]
| This post is **part 3** of the _Scala - The Absolute Basics_ series. You can view [all the posts in the series](../blog/scala_basics_series) here.

## A Basic Function

No doubt you will have heard about _Functions_ from other programming languages, so let's take a look at a basic one in Scala:

```scala
  def someFunction(a: String, b: Int): String =
    a + " " + b
```

Let's break down the function word by word:

- We first define the function with the _def_ keyword.
- Then we give the function a name, in this case _someFunction_
- In brackets, we declare the parameters for the function. We also specify a type for each parameter. In this case we have a parameter called _a_ of type **String** and a parameter called _b_ of type **Int**
- After the brackets, we declare the return type of the function - in this case a **String**
- Finally after the equals sign we have the [expression](/scala-basics-expressions) for the function itself, in this case concatenating together the parameters a and b

Call the function by supplying the required parameters:

```scala
  println(someFunction("someText", 3))
```

## Functions with no Parameters

You can also create a function that has no parameters, by including an empty set of parentheses:

```scala
  def someFunctionWithNoParameters(): Int = 23
```

As this is a function with no parameters, you can call it in either of the ways below.

```scala
  println(someFunctionWithNoParameters)
  println(someFunctionWithNoParameters()) // better
```

It is preferred to specify the empty set of parentheses, since this makes it clearer in your code that you are calling the function. The compiler will also display a warning about accessing an empty-paren method otherwise.

## Recursive Functions

In the [previous blog post](/scala-basics-expressions) we touched on writing loops in Scala, and how it differs from imperative programming languages such as Java. In Scala, we prefer to use **Recursive Functions** (i.e. Functions that call themselves) to handle looping for us.

Let's look at a simple example. This recursive function will print out the supplied text by the number of times specified:

```scala
  def someRecursiveFunction(aString: String, n: Int): String = {
    if (n == 1) aString
    else aString + someRecursiveFunction(aString, n-1)
  }
```

So if we called the function as below, it will print out _someText_ 3 times:

```scala
  println(someRecursiveFunction("someText", 3))
```

The function is essentially looping over itself, until it satisfies the first condition of **(n == 1)** . So the first time through the function, n is equal to 3, so we go into the else block.

Here we return the parameter **aString**, but we also call the function again, this time with n equal to 2.

Again we check if n is equal to 1, which it isn't, so we call the else block again which returns aString again and once again call the function but this time with n equal to 1.

Finally on this call, the **if (n == 1)** returns true, so we again return **aString** and exit the function.

So to reiterate, **when you need to use loops in Scala**, _aim to use recursion._

## Auxiliary Functions

You can also specify functions within functions, called **Auxiliary Functions**

```scala
  def someBigFunction(n: Int): Int = {
    def someSmallFunction(a: Int, b: Int): Int = a + b

    someSmallFunction(n, n-1)
  }
```

Inside the **someBigFunction** above, we define another function called **someSmallFunction**. When we call someBigFunction, the value returned is the expression that we get back from calling someSmallFunction with the value for n (and n-1) that we supplied.

Let's look at an example of using an auxiliary function in practice. We will write out a function that checks if a number is a prime number (i.e. can only be divided by itself and 1)

```scala
  def isPrime(n: Int): Boolean = {
    def isPrimeUntil(t: Int): Boolean =
      if (t <= 1) true
      else n % t != 0 && isPrimeUntil(t-1)

    isPrimeUntil(n / 2)
}
```

Our main function **isPrime** simply takes an Int and returns a Boolean. The auxiliary function also takes an Int and returns a boolean, and we call this function with the original number (n) divided by 2. (We divide the number by 2 because it saves on a lot of useless checks, see this explanation on [StackOverflow](https://stackoverflow.com/questions/39429564/to-find-a-number-is-prime-why-checking-till-n-2-is-better-what-is-the-reason-f))

So inside the auxiliary **isPrimeUntil** function, we first check if the number is <= 1, if so we return true. Because we have made it right the way to the bottom of the recursive checks so the original number (n) must be prime.

If **t** is not <= 1 , then we check if **n % t != 0** (I.E. if the remainder when dividing n by t is not zero - the numbers can't divide). If that returns TRUE, then we recursively call isPrimeUntil again with t-1

## Summary

In this post, we introduced Functions in Scala for the first time. We looked at the syntax for a function, and how to call a function both with and without parameters.

We also had our first look at **Recursive Functions** . If you aren't familiar with function programming these can take a while to get your head around. But they are an essential building block in Scala and we will be seeing a lot more of them.

Also we looked at how functions can be declared within other functions, called **Auxiliary Functions**, and saw an example of one when looking for a prime number.

## Source Code

As always, the source code for this blog post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/absoluteBasics/Functions.scala)

---
