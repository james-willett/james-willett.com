---
title: 'Object Oriented Basics in Scala'
date: 2019-06-21
tags: [all, scala, scala_oo_series]
slug: scala-object-oriented-basics
image: ./oo-basics-cover.png
summary: We set the scene and start our look at objected oriented programming in Scala by exploring some of the basics in this post.
category: Scala
next: scala-method-notations
prev: scala-object-oriented-overview
---

[[info]]
| This post is **part 1** of the _Object Oriented Programming in Scala_ series. You can view [all the posts in the series](../blog/scala_oo_series) here.

We will kick off this series of blog posts on Object Oriented programming in Scala by looking at some of the basics. Scala is an unusual language in that it supports [both objected oriented and functional programming](https://underscore.io/blog/posts/2017/06/02/uniting-church-and-state.html) styles. In this series, we will focus on **Object Oriented** programming for the most part.

# Create a Class

To create the most basic kind of class in Scala, you would write:

```scala
class Person
```

Remember that a [class in any programming language](<https://en.wikipedia.org/wiki/Class_(computer_programming)>) is just a way of organising data and behavior that is code.

To instantiate our class, we simply do:

```scala
val person = new Person
```

When we say to [instantiate a class](https://whatis.techtarget.com/definition/instantiation), we mean to bring a concrete realisation of the class into memory. It conforms to the code and data structure that the class describes.

# Class Constructor

With that in mind, let's create a class with a bit more complexity. This class has some parameters that we need to pass to it:

```scala
class Person(name: String, age: Int)
```

This is called a class **constructor**. Every instance of the _Person_ class must be constructed by passing in a name and an age. So now when we instantiate our class, we would do so like this, passing in a name and an age:

```scala
val person = new Person("Bob", 31)
```

# Class Parameters vs Class Members

In other programming languages, you might think that you could print out the age of your person like so:

```scala
println(person.age)
```

But this won't work. In Scala, name and age are class parameters. But they are NOT class members, they cannot be accessed with dot notation. In other words, class parameters are not fields. [Class parameters and class fields](https://stackoverflow.com/questions/13549574/scala-what-is-the-real-difference-between-fields-in-a-class-and-parameters-in-t) are two different things.

To convert a class parameter to a class field, you would add the **val** keyword before the parameter in the constructor:

```scala
class Person(name: String, val age: Int)
```

Now the compiler is happy and the age can be printed out like so:

```scala
val person = new Person("Anne", 43)
println(person.age)
```

# Class Body

Let's create a class with a body now, by supplying curly braces. The body of the class defines it's implementation. It can have val / var definitions, expressions etc.:

```scala
class Person(name: String, val age: Int) {

  // val definition
  val x = 5

  // expression with side effects
  println(2 + 3)
}
```

Essentially you can do anything inside the body of a function that you would do inside any normal block expression outside of a class.

# Methods within Classes

Still within our class body, we can define another function within our class with the _def_ keyword. You could also call this a **method** of the class:

```scala
class Person(name: String, val age: Int) {

  def greet(name: String): Unit = println(s"$name says: Hi, $name")

}
```

Outside of the class, we can call this method from our instantiated object:

```scala
val person = new Person4("Steve", 33)

person.greet("Andrew")
```

This will print out:

```scala
Andrew says: Hi, Andrew
```

Which is probably not what we wanted! Both of the **\$name** calls in the println statement resolve to the parameter that is supplied to the _method_. We actually wanted one of the parameters to resolve to the name of the person defined in the _class definition_.

To achieve that, we can use the [**this**](https://www.javatpoint.com/scala-this) keyword:

```scala
def greet(name: String): Unit = println(s"${this.name} says: Hi, $name")
```

Notice that the first call to **name** here is NOT a class field (i.e. **\${this.name}**)... but it is still available within methods of a class.

# Overloading class methods

When we talk about overloading methods in programming languages, that is just a fancy way of saying:

> "Methods with the same name but different parameter signatures".

This is an overloaded method of greet(), as it doesn't have any parameters supplied:

```scala
def greet(): Unit = println(s"Hi, I am $name")
```

Just for clarity, the overloaded method below would NOT work in conjunction with the above method. Although the return type is different (Int instead of Unit), because the parameter signatures are the same (i.e. there are no parameters), we can't have another method with this signature as the compiler gets confused:

```scala
def greet(): Int = 43
```

# Overloading / Auxiliary constructors

We can also have multiple constructors within our classes, or **overloaded constructors**. The key thing to remember is that _The implementation of an overloaded constructor has to be another constructor and nothing else_. This calls the primary constructor with 2 parameters:

```scala
def this(name: String) = this(name, 0)
```

So now if we instantiated our class by just supplying a name, the age will default to 0.

You could define another constructor one more level down. So a constructor with no parameters:

```scala
def this() = this("Chris")
```

This constructor calls the constructor above, which calls the primary constructor. In practice, [overloaded or auxiliary constructors](https://dzone.com/articles/auxiliary-constructor-in-scala) are limited in use. A more common and easier practice would be to simply supply default parameters in the class definition, as we discussed in this blog post on [default and named arguments](./scala-basics-default-named-arguments#default-values-for-parameter-in-function-signatures).

# Further Example 1 - Writer and Novel Classes

Let's write out a few more classes and instantiate them, to cement our understanding of object oriented concepts. We will write out 2 classes that are related, one for a writer and one for a novel.

Our writer class looks like this. The class takes a **firstName** and **surname** as parameters in the constructor. It also takes a **year** for the writer's age, and we specify this with the '**val**' keyword. We will access this with dot notation in the next class in a moment:

```scala
class Writer(firstName: String, surname: String, val year: Int) {

  def fullName: String = firstName + " " + surname

}
```

You will notice that the class also includes a method in the body. This returns the writer's full name by concatenating the firstName and surname parameters with a space in the middle.

Let's also make a class for a Novel like so. The class parameters are the name and year of types String and Int respectively. It also takes a 3rd parameter, author, which is of type **Writer**... i.e. the class we created previously.

```scala
class Novel(name: String, year: Int, author: Writer) {

  def authorAge = year - author.year

  def isWrittenBy(author: Writer) = author == this.author

  def copy(newYear: Int): Novel = new Novel(name, newYear, author)
}
```

This class has 3 methods, let's examine each one individually:

- **authorAge** - Here we are returning the age of the author at the time the novel is written by subtracting the year of the novel by the year of the author. This is why we needed to use the 'val' keyword in the function definition of the year for the Writer class, so we can access it here.

- **isWrittenBy(author: Writer)** - This is a boolean to check if the novel is written by the same author object supplied to the method call.

- **copy(newYear: Int): Novel** - This method returns a brand new instance of a Novel, with the name and author from the Novel class as well as the **newYear** supplied to the method as the year

Let's instantiate a couple of instances of our new classes, one author and one novel:

```scala
  val author = new Writer("Jimmy", "Stevens", 1967)
  val novel = new Novel("My Great Book", 1988, author)
```

We can print out the author age:

```scala
println(novel.authorAge)
```

And we can check that the novel is written by the supplied author:

```scala
println(novel.isWrittenBy(author))
```

But note that this would return FALSE:

```scala
  val imposter = new Writer("Jimmy", "Stevens", 1967)
  println(novel.isWrittenBy(imposter))
```

Even though the author has the same name and year of birth, to Scala this **imposter** is a different instance of the writer class originally supplied to the novel class.

Finally this will return a brand new instance of a novel. We add the return type here to make sure of what is being returned, but Scala would infer this for us:

```scala
  val copyOfNovel: Novel = novel.copy(2001)
```

# Further Example 2 - Counter Class

Let's look at another example with a Counter class. It contains methods to increment and decrement the counter by 1, if no int is supplied to those methods. We also have overloaded methods, that increment or decrement by the specified amount:

```scala
class Counter(val count: Int) {

  def inc = new Counter(count + 1)
  def dec = new Counter(count - 1)

  // overloaded methods
  def inc(n: Int) = new Counter(count + n)
  def dec(n: Int) = new Counter(count - n)

  def print = println(count)
}
```

Note that when we increment or decrement the counter, we actually return a NEW instance of the counter class. This is because of [**IMMUTABILITY**](https://alvinalexander.com/scala/scala-idiom-immutable-code-functional-programming-immutability) - objects are fixed and cannot be modified, we have to return a new instance with the required values instead. This is an important concept to understand.

## Increment with Recursion

For illustrative purposes, we could actually make our overloaded methods recursive, such that the method increases or decreaees by 1 each time. The new recursive version of the class (just for incrementing) would look like this:

```scala
class Counter(val count: Int) {

  def inc = new Counter(count + 1) {
    println("incrementing")
    new Counter(count + 1)
  }

  def inc(n: Int): Counter = {
    if (n <= 0) this
    else inc.inc(n-1)
  }

  def print = println(count)
}
```

Let's talk through the recursive method (the 2nd method) in detail.

- It takes a parameter of **n: Int**, and it returns a new instance of Counter.
- Inside the body, if the value of **n** is less than or equal to 0 (i.e. we reached the end of the recursion), then we return **this** instance of the counter.
- Else, we return a new counter by calling inc _without any parameters_... the value of the new count will be **count + 1**, as defined in the method above.
- And straight away, on this new instance of counter, we call the overloaded method as well (i.e. **.inc(n-1)** ), to keep the recursion going.

## Testing the Counter

Lets instantiate a counter and play with it a bit:

```scala
  val counter = new Counter(0)
```

Firstly we can call **inc**, and then print out the value of inc.... note that we can CHAIN these calls, because the method call to **.inc** returns a _new instance of counter_. We can then call the print method of that new instance:

```scala
counter.inc.print
```

In much the same way, we can have multiple inc calls before the print. Remember, each call to inc returns a new instance of Counter:

```scala
counter.inc.inc.inc.print
```

Finally, we can call our overloaded inc method with a parameter to increment by, in this case 10. Each loop through the recursive function will print out "incrementing" to the console, and we finally print out the final value of the counter:

```scala
counter.inc(10).print
```

---

# Summary

This post introduced some of the basics of Object Oriented programming in Scala. We looked at:

- Defining and instantiating some basics classes.
- The differences between class parameters and class fields, and how you can differentiate between them with the keyword val.
- How to define methods (or functions) within a class body.
- Classes having multiple constructors.
- Chaining method calls when we return a new instance of a class.

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/objectOriented/OOBasics.scala).
