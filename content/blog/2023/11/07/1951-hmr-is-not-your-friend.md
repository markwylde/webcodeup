---
title: HMR is not your friend
---

A curse that seems to have plagued the frontend community for years now is Hot Module Replacement (HMR). The idea of making changes in your code and seeing them instantly reflected in your app without a page reload. Coming from a mindset that values simple, minimal frameworks (ideally none at all), and functional development, I never understood the appeal when I first heard of it years ago. And now, despite being forced to use build tools with this "feature" baked in for years, I feel it's not only unhelpful to me but actually fosters poor development practices and degrades the user experience.

# Problems with HMR
## Buggy Performance
Fact check: HMR doesn't always work as advertised. It's not always "hot" nor does it "replace" without creating issues itself. Weird behaviors cropping out of nowhere, reloads not working correctly, changes not reflecting in real-time - there's more than a fair share of HMR horror stories.

## Additional Complexity
When you decide to use HMR, you invite additional layers of complexity into your code. Sprinkling module.hot.accept() throughout your code may not be rocket science, but it's another step in the process that opens room for mistakes.

## App Persistence
I believe our apps should persist their state across crashes and restarts. Think about it - wouldn't it be excellent if your app could pick right off where it left, if the user accidentally closes the tab, or accidentally hits a keyboard shortcut? With HMR, that's not always guaranteed.

## Speed Bumps
A common complaint I hear from developers is page reloads can be slow. But shouldn't the solution to this involve speeding up and improving your app's performance, instead of hacking together some complex developer tools to hide the problem?

## URL-State Synchronization
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
