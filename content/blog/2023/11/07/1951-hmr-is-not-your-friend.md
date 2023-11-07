---
title: HMR is not your friend
---

A curse that seems to have plagued the frontend community for years now is Hot Module Replacement (HMR). The idea of making changes in your code and seeing them instantly reflected in your app without a page reload. Coming from a mindset that values simple, minimal frameworks (ideally none at all), and functional development, I never understood the appeal when I first heard of it years ago. And now, despite being forced to use build tools with this "feature" baked in for years, I feel it's not only unhelpful to me but actually fosters poor development practices and degrades the user experience.

# Problems with HMR
## 1. Buggy Performance
Fact check: HMR doesn't always work as advertised. It's not always "hot" nor does it "replace" without creating issues itself. Weird behaviors cropping out of nowhere, reloads not working correctly, changes not reflecting in real-time - there's more than a fair share of HMR horror stories.

## 2. Additional Complexity
When you decide to use HMR, you invite additional layers of complexity into your code. Sprinkling module.hot.accept() throughout your code may not be rocket science, but it's another step in the process that opens room for mistakes.

## 3. App Persistence
No matter what happens: crashes, restarts, accidental tab closures—your app, I feel your app should bounce back like nothing ever happened. Users should feel like they're stepping back into a room they just left, not starting over from scratch. HMR might sound snazzy with its instant updates, but when it comes to persistence, it often drops the ball.

### Why Persistence Matters
Imagine working on a document online, and you lose your progress because the page refreshes. Frustrating, right? Now apply that to web apps. Users expect to return to their work uninterrupted, not start a treasure hunt for where they left off.

### Build for the Real World
Here's the truth: apps crash, connections die, and browsers close. Your app needs to handle these hiccups like a champ. That means saving state to local storage, syncing with a backend service, or encoding state in the URL. It's not just about convenience; it's about reliability.

When we hide this experience during our development, we are less likely to get frustrated by it, and therefore less likely to fix it. Don't hide your frustrations. Fix them.

## 4. Speed Bumps
It's a common gripe in the dev community—slow page reloads can be a drag. But here's the thing: if your page takes an age to reload, that's not just a nuisance; it's a symptom. A symptom of deeper performance issues that no amount of hot-reloading magic is going to cure.

### Treat the cause
When developers lean on tools like HMR to sidestep slow reload times, they're putting a band-aid on a bullet wound. It's a temporary fix that doesn't address the underlying issues. And what's worse, it might hide problems that users will eventually face in production.

Using HMR or similar tools as a crutch means you might not feel the urgency to tackle performance issues head-on. You might not notice the bloated script files, the sluggish API calls, or the heavy lifting done on the client-side that should be on a server.

So, what's the game plan? The aim should be to make your app so zippy that you don't need to rely on HMR to avoid the pain of reloading.


## 5. URL-State Synchronization
What if a page could refresh at any stage of the app journey and take us back to the exact same state? For instance, if you have a tabbed panel, that selected tab should be in the URL, and refreshing your page would return you to that same tab. With HMR, that's another missed opportunity.

If you have half completed a form, and refresh the page, I think it's nice to at least ask the user if they'd like to continue from where they left off. Sometimes, the things that frustrate you during development, are also the things that frustrate your users.

# Do We Really Need HMR?
Before we embrace a tool simply because it's the flavor of the month, we need to consider the YAGNI (You Ain't Gonna Need It) principle. Is HMR adding value to our development process, or is it just another layer of complexity and potential problems we ain't gonna need?

HMR might also tie you down to a complicated build. And it's not a guarantee that your chosen build tool will gel well with HMR. And even if they do, using HMR may still not be the best idea.

## Choosing a build tool
Webpack and other build tools promise the world, and come with hundreds of features that in my opinion you don't need. They come with:

**Confusing configs:** Ever tried tweaking a Webpack config? It's a rabbit hole.

**Sluggish rebuilds:** Wait ages for your changes to show up. Time's ticking.

**Too much abstraction:** Sometimes it feels like you need a degree in Webpack-ology to get what's going on.

**Fixing problems you don't have:** Most of the time, these tools "solve" issues you're not even facing.

I know there are many other build tools. It sometimes seems a new one comes up every month. But just remember, as each of the new shiny build tools become more mature, they come with more config and more options.

I'm not pushing for coding everything in vanilla JavaScript meant for direct browser execution. However, by scaling back our reliance on hefty frameworks, we open the door to a more tailored approach. This means we can ditch the 'Jack of All Trades, Master of None' mindset and embrace specialized tools that excel in doing one thing exceptionally well.

**esbuild**, for example, is simple, fast, effective, doesn't have HMR and that's fine. Build snappy, fast, bloat-free web apps that are as enjoyable to work on as they are to use.

We need to critically evaluate new tools before embracing them hook, line, and sinker. After all, in our quest for elegance and efficiency, we ain't gonna need every shiny new tool that comes our way. Whether or not to use HMR is one of those decisions to be determined by your unique context rather than market hype. Choose wisely!
