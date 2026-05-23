---
title: "In Defense of Skills"
description: "To skill or not to skill"
publishDate: 2026-05-13
tags: ["ai", "skills"]
---

There's been a lot of talk recently about whether you should use Skills at all while coding with an LLM. The AI coding space is still moving at a Sonic-gotta-go-fast pace, so what you hear one week may be passé by the next week.

![Sonic gotta go fast](/blog/in-defense-of-skills/sonic-gotta-go-fast.gif)

Initially, _everybody_ was all about skills. Skills are awesome! Let's all write skills! Then it became "no, skills are bad, this is why you should not use skills, you should use hooks."

Most of the "skills are bad" arguments are usually:

- the LLM doesn't always invoke the skill when you want it to
- the LLM invokes the wrong skill

Personally, I think we're using skills wrong.

## You should be invoking the skill

To me, skills are not a set it and forget it and hope your LLM knows when to invoke it. To me, a skill is a series of instructions that I want my LLM buddy to follow _when I invoke the skill_.

I read an article recently that said, to paraphrase, "people write skills when they get tired of typing the same thing over and over again", like it's a bad thing. But that is _exactly_ why I like skills. Write it once, write it well, and you don't have to repeat yourself.

![It's DRY!](/blog/in-defense-of-skills/its-dry.png)

Better yet, you don't have to remember exacly what you said or how you said it every time you need it. You have already **codified** it in the skill.

## You should be using hooks instead!

Another anti-skill article I read complained that people "use skills like CLI commands", again, like it's a bad thing. I guess the argument is that the whole point of an LLM is that you can use natural language. It's not a dumb CLI tool. "If you want certain things done at a specific time, you should be using hooks!"

### The great hiccupping incident of 2026

Personally, I have tried both skills and hooks, and I personally like skills better. I found hooks too unruly and oddly not smart enough? For example: I had a hook to run tests and linter after finishing a coding task. But the hook would run even after non-coding tasks. At some point, Claude could not stop running this test and lint hook, it almost looked like it was hiccuping. I wish I had taken a screenshot, but the output looked something like:

```
Trying to run test_and_lint. This isn't a coding task, stopping.
Trying to run test_and_lint. This isn't a coding task, stopping.
Trying to run test_and_lint. This isn't a coding task, stopping.
Trying to run test_and_lint. This isn't a coding task, stopping.
Trying to run test_and_lint. This isn't a coding task, stopping.
```

Before anyone says I set up the hook wrong, I had Claude set up the hook itself, and I confirmed the hook was set-up to only run after coding tasks.

![Yo ho yo ho near the hooks I never go](/blog/in-defense-of-skills/yo-ho-yo-ho-near-the-hooks-i-never-go.png)

After that debacle, I created a skill I called "prep-for-review". The skill runs relevant, tests, runs the linter, and also checks test branch coverage, all using subagents. Once that is done I get a report of the results that looks something like this:

| Task     | Result         |
| -------- | -------------- |
| Tests    | ✅ passed       |
| Linter   | ✅ passed       |
| Coverage | ✅ passed (90%) |

After that, I am ready to commmit my work and push up my changes. _I invoke this skill_ when I am ready to commit and push my changes. That's it. 

No more hiccupping. No more fiddling with hooks or wondering if you set up the hook right. 

To the people who say "don't use skills like CLI commands, use natural language" what is a skill but natural language in a markdown file?

## But skills bloat your context window!

Sure, I think at some point every one gets a little too skill-happy. You write a skill for everything, and all of a sudden you may end up with a bunch of skills, some of which may even contradict each other, which end up confusing the LMMs even more.

That is fair! This is why I tend to prefer highly focused/specific skills, and also specifically invoking a skill when I want the skill to be used.

In terms of not bloating my context window, I use `statusline` to keep an eye on my context window, clear often, and also use a model with a much lower context window (200k tokens instead of 1M+). 1M+ context window is a double-edged sword. It can be great for a long-running task, so you don't have to repeat yourself or provide task-specific context. But this also means the LLM is carrying that context with every request, which can lead to higher token usage.

## Use what works for you

Which brings me back to... SKILLS! If you use a model with a lower context window like I am, the lower context window plus invoking a skill only when you need them has worked really well for me. I am not having to keep too large a context window around so the LLM can remember how to do a thing I want. I clear more often and keep those sessions lean and just fall back on invoking skills when I need them.

But again, if hooks work for you, you go ahead! What I would love to see is not giving other people grief for using the workflows that work _for them_.

So this is my post defending skills for those who need to read it. Use what you like, and don't be afraid to like what works for you!
