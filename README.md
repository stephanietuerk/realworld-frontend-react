# RealWorld Demo — React + Node

This is a frontend repo for a full-stack implementation of the [RealWorld app](https://github.com/gothinkster/realworld) that I built for learning and demonstration purposes. The [deployed site]() is fully functional, so feel free to create an account, write an article, edit it, leave comments, and otherwise poke around.

If you compare my implementation to the [official demo](https://demo.realworld.io), you'll see that I made quite a few changes to the UI and UX. That wasn't my original goal, but the improved UX made the entire app easier to reason about, and the additional frontend functionality created more opportunities for learning.

The frontend was built from scratch with React, Vite, TanStack Query, a few unstyled Radix components, and Lucide icons. (I don't currently use React professionally, but wanted to make sure that I could use it if the need arose.) I intentionally tried to minimize the number of packages I brought in so that I could focus on low-level work directly with React.

The [backend](https://github.com/stephanietuerk/realworld-backend-node) is a fork of the official Node/Express/Prisma RealWorld API, modified to fix known issues, update packages, and deploy. It conforms to the official endpoints spec.

You can view the deployed site [here](https://your-app.netlify.app)  
If you're curious to learn more about me, check out [my personal site](https://stephanietuerk.net/main)
