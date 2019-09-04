---
title: 'Covariant Generic List in Scala'
date: 2019-07-27
tags: [all, scala, scala_oo_series]
slug: scala-covariant-generic-list
summary: Expand on the MyList application developed previously, turning it into a complete covariant generic list. This in-depth post covers a lot of ground previously seen in our journey up till now
image: ./generic-list-cover.png
category: Scala
prev: scala-anonymous-classes
next: scala-case-classes
---

[[info]]
| This post is **part 7** of the Object Oriented Programming in Scala series.

In this post, we are going to expand heavily on the functionality of the MyList application that we started developing in [previous posts](/scala-generics#expanding-the-mylist-class) in this series. The overall goal is to turn MyList into a complete **covariant generic list**.

# Process for Implementing the Generic List

To do this we will walk through a number of steps. The first thing we will do is create a couple of **traits**.

One will be called **MyPredicate**, It will have a small method to check whether a value of type T passes some condition. If we have a class that extends this **MyPredicate** trait, the test method in the predicate with take an int as a parameter and return whether that int is even or not.

The other will be called **MyTransformer**, taking two type parameters. It will have a small method to convert a value of type A into a value of type B (for example a String into an Int). Every subclass of **MyTransformer** will have a different implementation of that method.

With the traits in place, we will be adding three new functions in the MyList abstract class:

### Map

This will take a _MyTransformer_ trait, and returns a new MyList of a different type. So for example if you have a list \[1,2,3], if you **map** that to a Transformer that doubles an Int, then you will get back \[2,4,6]. In pseudo code it would like: **\[1,2,3].map(n \_ 2) = \[2,4,6]**.

### Filter

Will take a _MyPredicate_ trait, and returns a new MyList. If you have a list \[1,2,3,4] that filters if a number is even, you should get the list \[2,4]. In psuedo code, **\[1,2,3,4].filter(n % 2) = \[2,4]**.

### FlatMap

FlatMap is a little bit special. We will provide another _MyTransformer_ trait from A to MyList of B. It returns a MyList of B. If you have a list \[1,2,3] and flatMap it so that for each **n** you get **n+1** . This will return the concatenation of all the sub-lists for every element.

For example the sub-list for 1 will be \[1,2], the sub list for 2 will be \[2,3], the sub list for 3 will be \[3,4] etc.

The pseudo code looks like so: **\[1,2,3].flatMap(n => [n, n+1]) => \[1,2,2,3,3,4]**

## More Details on map, flatMap and Filter

Note that map, flatMap and filter are common methods used in functional programming. If you aren't familiar with how they work, you may find it beneficial to read up on them before we start implementing our own versions here. See the [Twitter Scala School Collections](https://twitter.github.io/scala_school/collections.html#map) for a good starting point.

## A Note on Contravariance

Just a hint before we press ahead with implementing this. We will define **MyPredicate** with a minus sign for T, i.e. MyPredicate\[-T]. We will be making it [contravariant](https://www.atlassian.com/blog/software-teams/covariance-and-contravariance-in-scala).

Also **MyTransformer** will have a minus sign for A to make that contravariant as well, i.e. MyTransformer\[-A,B].

The reasons for this will be explored in later blog posts, but for now please just accept this small hack to get our generic list up and running.

# Declare the Traits

Let's start our implementation of a generic list by declaring the traits, starting with **MyPredicate**. (Note: a [predicate](https://stackoverflow.com/questions/40009857/scala-predicates) is just a function that returns a Boolean value.) :

```scala
trait MyPredicate[-T] {
  def test(elem: T): Boolean
}
```

So we have a trait called **MyPredicate**, that takes a type parameter of T (which is contravariant with the minus sign). It has a single method **test**, which takes an **elem** of type T and returns a Boolean. There is no implementation yet for the method, we will do that on the fly when we use the MyPredicate in our code.

Next for **MyTransformer**, it will look like this:

```scala
trait MyTransformer[-A, B] {
  def transform(elem: A): B
}
```

We have a trait called **MyTransformer**. It takes two type parameters A and B (A is contravariant). It has a single method **transform**, which takes an element of type A and returns a type B. Again, the implementation is missing and will be added by us when we use the MyTransformer in code.

# Add the Function Signatures to MyList

We will now go into the **MyList** abstract class, and add in the function signatures for the three new methods. As a reminder, here is what MyList originally looked like:

```scala
abstract class MyList[+A] {
  def head: A
  def tail: MyList[A]
  def isEmpty: Boolean
  def add[B >: A](element: B): MyList[B]
  def printElements: String
  override def toString: String = "[" + printElements + "]"
}
```

### Map

Starting with **map**, our function signature will look like so:

```scala
abstract class MyList[+A] {
  // .. other methods excluded for brevity
  def map[B](transformer: MyTransformer[A, B]): MyList[B]
}
```

The function **map** will receive a type parameter of B. Because we are turning a MyList of A into a MyList of B, we need to provide this type parameter here. It will also receive a **transformer**, the trait that we declared previously, from A to B. Finally, it will return a MyList of type B

### FlatMap

The function signature for flatMap looks like so:

```scala
abstract class MyList[+A] {
  // .. other methods excluded for brevity
  def flatMap[B](transformer: MyTransformer[A, MyList[B]]): MyList[B]
}
```

The method again receives a type parameter of B, for the same reason as above (we are returning a MyList of B so need to be aware of the type parameter here). The method then receives a **transformer** from A to MyList\[B]. The return type is a MyList of type B.

### Filter

The signature for filter is easiest of all:

```scala
abstract class MyList[+A] {
  // .. other methods excluded for brevity
  def filter(predicate: MyPredicate[A]): MyList[A]
}
```

It receives a **predicate** of type A. The end result is a MyList of type A.

This is the first step in solving the implementation, deciding on the function signatures for map flatMap and filter.

Now we are going to go ahead and implement these functions, starting with the Empty object.

## Implement Functions in the Empty object

As a reminder, our Empty object initially looked like this:

```scala
object Empty extends MyList[Nothing] {
  def head: Nothing = throw new NoSuchElementException
  def tail: MyList[Nothing] = throw new NoSuchElementException
  def isEmpty: Boolean = true
  def add[B >: Nothing](element: B): MyList[B] = new Cons(element, Empty)
  def printElements: String = ""
}
```

We will start by coping in the function signatures to the Empty object. Everywhere that we see **A**, we will replace with **Nothing** :

```scala
object Empty extends MyList[Nothing] {
  // .. other methods excluded for brevity
  def map[B](transformer: MyTransformer[Nothing, B]): MyList[B]
  def flatMap[B](transformer: MyTransformer[Nothing, MyList[B]]): MyList[B]
  def filter(predicate: MyPredicate[Nothing]): MyList[Nothing]
}
```

The implementations for the methods here are actually very straightforward. If we call map, flatMap or filter on an empty list, it will just return an Empty list:

```scala
object Empty extends MyList[Nothing] {
  // .. other methods excluded for brevity
  def map[B](transformer: MyTransformer[Nothing, B]): MyList[B] = Empty
  def flatMap[B](transformer: MyTransformer[Nothing, MyList[B]]): MyList[B] = Empty
  def filter(predicate: MyPredicate[Nothing]): MyList[Nothing] = Empty
}
```

That was easy enough, let's move on to implementing the methods in the Cons class.

## Implement Functions in the Cons object

As a reminder, the Cons class initially looked like this:

```scala
class Cons[+A](h: A, t: MyList[A]) extends MyList[A] {
  def head: A = h
  def tail: MyList[A] = t
  def isEmpty: Boolean = false
  def add[B >: A](element: B): MyList[B] = new Cons(element, this)

  def printElements: String = {
    if(t.isEmpty) "" + h
    else h + " " + t.printElements
  }
}
```

# Filter method in Cons

We will start by implementing filter, again copying over the initial function signature from the abstract MyList class:

```scala
class Cons[+A](h: A, t: MyList[A]) extends MyList[A] {
  // .. other methods excluded for brevity
  def filter(predicate: MyPredicate[A]): MyList[A]
}
```

So filter receives a predicate, which is a **MyPredicate** of type A and returns a **MyList** of type A. What we need the filter method to do, is use the predicate to first filter the head of the Cons instance, and then the tail.

Our implementation will look like this:

```scala
class Cons[+A](h: A, t: MyList[A]) extends MyList[A] {
  // .. other methods excluded for brevity
  def filter(predicate: MyPredicate[A]): MyList[A] = {
    if (predicate.test(h)) new Cons(h, t.filter(predicate))
  }
}
```

If **predicate.test(h)** returns true, head will be included in the result. So we will return a new Cons object with **h** as the head, and then the tail. The tail also needs to be filtered here, and then passed in as the result, i.e. **t.filter(predicate)**.

What about if **predicate.test(h)** doesn't pass and returns false? Then in the _else_ branch we just return **t.filter(predicate)** (i.e. we don't include the head):

```scala
class Cons[+A](h: A, t: MyList[A]) extends MyList[A] {
  // .. other methods excluded for brevity
  def filter(predicate: MyPredicate[A]): MyList[A] = {
    if (predicate.test(h)) new Cons(h, t.filter(predicate))
    else t.filter(predicate)
  }
}
```

If head passes the predicate it will be included in the result. The result is going to be a new Cons with the head. The tail is going to be filtered with the predicate so we don't know what that will return, it could be an empty list. We don't know how many elements the tail has, it could be have no elements and be Empty.

## Breaking down the Filter method

Let's use some pseudo code and break down how filter works. Say we have a simple list \[1,2,3] and we call the filter method with a predicate of **(n % 2 == 0)** to check for even numbers. Our pseudo code looks like this:

```scala
[1,2,3].filter(n % 2 == 0) =
[2,3].filter(n % 2 == 0) =
= new Cons(2, [3].filter(n % 2 == 0))
= new Cons(2, Empty.filter(n % 2 == 0))
= new Cons(2, Empty)
```

Going through the five lines above in order:

- On line 1, **predicate.test(1)** (i.e. the head) will fail, so we will next call the tail (i.e. \[2,3]) and filter that.
- On line 2, **predicate.test(2)** (i.e. the new head) will pass. This will therefore return a new Cons, with 2 as the head and \[3] as the tail, with the tail also to be filtered again.
- Onto line 3, we have a new Cons instance. 2 is the head, and the list \[3] is the tail. We call the filter method on the \[3] list. The head is going to fail (because 3 is not even), so we go into the Else block and return the tail (which is empty) filtered.
- For line 4, we will filter the Empty list. We know that Empty.filter() anything is just going to return **Empty**.
- So finally on line 5, we have a new Cons instance with 2 as the head and Empty as the tail.

When we print this out it will just print 2 to the console.

# Map method in Cons

Now we will move onto map, let's first put in the function signature into the class:

```scala
class Cons[+A](h: A, t: MyList[A]) extends MyList[A] {
  // .. other methods excluded for brevity
  def map[B](transformer: MyTransformer[A, B]): MyList[B]
}
```

For the implementation, we will return a new **Cons**, because if this is a non-empty list then so is the result:

```scala
class Cons[+A](h: A, t: MyList[A]) extends MyList[A] {
  // .. other methods excluded for brevity
  def map[B](transformer: MyTransformer[A, B]): MyList[B] = {
    new Cons(transformer.transform(h), t.map(transformer))
  }
}
```

In our new Cons instance, the head will be transformed by the transformer. The tail of the result is going to be mapped with the same transformer, so this will be a recursive call.

## Breaking down the Map method

As we did previously, let's break down the map method with some pseudo code. Say that we have a list \[1,2,3], and we want to transform everything in this list to be doubled (n \* 2):

```scala
[1,2,3].map(n * 2)
  = new Cons(2, [2,3].map(n * 2)
  = new Cons(2, new Cons(4, [3].map(n * 2)))
  = new Cons(2, new Cons(4, new Cons(6, Empty.map(n * 2))))
  = new Cons(2, new Cons(4, new Cons(6, Empty)))
```

Going through the five lines above:

- On line 1, we have the list \[1,2,3], and we call map with (n \* 2).
- On line 2, we now have a new Cons instance. The head is 2 (because 1 \* 2 = 2). For the tail we will call \[2,3] and again map that with (n \* 2).
- On line 3, now there is another new Cons object inside the previous one. This time the head is 4 (2 \* 2 = 4). The tail will be the list \[3] again mapped with (n \* 2).
- On line 4, we have yet another new Cons object now with 6 as the head (3 \* 2 = 6). We will also map the empty list that came with our initial \[3] list.
- On line 5, we know that Empty.map anything returns Empty.

## Testing the Map and Filter methods

Let's do some testing on the two methods that we have added so far, starting with **map**:

```scala
object ListTest extends App {
  val listOfIntegers: MyList[Int] = new Cons(1, new Cons(2, new Cons(3, Empty)))

  println(listOfIntegers.map(new MyTransformer[Int, Int] {
    override def transform(elem: Int): Int = elem * 2
  })).toString
}
```

We are taking a list of Integers, and mapping them to a new list with everything doubled. Note that when we call **new MyTranformer**, we are forming an [anonymous class from the trait](./scala-anonymous-classes). When we run this, it prints out \[2,4,6].

Let's test out the **filter** as well. We want to filter for even numbers. We will print a list of integers with a filter, and pass an anonymous instance of MyPredicate\[Int], with the on the spot implementation override:

```scala
object ListTest extends App {
  val listOfIntegers: MyList[Int] = new Cons(1, new Cons(2, new Cons(3, Empty)))

  println(listOfIntegers.filter(new MyPredicate[Int] {
    override def test(elem: Int): Boolean = elem % 2 == 0
  })).toString
}
```

As expected, this returns a list with just \[2].

# FlatMap method in Cons

Now we will implement the **flatMap** method in Cons.

### Prepare to implement FlatMap by adding Concatenation Method

For the **flatMap** implementation in Cons, we will first need a concatenation method that we are going to call **++**. Let's first add this method into the abstract MyList class:

```scala
abstract class MyList[+A] {
  // other methods excluded for brevity...

  def ++(list: MyList[A]): MyList[A]
}
```

We are concatenating a **list** with a **MyList** of type A, and then returning a MyList of A. When we write this code out, we are getting the [contravariant error](/scala-generics#making-mylist-covariant). To resolve this, we will add a new type parameter B:

```scala
abstract class MyList[+A] {
  // other methods excluded for brevity...

  def ++[B >: A](list: MyList[B]): MyList[B]
}
```

So B is supertype of A. **list** is a MyList of B and the return type is a MyList of B.

### Implement Concatenation method in Empty and Cons

Before we implement the flatMap method in Cons, let's first implement the concatenation method in Empty and Cons, starting with Empty:

```scala
object Empty extends MyList[Nothing] {
  // other methods excluded for brevity...

  def ++[B >: Nothing](list: MyList[B]): MyList[B] = list
}
```

We provide a type parameter B, which is a supertype of Nothing. We take a MyList\[B] and the return type is a MyList\[B]. For the implementation, we just return the **list**. Empty concatenating with anything will just return that thing.

For Cons, it's going to be a little more complicated. The implementation will look like this:

```scala
class Cons[+A](h: A, t: MyList[A]) extends MyList[A] {
  // other methods excluded for brevity...
  def ++[B >: A](list: MyList[B]): MyList[B] = new Cons(h, t ++ list)
}
```

It is going to return a new Cons, with the same head, and then the tail plus the list. This is a little bit of magic, so let's break it down again with some pseudo code. Say that we want to concatenate the lists \[1,2] and \[3,4,5]:

```scala
[1,2] ++ [3,4,5]
  = new Cons(1, [2] ++ [3,4,5])
  = new Cons(1, new Cons(2, Empty ++ [3,4,5]))
  = new Cons(1, new Cons(2, new Cons(3, new Cons(4, new Cons(5)))))
```

- On line 1, we want to concatenate \[1,2] with \[3,4,5]
- On line 2, the concatenate method returns a new Cons with 1 as the head. The tail \[2] is then concatenated with \[3,4,5]
- On line 3, we now have another new Cons with 2 as the head. The tail of \[2] is Empty, so we concatenate that with \[3,4,5]
- Finally on line 4, Empty ++ \[3,4,5] just returns the list \[3,4,5]. Which we know is actually new Cons with 3, and new Cons with 4, and new Cons with 5.

## Implement flatMap method in Cons

Let's now implement the **flatMap** in Cons, it will look like so:

```scala
class Cons[+A](h: A, t: MyList[A]) extends MyList[A] {
  // .. other methods excluded for brevity
  def flatMap[B](transformer: MyTransformer[A, MyList[B]]): MyList[B] = {
    transformer.transform(h) ++ t.flatMap(transformer)
  }
}
```

This implementation is another very powerful one liner. We will say transformer.transform the head, concatenated with tail flatMap transformer.

Let's break it down again with pseudo code. Say we have a simple list \[1,2], and for every **n** inside the list we get another list of \[n, n+1]. Our code would look like this:

```scala
[1,2].flatMap(n => [n, n+1])
  = [1,2] ++ [2].flatMap(n => [n, n+1])
  = [1,2] ++ [2,3] ++ Empty.flatMap(n => [n, n+1])
  = [1,2] ++ [2,3] ++ Empty
  = [1,2,2,3]
```

- On line 1, we have our list \[1,2] and we call the flatMap method. For every n, we want to return a list with \[n,n+1]
- On line 2, the first n (1) returns a list \[1,2]. We now concatenate that with the remaining tail ( i.e. \[2]), which will be flatMapped again.
- On line 3, we now have our lists \[1,2] and \[2,3]. These are concatenated with the tail of the list \[2], which was Empty, so we call flatMap on the Empty object
- On line 4, when we call flatMap on the Empty object, it just returns Empty
- So on line 5, we have the final list which is \[1,2,2,3]

## Testing the flatMap method

Let's test our **concatenation** and **flatMap** methods like so:

```scala
object ListTest extends App {
  val listOfIntegers: MyList[Int] = new Cons(1, new Cons(2, new Cons(3, Empty)))
  val anotherListOfIntegers: MyList[Int] = new Cons(4, new Cons(5, Empty))

  println((listOfIntegers ++ anotherListOfIntegers).toString)

  println(listOfIntegers.flatMap(new MyTransformer[Int, MyList[Int]] {
    override def transform(elem: Int): MyList[Int] = new Cons(elem, new Cons(elem + 1, Empty))
  }).toString)
}
```

The concatenation of the two lists of integers prints out \[1,2,3,4,5].

For the flatMap we say a listOfIntegers, flatMap with new MyTransformer from Int to MyList of Int. The override of the transform takes an element of type Int, and returns a MyList of Int. For the implementation, we say new Cons with element and another cons with element plus 1 and empty.

We would expect this to print out \[1,2,2,3,3,4]

# Summary

If you don't have much experience with Generics, this code may be tough to understand. But in about 100 lines of code, we have defined a powerful and complete covariant generic list. What we covered here is really showing some of the power of Scala.

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/objectOriented/MyList.scala).
