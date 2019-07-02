---
title: "Method Notations in Scala"
date: 2019-06-28
slug: scala-method-notations
image: ../../1-absolute-basics/values-variables-types/scala-title.png
category: Scala
prev: scala-object-oriented-basics
next: scala-objects
---

[[info]]
| This post looks at Method Notations (or 'Syntactic Sugar') in Scala.
| You should be able to follow along with the code examples either in the Scala REPL or Scala Playground of any IDE.
| Alternatively you can use [ScalaFiddle](https://scalafiddle.io/) to follow along in your browser.
| The source code for the examples in this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/objectOriented/MethodNotations.scala).

In Scala there are numerous method notations and shorthand ways of writing method calls. We will look at a few of them in this post. To start off with, let's create a simple **Person** class. The class has a single method to check if they like a certain movie:

```scala
class Person(val name: String, faveMovie: String) {
  def likes(movie: String): Boolean = movie == faveMovie
}
```

We can instantiate the class and test the method like so:

```scala
val anne = new Person("Anne", "Oblivion")
println(anne.likes("Oblivion"))
```

# Infix Notation or Operator Notation

In scala, there is also an alternative way of writing the above println statement that omits the dot notation and the brackets around the string:

```scala
println(anne likes "Oblivion")
```

The great thing about this is, that it reads much more like natural language. This way of writing the println statement is called **Infix Notation** or **Operator Notation**. _Note that it can only be written like this with methods that have 1 parameter._

[Infix notation](https://docs.scala-lang.org/style/method-invocation.html#infix-notation) is an example of [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) - nicer ways of writing code that are equivalent to more complex ways.

Let's define another method in our class, **hangOutWith()**, that takes another person object and returns a string:

```scala
class Person(val name: String, faveMovie: String) {
  def likes(movie: String): Boolean = movie == faveMovie
  def hangOutWith(person: Person): String = s"${this.name} is hanging out with ${person.name}"
 }
```

To use this new method, first we instantiate a new person object:

```scala
val bob = new Person("Bob", "Titantic")
```

And we can again use infix notation on this method. Both of the method calls below are equivalent:

```scala
println(anne.hangOutWith(bob))
println(anne hangOutWith bob)
```

The above **hangOutWith** method acts as an [operator](https://www.tutorialspoint.com/scala/scala_operators.htm) between the two objects, producing something new (in this case a string).

# Permissive Naming Scheme in Scala

Scala has a very permissive naming scheme. You could actually rename the **hangOutWith()** method to a single syllabub like **+** or **&**:

```scala
class Person(val name: String, faveMovie: String) {
  def likes(movie: String): Boolean = movie == faveMovie

  def hangOutWith(person: Person): String = s"${this.name} is hanging out with ${person.name}"

  // Equivalent to hangOutWith() method above
  def &(person: Person): String = s"${this.name} is hanging out with ${person.name}"
}
```

And you can call it simply like this:

```scala
println(anne & bob)
println(anne.&(bob)) // same as above, but written out in full dot notation
```

There is huge freedom in Scala to name your methods as you wish. Normally characters like **+**, **&** etc. are reserved, not so in Scala for methods!

Let's look at another example, by overloading the **&** method to this time take a string and to return a new instance of Person:

```scala
class Person(val name: String, faveMovie: String) {

  // ... other methods omitted for brevity

  def &(person: Person): String = s"${this.name} is hanging out with ${person.name}"

  // overloaded method
  def &(nickname: String): Person = new Person(s"$name ($nickname)", faveMovie)
}
```

Now we can call our overloaded **&** method like so:

```scala
println(anne & "the Eagle")
println(anne.&("the Eagle"))
```

Of course this will just print out a reference to the new Person object in the console, rather than anything meaningful.

# Operators are Methods in Scala

Another important concept to grasp is that all operators in Scala (e.g. +, -, /, \* etc.) are actually methods as well! These two statements are equivalent:

```scala
println(1 + 2)
println(1.+(2))
```

# Prefix Notation - Unary Operators

Let's look at prefix notation, another type of syntactic sugar, which is all about [unary operators](https://en.wikipedia.org/wiki/Unary_operation) (i.e. an operation with only one operand). The two vals below are equivalent:

```scala
val x = -1
val y = 1.unary_-
```

The **unary** prefix only works with -, +, ~ and !. Learn more about the [unary prefix in Scala](https://stackoverflow.com/questions/16644988/why-is-the-unary-prefix-needed-in-scala) here.

We can write a unary operator in our person class like so:

```scala
class Person(val name: String, faveMovie: String) {

// ... other methods omitted for brevity

  def unary_! : String = s"$name, what is going on?"
}
```

The naming of this method is very important and must be exact. In addition, you must also include a SPACE between the colon (**:**) and **String**. Otherwise the compiler will think that the colon is part of the method. See this post for other examples of [Unary Operators in Scala](https://nrinaudo.github.io/2013/05/29/special-scala-methods.html).

Now we can print to the console **not Anne** (i.e. **!Anne**), and this will print out the string from the method above. These two are therefore now equivalent:

```scala
println(!anne)
println(anne.unary_!)
```

And they both print out:

```scala
Anne, what is going on?
```

Let's look at another example, this time using the **unary\_+** operator. We will add an **age** field to our class and define the unary\_+ operator:

```scala
class Person(val name: String, faveMovie: String, val age: Int = 0) {

  // ... other methods omitted for brevity

  def unary_! : String = s"$name, what is going on?"

  def unary_+ : Person = new Person(name, faveMovie, age + 1)
}
```

Remember there has to be a space between the function name and colon (i.e. 'unary\_+ : Person'). This method simply returns a new instance of Person - with the same name, FaveMovie and the age increased by 1.

We can all our unary operator like so. Again, these two lines are equivalent:

```scala
println((+anne).age)
println(anne.unary_+.age)
```

# Postfix Notation

Now let's look at [postfix notation](https://docs.scala-lang.org/style/method-invocation.html#postfix-notation). We add a method to our class with no parameters called **isAlive**:

```scala
class Person(val name: String, faveMovie: String) {

// ... other methods omitted for brevity

  def isAlive: Boolean = true
}
```

Functions that do not receive any parameters can be used in a postfix notation. The two lines below are equivalent:

```scala
println(anne.isAlive)
println(anne isAlive)
```

But postfix notation like this is seldom used in Scala, as it only saves us typing a dot.

Let's add a couple more methods to our Person class that we can use to further demonstrate postfix notation:

```scala
class Person(val name: String, faveMovie: String, val age: Int = 0) {

  // ... other methods omitted for brevity

  def learns(thing: String) = s"$name is learning $thing"
  def learnsScala = this learns "Scala"
}
```

When we call the **learnsScala** method, that method simply calls the **learns** method with the parameter "Scala". We can therefore call this in a postfix fashion like so:

```scala
println(anne learnsScala)
println(anne.learnsScala)
```

# The Special apply() Method in Scala

The **apply()** method in a Scala class is special. The method name of **apply()** (with no parameters) is very important. Let's add it to our class:

```scala
class Person(val name: String, faveMovie: String) {

// ... other methods omitted for brevity

  def apply(): String = s"Hi, my name is $name and I like $faveMovie"
}
```

Now lets call the apply method:

```scala
println(anne.apply())
```

Which prints out the string that we defined, ok no big deal! But, this is equivalent:

```scala
println(anne())
```

Whenever the compiler sees an object being called like a function (like this), it will look for an **apply()** method in that class. This breaks the barrier between Object Oriented and Functional Programming, as we will see in later posts. Remember that **apply()** is extremely special in Scala! Learn more about the [apply method in Scala](https://stackoverflow.com/questions/9737352/what-is-the-apply-function-in-scala) here.

Let's add an overloaded apply method to our class:

```scala
class Person(val name: String, faveMovie: String, val age: Int = 0) {

  // ... other methods omitted for brevity

  def apply(): String = s"Hi, my name is $name and I like $faveMovie"

  def apply(n: Int): String = s"$name watched $faveMovie $n times"
}
```

We can call this new overloaded apply method like so:

```scala
println(anne(10))
println(anne.apply(10))
```

# Summary

In this post, we learned the following about method notations in Scala:

- **Infix Notation** - If posts only receive 1 parameter, we can call them with **object // method // parameter** notation, with spaces in between.
- **Unary Operators** - What they are, and how they are used in **prefix notation**.
- **Postfix Notation** - For methods that don't have any parameters, you can omit the dot (.) in the method call. This is seldom used in practice, as it can make code more difficult to read.
- **Apply method** - A special method, that allows you to call your objects as if they were functions

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/objectOriented/MethodNotations.scala).
