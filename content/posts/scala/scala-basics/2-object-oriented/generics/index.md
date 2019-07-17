---
title: 'Generics in Scala'
date: 2019-07-19
slug: scala-generics
image: ../../1-absolute-basics/values-variables-types/scala-title.png
category: Scala
prev: scala-inheritance-traits
---

[[info]]
| This post is **part 5** of the Object Oriented Programming in Scala series.

This blog post looks at Generics in Scala. It took me a while to get my head around a lot of these concepts, but hopefully this post will make things clear for you. So what exactly are Generics all about in Scala?

First let's consider that in the previous blog post, we implemented a linked list for integers. But of course the problem is that the list is very limited to only integers. If we wanted to make one for say String instead, we would need to duplicate the entire code. Enter generics to save the day.

Collections are a powerful use case where we could store elements of a certain type. To do this in Scala Generics, we would define a class MyList parameterised with a Type A. The type in the square brackets is the generic type:

```scala
class MyList[A] {

}
```

Once you define it, you can use the type A inside the class definition. When you later use the MyList type, you can do the following for a new MyList of type Int or String:

```scala
val listOfIntegers = new MyList[Int]
val listOfStrings = new MyList[String]
```

So class MyList parameterised with A, is a GENERIC CLASS. The Type A is the name of a parameter. You can give it whatever name you want, but the general convention is to use a single letter.

You can also have a class with multiple type parameters, i.e.:

```scala
class MyMap[Key, Value]
```

In addition, you can also use type parameters with traits:

```scala
trait SomeTrait[A]
```

# Generic Methods

Let's define a companion object (LINK TO THAT POST) for the MyList class. Note that objects **cannot** be type parameterised. Inside the object we will define a method that when given a type parameter will construct an empty MyList parameterised with that type:

```scala
object MyList {
  def empty[A]: MyList[A] = ???
}
```

When you declare the type parameter A after empty, you can then use it in the function definition. For now, we will assume that this function doesn't do anything and will return Nothing.

So the object MyList, which is a companion for MyList defined above, has a generic method called empty which takes a type parameter of A, and returns a MyList of A.

To use this method we can do the following. This will return a MyList of integers:

```scala
val emptyListOfIntegers = MyList.empty[Int]
```

// DONE TO 12
