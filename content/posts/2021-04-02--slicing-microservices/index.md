---
title: Slicing Microservices
subTitle: Ideas to design micro-services 
postDescription: Some ideas to go about in designing micro-services. How to slice them and some general conventions
category: architecture
---

> *Cross posted from [Dev.to blog] (https://dev.to/prasann/slicing-microservices-1agj)*

Building applications using micro-services are becoming a default go-to architecture these days. I have been part of few teams that build and deploy micro-services in a large scale. 

> One pertinent question that often asked is "***Did we slice it right?***"

## What is slicing a service mean

Slicing a micro-service refers to defining the boundaries of the micro-service. 

- What should the service be responsible for
- What kind of data should it hold
- When it should delegate it's responsibility to another micro-service.

Below are some of my experiences, that i have seen working.

## When to do it

One of the common behaviour we did in the teams I worked so far, is to let micro-services **evolve** organically. We add feature/capabilities to the existing service and later trim down the service by spawning a new one. 

![organic slicing of micro-service](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fz8fj6jt4y0z5rlp1irs.png)


Some of the benefits,

- **No need of upfront discussion**. Most likely we will have lesser information about the feature, then likely that our design might reflect the incompetencies.
- **Spawning a new service will have it's own cost**. How much ever you automate, it still adds up the infrastructure cost, maintenance cost. If we are wrong about the slicing then we had to spend some more time and effort to unify it with some other service.
- Once we have built a feature, most of the **people in the team will understand the use-case and will appreciate the need of a separate service**. It doesn't become a single person's decision or a group of architect's decision. But a decision that comes from ground up. There  is a better chance for the service the retain it's shape when it grew this way.

This approach does require a good discipline in having a constant check on the growth of a service. A highly coupled service is very hard to break down later. And if we are too late to cut down a service, it might become an expensive operation too.

## How to do it

Here are some of the themes i have come across. I will try to explain my thoughts using a bare minimum add-to-cart like domain problem.

### Entity based slicing

Very common and obvious start for a new service. 

Example: `UserService` dealing with the CRUD of a `User` entity in the system. 

It's easy to conclude **entities (domain models)** as boundaries, since it's intuitive for people to see the separation. But whether it's right? is highly questionable and depends a lot, on the use case.

> It's simple, easy and often end up in chaos

One of the significant problems, i have seen is that these services will be very much in demand by other service. They entire network becomes very chatty. One can assume the `User` entity will be needed at each and every step of the application and will have lots of interaction. Worst, is when the services decided to retain their copy of the data to enhance the performance of the application.

Orchestrator will become a monolith. Since there will be lots of entity services to do mundane operation, orchestrator will become the one service to hold the business logic.

![entity based slicing](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/si5fohmhiv4aqoa1h7xi.png)

### Journey based slicing

Slicing services based on **user journeys and behaviour**. This is quite popular, especially among the product people. Mostly, the product evolution happens on a feature/journey based. So whenever a new journey is identified it's time to build a new service.

Ex: `RatingService` a service that allows you to rate an entity. It can be products, people or article etc. Behaviours can include to make sure you don't rate same article twice, compute average ratings etc.

One of the advantage of this technique is that usually the teams i have worked in the past, they own the journey and hence it's clear for them what needs to be the part of this service

Huge drawback I have seen with this approach, is that it forces the data being duplicated across services. In order to maintain the true flavour of Microservice, we will end up having independent databases and eventually having duplicate data

### Best of both worlds

It makes a lot of sense to combine the above 2 approaches. Identify the core entities (domain models) of the system, and have them as either independent or logically grouped service. Apply journey based slicing on top of this entity services. So, the teams will own the journey service and the entity services can be maintained by group of teams.

![best of both worlds](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/degdriqsoudx0xhr4pgt.png)

Some of the conventions that i have seen/worked while slicing Micro-services

**Entity services should be thin and lenient.** 

Entity services should be merely act as APIs to the database operations. Do not try bringing in business logic here. 

For example, making the email-address non updatable in the entity service level. It makes sense to not to allow the end-user to allow update the email addresses, but often that might be a need from a back office personnel (admin user). So restricting such operation in the entity level might not be worth it. **Journeys should take care of validations.**

> It's hard to predict the future requirements so keep EntityServices simple and open for extension.

**Avoid journey service calling other journey services**

Journey services, should be independent of others. Store data that are necessary for the journey and use entity services to collaborate with common data. 

**Build composite entities wherever needed**

- Now, to answer the immediate question that will raise due to the above constraint. How to manage the duplicate business logic.  To be honest, **DRY principle is overrated in my opinion.** But in case if you are looking for such thing, then try adding another layer of composite entities.
- These composite entities, will encapsulate multiple entities and some business logic around this. One classic example from the app we built is a tax computation service. It involves the product, and the location of the buyer to calculate the tax.

All these things are from my past experience, I'm sure I'm going to learn more and course correct myself in this journey. But one thing that i feel will always help in evolving micro-services is to constantly question the slicing decision to get it at a right state. And also a good knowledge on the [Domain driven design](https://martinfowler.com/bliki/DomainDrivenDesign.html) helps a lot to take these decisions.

<!---
*Image credits:*
 [https://xminimus.com/wp-content/uploads/2019/04/AdobeStock_194539497_crop.jpg](https://xminimus.com/wp-content/uploads/2019/04/AdobeStock_194539497_crop.jpg)
-->


