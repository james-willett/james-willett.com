---
title: 'Gatling Pause Time Example Tutorial'
date: 2019-12-20
tags: [all, gatling]
slug: gatling-pause-example
summary: See the various different ways that you can add pause time into your gatling scripts, making them more realistic of actual user journeys
image: ./pause-time-cover.png
category: Gatling
---

# Introduction to Gatling Pause Time Example

One of the first things you will likely want to add into your Gatling script, is realistic pause times between requests. Without these pause times in place, your Gatling script will fly through all the requests in your script. This isn't realistic when compared with the approach that an end-user will take. The user will typically browse to a page, wait a few seconds, and then do something else.

In this post, we will see how to use the `scala±.pause()` DSL method from Gatling with a few examples.

# Source Code & Target Applications

If you want to follow along with the code in this post, you can find the code in my [Github Repository](https://github.com/james-willett/gatling-blog).

We will be writing tests against the [Video Game DB](https://github.com/james-willett/VideoGameDB). You can either clone the project and run it locally, or run tests against the [hosted version](http://video-game-db.eu-west-2.elasticbeanstalk.com/swagger-ui/index.html#/).

# Gatling Pause Time Examples - 4 different methods

There are 4 different ways of using pause time in Gatling, and they are all show in the example script below:

```scala
package simulations

import io.gatling.core.Predef._
import io.gatling.http.Predef._

import scala.concurrent.duration._

class PauseTime extends Simulation {

  val httpConf = http.baseUrl("http://video-game-db.eu-west-2.elasticbeanstalk.com/app/")
    .header("Accept", "application/json")

  val scn = scenario("Video Game DB - Different Types of Pause")

    // Type 1 - Pause for a fixed duration - defaults to seconds
    .exec(http("Get all video games - 1st call")
      .get("videogames"))
    .pause(5)

    // Type 2 - Pause for a fixed duration, specify the time unit
    .exec(http("Get specific game - 1st call")
      .get("videogames/1"))
    .pause(4000.milliseconds)

    // Type 3 - Pause for a random time between two durations
    .exec(http("Get all Video games - 2nd call")
      .get("videogames"))
    .pause(1, 5)

    // Type 4 - Pause for a random time between two durations, specify the time unit
    .exec(http("Get specific game - 1st call")
      .get("videogames/1"))
    .pause(1000.milliseconds, 7000.milliseconds)

  setUp(
    scn.inject(atOnceUsers(1))
  ).protocols(httpConf)

}
```

Let's extract each one, and analyse it individually:

## Example 1 - Gatling Pause for a Finite Duration

The first example is probably the most common:

```scala{4}
// Type 1 - Pause for a fixed duration - defaults to seconds
.exec(http("Get all video games - 1st call")
  .get("videogames"))
.pause(5)
```

Here we just provide the Gatling `scala±.pause(5)`. Without specifying a time unit, this will default to 5 seconds.

## Example 2 - Gatling Pause for a Finite Duration with Specific Time Unit

In the second example of a Gatling pause, we are specifying the time unit:

```scala{4}
// Type 2 - Pause for a fixed duration, specify the time unit
.exec(http("Get specific game - 1st call")
  .get("videogames/1"))
.pause(4000.milliseconds)
```

**Note**: in order to specify time units, you need to import `scala±import scala.concurrent.duration._` at the top of the class.

## Example 3 - Gatling Pause for a Random time between Two Durations

We can also set the Gatling pause to be random, between two defined durations:

```scala{4}
// Type 3 - Pause for a random time between two durations
.exec(http("Get all Video games - 2nd call")
  .get("videogames"))
.pause(1, 5)
```

This will cause Gatling to pause randomly between `1` and `5` seconds, because we didn't specify a time unit.

## Example 4 - Gatling Pause for a Random time between Two Durations with Specific Time Unit

Finally, we can also get Gatling to pause for a random time between two different durations, and specify the time unit:

```scala{4}
// Type 4 - Pause for a random time between two durations, specify the time unit
.exec(http("Get specific game - 1st call")
  .get("videogames/1"))
.pause(1000.milliseconds, 7000.milliseconds)
```

This will tell Gatling to pause between `1000` and `7000` **milliseconds**.

# Summary

In this simple example, we saw all of the different ways that we can add pause time to our Gatling scripts.
