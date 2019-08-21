---
title: 'Expressions in Scala'
date: 2019-05-13
tags: [tag1, tag2, tag3, tag4]
slug: scala-expressions
image: ./expressions-cover.png
summary: Discussion on expressions, one of the fundamental building blocks in Scala. Includes a look at relational operators and loops
category: Scala
prev: scala-values-variables-types
next: scala-functions
---

[[info]]
| This post talks about another of the basic building blocks for Scala, _Expressions_.
| You should be able to follow along with the code examples either in the Scala REPL or Scala Playground of any IDE.
| Alternatively you can use [ScalaFiddle](https://scalafiddle.io/) to follow along in your browser

## Basic Expressions

The code below shows a basic expression in Scala :

```scala
val x = 5 + 10 // EXPRESSION
```

Expressions are evaluated by the compiler to a value, in this case 15. They also have a type, in this case Int. The type gets figured out by the compiler without us having to specify it. This is called [Type Inference](https://docs.scala-lang.org/tour/local-type-inference.html) in Scala.

The above expression is _mathematical_. We could also write another expression that tests for _equality_ like so:

```scala
println(x == 3)
```

This expression evaluates to a _boolean_, checking whether or not the value of x is 3, which in this case is false.

## Relational Operators

To check the opposite (i.e. if something is not equals) we can use the [relational operator](https://www.tutorialspoint.com/scala/scala_operators.htm) _!=_ .

```scala
println(x != 7) // true
```

It should come as no surprise to you that we can also use other [types of operators](https://www.tutorialspoint.com/scala/scala_operators.htm) for our expressions such as:

- **>** - Greater than
- **>=** - Greater than or equal to
- **<** - Less than
- **<=** - Less than or equal to

You can also return the opposite of an expression with [logical negation](https://www.tutorialspoint.com/scala/scala_logical_operators.htm). To do this simply put a bang (!) in front of an expression. This expression checks if 2 is equal to x, and then returns the opposite (i.e. true in this case):

```scala
println(!(2 == x)) // true
```

Operators can also be used to change variables as in this example:

```scala
var y = 4
y += 3
println(y)
```

What the expression above says is, _take the value on the left (4) and add it to the variable on the right (3) and return a new variable for the result_.

This also works with -=, \*= /= in the ways that you would expect. For example, to subtract you would do:

```scala
var z = 10
z -= 4
println(z) // returns 6
```

Note that [there are no ++ or -- operators in Scala](https://alvinalexander.com/scala/no-increment-decrement-operators-in-scala). These operators are commonly used to plus or subtract 1 from a variable in Java and other languages.

Remember that the above operators only work with variables (i.e. **var**), and not with values (i.e. **val**) . This is because values in Scala are immutable (can't be changed) whereas values can be reassigned and therefore changed.

## Instructions vs Expressions

Lets talk for a moment about **Instructions** and **Expressions**, and the difference between the two.

- **Instructions** tell the computer to go and do something, for example print to the console or change the value of a variable. These are used in imperative languages such as Java or Python
- **Expressions** something that has a value and/or a type. In Scala (and in functional programming in general) we will start to think in terms of Expressions.

Everything in Scala is an [Expression](https://scala-lang.org/files/archive/spec/2.12/06-expressions.html). Only definitions such as _val_ or _class_ or _package_ are not expressions, everything else is.

We can look at an **if** expression in Scala to see an example of this.

```scala
val someCondition = true
val conditionedValue = if(someCondition) 10 else 5
```

What this code is saying for the **conditionedValue** is "if someCondition is true then the value is 10, otherwise 5". This is an **expression**, because it gives back a value.

You could also just write this straight to the console (i.e. without storing it in a val or var) as below. Both of these lines are expressions in the parentheses that return a value:

```scala
println(if(someCondition) 10 else 5)
println(2 + 3)
```

## Loops in Scala

There are loops in Scala, but their use is generally discouraged. Loops are reminiscent of imperative programming languages such as Java. They often don't return anything meaningful and only cause side effects (which we talked about previously, and can be a problem!).

Let's look at an example:

```scala
  var i = 0
  while(i < 11) {
    println(i)
    i += 1
  }
```

This is a while loop in Scala that will print out the numbers from 0 to 10. But this is not how you should loop in Scala, as while loops are just side effects. Here we are using a mutable variable (i), and the use of mutable variables is discouraged. In fact this while loop is of type **Unit**, which is the equivalent of a [Void in Java](https://www.quora.com/What-is-the-meaning-of-void-in-java).

Side effects are expressions returning unit - for example println(), while loops, reassigning variables etc.

We will look at the proper way to write loops in subsequent posts.

## Code blocks

Lets look at a code block:

```scala
  val codeBlock = {
    val a = 5
    val b = a + 1

    if (b > 5) "hello" else "goodbye"
  }
```

A couple of things to note about the above. Firstly, the code block is an _expression_. It's value becomes the value of the last if expression, either "hello" or "goodbye" depending on how the if expression evaluates.

[Code blocks in Scala](http://www.java2s.com/Tutorials/Java/Scala/0080__Scala_Code_Blocks.htm) can also have their own definitions of values and variables inside the block. Everything that you declare inside the block is only available within that block, or within that _scope_. If we tried to get the value of **b** outside the code block, the compiler will complain.

---

## Summary

In this post we learned about basic expressions with numbers and booleans. We also learned that **IF** is an expression in Scala. Code blocks are also expressions, with the value of the block being the value of the last expression.

We learned the difference between instructions (code that is executed, think of Java) and expressions (code that is evaluated). In Scala we will think in terms of expressions primarily.

All the code for from this tutorial is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/absoluteBasics/Expressions.scala)

## Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/absoluteBasics/Expressions.scala).

---
