---
title: Downscaling my Homelab
date: 2026-02-13
description: What's truly important to you?
---

I've been experimenting with a homelab for a good time. I spent the last four to five years refining my setup and I came to a conclusion that not a bunch of people in this space realize: I didn't most of the services I was running.

## My path to a homelab

My journey mainly started because I didn't want to rely on Google Services anymore. Actually, I didn't want to rely on mostly any big-corp cloud.

The thing with [degoogling](https://reddit.com/r/degoogle) is that it's well known to be a path of pain, in some ways. Although, it gives more control to the user. Still, with more control comes bigger responsibilities.

I understand and respect the people that went this route and persisted, but I also understand the people that gave up on it.

## The time allocation

In the past, I had a bunch of time to spend on this stuff.

Whenever something broke, I was there to fix it.

Whenever a new version launched, I was there to update.

Whenever a new app popped in my feed, I was there to try it out.

I've seen myself hyper-focused on making things better. Better for what? Everything I had before already did work, so why bother?

It's an interesting thought, and each one of the homelabbers has their own reasons. Mine was: I liked spending time on it. The computers weren't just (the main) part of my profession, they were also my hobby.

I've even went to the NixOS route (which is a topic I'd like to talk in a future post). I made everything declarative and easy to deploy. So easy to deploy that I needed to do it just a single time. I've spent weeks refining it just so I could re-deploy it a single time (and because I really did want to re-deploy, since the system was really stable).

But time became a really valuable resource in this past year, and I started to realize what really mattered and think if I really needed all this equipment and services.

## The hardware and the services

I started using an old "gaming" PC as my main server. It had an octa-core processor, 32GB of RAM and a great graphics card. It ran Proxmox with some VMs.

It was more than enough for anything I needed or wanted to run (besides some local LLMs).

After that, I thought a NAS would be welcome. Well, I had everything working in place already, why did I need a NAS? <s>Because I wanted it.</s> Because I didn't want to put all the responsibility into a single device. NASes are usually more stable, if something goes wrong with updates from other applications or the Hypervisor it shouldn't be affected, a bare-metal NAS has more usability than a VM etc.

So, I bought a N100 Motherboard + CPU combo from AliExpress, two 4TB HDDs, 16GB of RAM, one lifetime Unraid license and then I had a NAS.

Eventually I moved to a new place, a place that was actually mine. Any guess on what happened? Home Assistant.

At least for Home Assistant I didn't buy anything new. I just reused a Raspberry Pi that I already had.

To sum up, I had:
1. Old Desktop as the main server (NixOS)
2. NAS
3. Raspberry Pi for HA

And, while I totally understand this doesn't sound like much in terms of homelabbing for most people, probably, I started to feel a little bit overwhelmed.

The main server had like thirty applications running. No, I never tried self-hosting an email server and I'll never try.

A lot of the services were media-related, such as Immich, Jellyfin, Arr's and Torrent client.

But I also had a reverse proxy, an OIDC server, a VPN server, monitoring software, document server, tools and the list goes on.

## My turning point

My 'main server' also served me as a gaming computer (back to where it came from) and a [Sunshine](https://github.com/LizardByte/Sunshine) host.

I gamed a lot on it, and the experience was really great. I managed to complete several games on it. Of course, after I spent some time tweaking and making sure everything was working as intended - after each update.

And then I started playing Red Dead Redemption 2. Such a great game that I don't even think I'm able to describe all of what I feel about it. Maybe some day.

RDR2 ran... "well". Well enough for me to play, of course, but since I was sharing all the resources of my computer to a whole bunch of services, the performance wasn't really great given my hardware. I started to guess if having something dedicated for gaming would make sense. Also after seeing the hype on CachyOS and Bazzite, I was really looking forward to it.

But, why? I already had a bunch of hardware, why would I spend on something just for gaming? Why would I have something dedicated for gaming since I didn't have enough time anyway? A Steam Deck would solve this problem, but I already had the hardware, why spend more?

That's the line of thought that led me into deciding to downscale my homelab.

## The changes I've done

I started thinking on what was really important on my home server.

- Media? We already have a bunch of streaming services (my wife's decision, not mine).
- Photos? Yeah, these are important.
- Dav (Contacts)? These too.
- Groceries management, RSS, Speedtest, Bookmarks, Audiobooks, OIDC...? Not even using.

Given the overall thoughts, I needed somewhere to move the services I still wanted to keep: The NAS.

Unraid was running for more than an year with less than hours of downtime.

I knew it was running easily in the hardware I had, it supported Docker containers, the "app store" also had a bunch of "native" apps that would help in case I wanted to do something outside of Docker.

I also knew that I would need to give up on the "declarativeness" of NixOS, but I was fine with that. A backed-up container data folder with git versioned compose files was enough for me.

So I decided to go all-in.

Photos were handled by [Immich](https://github.com/immich-app/immich), and I really love this tool. I've backed up the container files, moved to the NAS, set-up the compose file with the same configurations it had on NixOS, set-up a reverse proxy easily using Nginx Proxy Manager and... That's all. It was done. It worked since the first moment.

The contacts were moved to my mail account, although setting up Baikal would be easy too.

With this change made, I formatted the main server, installed [CachyOS](https://cachyos.org/) (which I've been really a fan of) and installed my games. A clean computer for gaming in my free time, without the need to deal with a lot of variables, with way better performance than before.

## The conclusion

This post isn't to discourage anyone on homelabbing. Building a home server is fun (and it takes time), and it's great to put effort in something that makes us happy.

The possibilities are endless when you have a home server. The "normal person" will probably think it's magic how you set-up your own streaming service.

This post is for the regular person to evaluate the time they are spending on a home server and if there's really a reason to maintain a whole "data center" for just streaming some movies to your loved ones.

## Footnotes

This is my first actual post here, and I appreciate everyone that spent their time reading it.

Kindly,
Bruno.
