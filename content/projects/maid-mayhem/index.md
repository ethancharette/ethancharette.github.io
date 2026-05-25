---
title: "Maid Mayhem"
date: 2026-04-15
tags: ["3D Party Brawler | Technical Lead"]

showHero: true
heroStyle: "custom"
image: "featured.png"
subtitle: "2–4 Player Party Brawler | Technical Lead"
credit: "Art by Emma Little"
---

*Maid Mayhem* is a 2-4 player local multiplayer party game developed in Unity as a capstone project. Players compete in a chaotic household, beating the gunk off of furniture and the other maids to score points. Whoever has the most points at the end of a match wins, and is dubbed THE BEST MAID EVER!
## Trailer

{{< youtube Cs3Yq-kMEoE>}}
[{{< icon "steam" >}} Available for FREE on Steam!](https://store.steampowered.com/app/4329840/Maid_Mayhem/)

> [Award Winning | Level Up Student Showcase 2026](https://levelupshowcase.com/awards/)  
> 1st in People's Choice, 2nd in Achievement in Audio

{{< carousel images="levelup-team.jpg,levelup-peoples.jpg,levelup-audio.jpg,levelup-crowd.jpg" captions="levelup-team.jpg:Patchd Up Games,levelup-peoples.jpg:People's Choice,levelup-audio.jpg:Achievement in Audio">}}
---

> **Role:** Technical Lead  
> **Team Size:** 11 total members, 5 programmers, 5 artists/designers, 1 composer  
> **Duration:** 8 months  
> **Engine:** Unity  
> **Language:** C#  
> **Tools:** Git, P4 Plan (Hansoft)

## My Role
I was the **Technical Lead** on *Maid Mayhem*, leading a team of 5 programmers within an 11-person capstone project.
* Wrote and maintained the Technical Design Document, including system architecture, APIs, and UML diagrams
* Designed and implemented core gameplay systems including player controllers, cleaning/combat mechanics, score system, and match flow
* Helped define the project's overall architecture and coding structure to keep systems modular and maintainable
* Coordinated programming tasks and supported teammates with integration and debugging
* Managed the Git repository and supported weekly task tracking using P4 Plan (Hansoft)

## Technical Challenges

### Overcoming Pipeline Bottlenecks 
During development, we ran into a implementation pipeline bottleneck wiht our "cleanable" objects. These requred a lot of manual setup, which made it difficult for designers to create and iterate on content without programmer help.

To fix this, I learned tools programming and built a Unity editor tool that automated 90% of that process. This reduced implementation time and allowed designers to independently create and modify cleanable objects.

### Large-Scale Pivot 
Midway through development, we found that the core gameplay loop wasn't engaging enough. Cleaning was separated from combat, but combat was driving most of the moment-to-moment fun.

We decided to rework the core systems by merging cleaning directly into combat and adjusting the scoring system. This included adding score multipliers, point loss mechanics, and expanding attack variety with two light, one heavy, and one special attack per tool. With five different tools, this resulted in expanding the combat mechanic from 5 basic attacks to 20 different unique attacks.

As **Technical Lead**, I coordinated the programming refactor, helped restructure priorities, and worked with the team to get the new systems ready for an upcoming playtest.
