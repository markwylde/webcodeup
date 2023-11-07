---
title: HMR is not your friend
---

A curse that seems to have plagued the frontend community for years now is Hot Module Replacement (HMR). The idea of making changes in your code and seeing them instantly reflected in your app without a page reload.

I come from a mindset that values simplicity, boycotts complex frameworks, and prefers functions over classes, so I never understood the appeal when I first heard of it years ago. And now, despite being forced to use build tools with this "feature" baked in for years, I feel it's not only unhelpful to me but actually fosters poor development practices and degrades the user experience.

# Problems with HMR

## 1. Buggy

I don't think I'm being controversial when I state HMR doesn't always work as advertised. Weird behaviors crop out of nowhere, reloads don't always work correctly, changes don't always reflecting in real-time. There's more than a fair share of HMR horror stories, and people tend to some some none trivial time tinkering and configuring this feature to work.

This isn't to say the people implementing these features aren't doing their best. Live reloading of code in a browser, without refreshing the page, is extremely hard to do. But my ask is, what are we really solving here that makes all this effort worth it?

## 2. Additional Complexity
When you decide to use HMR, you invite additional layers of complexity into your code. Sprinkling module.hot.accept() throughout your code may not be rocket science, but it's another step in the process that opens room for mistakes.

When something goes wrong with your site, you now have to keep in the back of your mind, it could be your HMR not updating correctly. Yes, this isn't a huge ask, but I feel if you are of the mindset that HMR is useful, you probably have a lot of other "helpful tools" that enrich your development process. These things add up.

## 3. App Persistence
If you're working on a part of your app that's several steps deep, like step 5 of a 10 step registration process, without HMR you'd have to constantly reload and navigate through all the previous steps just to get back to where you were editing, right?

Personally, I don't think so. Let's get past poor UX journey of a 10 step registration process for a moment.

No matter what happens: crashes, restarts, accidental tab closures—your app, I feel your app should bounce back like nothing ever happened. Users should feel like they're stepping back into a room they just left, not starting over from scratch.

When we hide this experience during our development, we are less likely to get frustrated by it, and therefore less likely to fix it. Don't hide your frustrations. Fix them.

Imagine working on a document online, and you lose your progress because the page refreshes. Frustrating, right? Now apply that to web apps. Users expect to return to their work uninterrupted, not start a treasure hunt for where they left off.

### Save the State
What if a page could refresh at any stage of the app journey and take us back to the exact same state? For instance, if you have a tabbed panel, that selected tab should be in the URL, and refreshing your page would return you to that same tab. With HMR, that's another missed opportunity.

If you have half completed a form, and refresh the page, I think it's nice to at least ask the user if they'd like to continue from where they left off. Sometimes, the things that frustrate you during development, are also the things that frustrate your users.

## 5. Speed Bumps
I hear from a lot of developers that their website refreshes just take too long and it interrupts their flow. But, I feel if your page takes ages to reload, that's not just a nuisance, it's an actual problem that needs to be fixed.

On the web, we are increasingly becoming fatigued with slow, bloated and buggy web pages. But this isn't how it needs to be. We shouldn't be making websites that take second to load, whether you are in your development environment or production.

### Treat the cause
When developers lean on tools like HMR to sidestep slow reload times, they're just hiding a more serious problem with their site, instead of addressing the underlying issues. It's probably hiding problems with journeys that users will eventually face in production.

If you're creating a great development experience, where a simple refresh takes less than a hundred milliseconds, think how amazing your production build would be.

Using HMR or similar tools as a crutch means you might not feel the urgency to tackle performance issues head-on. You might not notice the bloated script files, the sluggish API calls, or the heavy lifting done on the client-side that should be on a server.

So the aim should be to make your app so zippy that you don't need to rely on HMR to avoid the pain of reloading.

# Do We Really Need HMR?
Before we embrace a tool simply because it's the flavor of the month, we need to consider the YAGNI (You Ain't Gonna Need It) principle. Is HMR adding value to our development process, or is it just another layer of complexity and potential problems we ain't gonna need?

HMR might also tie you down to a complicated build. And it's not a guarantee that your chosen build tool will gel well with HMR. And even if they do, using HMR may still not be the best idea.

## Choosing a build tool
Webpack and other build tools promise the world, and come with hundreds of features that in my opinion you don't need. They come with:

**Confusing configs:** Ever tried tweaking a Webpack config? It's a rabbit hole.

**Sluggish rebuilds:** Wait ages for your changes to show up. Time's ticking.

**Too much abstraction:** Does everyone (or even the majority of the team) know trely what webpack is actually doing anymore?

**Fixing problems you don't have:** Most of the time, the solution/overhead these tools provide are worse than the problem they're trying to fix.

I know there are many other build tools. It sometimes seems a new one comes up every month. But just remember, over time, as each of the new shiny build tools become more mature, they add more config and more options.

I'm not pushing for coding everything in vanilla JavaScript meant for direct browser execution. However, by scaling back our reliance on hefty beefy tooling, we open the door to a more tailored approach. This means we can ditch the 'Jack of All Tools, Master of None' mindset and embrace specialized tools that excel in doing one thing exceptionally well.

**esbuild**, for example, is simple, fast, effective, doesn't have HMR and that's fine. Build snappy, fast, bloat-free web apps that are as enjoyable to work on as they are to use.

We need to critically evaluate new tools before embracing them hook, line, and sinker. After all, in our quest for elegance and efficiency, we ain't gonna need every shiny new tool that comes our way. Whether or not to use HMR is one of those decisions to be determined by your unique context rather than market hype. Choose wisely!
