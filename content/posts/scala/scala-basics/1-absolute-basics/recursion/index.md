---
title: 'Recursion in Scala'
date: 2019-06-10
tags: [all, scala, scala_basics_series]
slug: scala-recursion
image: ./recursion-cover.png
summary: In this blog post we will explore stack and tail recursion in Scala, including examples of both methods. If you haven't seen recursion before this post should be of help to you!
category: Scala
prev: scala-functions
next: scala-call-by-name-or-value
---

[[info]]
| This post is **part 4** of the _Scala - The Absolute Basics_ series. You can view [all the posts in the series](../blog/scala_basics_series) here.

It can take some time to get your head around how recursion works. Especially if you are mostly familiar with imperative languages like Java. We touched on it briefly in the [previous blog post](./scala-basics-functions), but Recursion is essentially a **function that calls itself**.

## Simple Recursion - Stack Recursion

The following example for calculating the factorial of a number shows simple **Stack Recursion**. In the example, we will print out what the function is doing at each stage of the recursion, so that we can follow the journey through the code a bit easier:

```scala
  def factorial(n: Int): Int =
    if (n <= 1) 1
    else {
      println("Calculating factorial of " + n + " - Need to know the factorial of " + (n-1))
      val result = n * factorial(n-1)
      println("Factorial of: " + n)
      result
    }

  println(factorial(5))
```

If we execute this code, we can see the following printed out to the console:

```
Calculating factorial of 5 - Need to know the factorial of 4
Calculating factorial of 4 - Need to know the factorial of 3
Calculating factorial of 3 - Need to know the factorial of 2
Calculating factorial of 2 - Need to know the factorial of 1
Factorial of: 2
Factorial of: 3
Factorial of: 4
Factorial of: 5
120
```

So we can see how the compiler interprets this code when the program is running. Each time through the recursive loop, the compiler stops at the **val result** line where it makes the next recursive call to the function. Only when it gets to the final recursive call (i.e. for n = 2) does the else block complete and print out the result. The else blocks then complete all the way back to the original value for n.

## Stack overflow error with Recursion

The trouble with the above approach? The JVM keeps all the calls in its internal stack. The internal stack has limited memory. Try and calculate the value of factorial(5000):

```scala
  println(factorial(5000))
```

This will cause a [Stack Overflow error](https://stackoverflow.com/questions/214741/what-is-a-stackoverflowerror) because the recursive depth is too deep for the JVM to handle. Obviously this is not good for us. So what do we do, if we want to loop something 5000 times?

## Tail Recursion

Enter **Tail Recursion** . The creator of Scala, [Martin Odersky](https://en.wikipedia.org/wiki/Martin_Odersky), describes tail-recursion as:

> “Functions which call themselves as their last action are called tail-recursive. The Scala compiler detects tail recursion and replaces it with a jump back to the beginning of the function, after updating the function parameters with the new values ... as long as the last thing you do is calling yourself, it’s automatically tail-recursive (i.e., optimized).”

Let's look at another way of writing the factorial function, this time with tail recursion. We will use an auxiliary function (described in the [previous blog post](./scala-basics-functions)), and make that tail recursive:

```scala
  def improvedFactorial(n: Int): BigInt = {
    @tailrec
    def factHelper(x: Int, accumulator: BigInt): BigInt =
      if (x <= 1) accumulator
      else factHelper(x-1, x * accumulator)

    factHelper(n, 1)
  }

  println(improvedFactorial(5))
```

Let's break down each step of the recursion when we call **factHelper**.

- First we call it with **factHelper(5,1)**
- This goes into the else block and calls **factHelper(4, 4 \* 1)**.
- Then into the else block again with **factHelper(3, 3 \* 4 \* 1)**.
- Then again with **factHelper(2, 2 \* 3 \* 4 \* 1)**.

So we can see the **accumlator** building up here. You can try calling this function to get the factorial of a large number (e.g. 6000) and it will work.

But why does this work without causing the stack overflow error like the previous function implementation?

Because we wrote **factHelper** as the _last expression of the code path_. This allows Scala to preserve the same stack frame through the recursive calls, instead of using additional frames for each call.

This is called **Tail Recursion** . The key to making a function tail recursive is to make the **last** expression in the function recursive.

To force the compiler to check for a tail recursive function, you can add the **@tailrec** annotation. If your function isn't tail recursive, the compiler will throw an error:

```scala
    @tailrec
    def factHelper(x: Int, accumulator: BigInt): BigInt =
    // ...
```

When you need to loop in Scala, you should look to use Tail Recursion.

The trick is to use variables like the **accumulator** in the above function to store the intermediate results, rather than calling the main function recursively. You need as many accumulators as you have recursive calls, and sometimes more.

This technique can take some time to grasp, but becomes easier with experience and practice.

## Finding a Prime Number

In the [previous blog post](./scala-basics-functions), we wrote the following function to find a [prime number](https://whatis.techtarget.com/definition/prime-number):

```scala
  def isPrime(n: Int): Boolean = {
    def isPrimeUntil(t: Int): Boolean =
      if (t <= 1) true
      else n % t != 0 && isPrimeUntil(t-1)

    isPrimeUntil(n / 2)
  }
```

The problem with the above is that it will check every number until we reduce it to 1. The function below, which uses tail recursion, will instead exit as soon as it detects that the number is not prime. I have included a couple of debug println statements so that we can see what the function is doing:

```scala
  def isPrime(n: Int): Boolean = {
    @tailrec
    def isPrimeTailrec(t: Int, isStillPrime: Boolean): Boolean = {
      println("Current value of isStillPrime: " + isStillPrime)
      println("Current value of t: " + t)
      if (!isStillPrime) false
      else if (t <= 1) true
      else isPrimeTailrec(t - 1, n % t != 0 && isStillPrime)
    }

    isPrimeTailrec(n / 2, true)
  }

  println(isPrime(29))
```

We are testing for 29, which is quite a large prime number. We start the function with half of that (n / 2) which is 14, and we make the initial value of **isStillPrime** true.

This falls through to the last else block, and we call **isPrimeTailrec** again this time with 13. For the accumulator at the end, we check that 29 divided by 14 doesn't go (i.e. doesn't have a remainder of zero) and the value of isStillPrime is still true.

In the next call we again fall through to the last else block. This time we call **isPrimeTailrec** with t - 1 (12) and again check that 29 divided by 13 doesn't have a remainder of zero.

The recursion continues all the way until t = 1 and the function returns true, that 29 is a prime number:

```
Current value of isStillPrime: true
Current value of t: 14
Current value of isStillPrime: true
Current value of t: 13
// ...
Current value of t: 3
Current value of isStillPrime: true
Current value of t: 2
Current value of isStillPrime: true
Current value of t: 1
true
```

Printing out messages to the console like this can help you to understand what's going on a bit more clearly.

## Calculate Fibonacci Number

Let's look at another tail recursive function that calculates the last [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number) for a given length of numbers. For this function, we are going to use two accumulators. Remember, _you typically need an accumulator for every variable that you are storing on the code path_:

```scala
  def fibonacci(n: Int): Int = {
    @tailrec
    def fiboTailrec(i: Int, last: Int, nextToLast: Int): Int = {
      println("Current value of i: " + i)
      println("Current value of last Fib number: " + last)
      println("Current value of next to last Fib Number: " + nextToLast)
      if(i >= n) last
      else fiboTailrec(i + 1, last + nextToLast, last)
    }

    if (n <= 2) 1
    else fiboTailrec(2, 1, 1)
  }

  println(fibonacci(7))
```

So in our recursive **fiboTailrec** function, we are holding the counter in the **i** variable, as well as the **last** and **nextToLast** numbers in the Fibonacci sequence.

At the bottom, we only initiate the tail recursive function if the value of n is more than 2, otherwise we just return 1 right away. For the initial call to the tail recursive function, we start the counter at 2, and provide 1 and 1 for the first two numbers in the sequence.

To calculate the fibonnaci of 7, you can see in the debug messages how the function is working:

```
Current value of i: 2
Current value of last Fib number: 1
Current value of next to last Fib Number: 1
Current value of i: 3
Current value of last Fib number: 2
Current value of next to last Fib Number: 1
Current value of i: 4
Current value of last Fib number: 3
Current value of next to last Fib Number: 2
Current value of i: 5
Current value of last Fib number: 5
Current value of next to last Fib Number: 3
Current value of i: 6
Current value of last Fib number: 8
Current value of next to last Fib Number: 5
Current value of i: 7
Current value of last Fib number: 13
Current value of next to last Fib Number: 8
13
```

This is consistent with the Fibonacci sequence of 7 numbers, i.e. **1 1 2 3 5 8 13**

## Summary

This post expanded on recursion in Scala, and focused particularly on tail recursion and why it is important. We looked at examples of tail recursive functions, and how they can be used to replace traditional loops from other imperative programming languages.

## Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/absoluteBasics/Recursion.scala).

---
