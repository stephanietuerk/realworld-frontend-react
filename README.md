# RealWorld Demo — React + Node

This is a frontend repo for a full-stack implementation of the [RealWorld app](https://github.com/gothinkster/realworld) that I built for learning and demonstration purposes.

The RealWorld project is intended to showcase implementations of the same product -- a Medium.com/dev.to style article creation/sharing site -- with different technologies. They offer a starter repo but I chose to build from scratch. My implementation's [deployed site](https://realworld-stephanie.netlify.app/) is fully functional, so feel free to create an account, write an article, edit it, leave comments, and otherwise poke around.

If you compare my implementation to the [official demo](https://demo.realworld.io), you'll see that I made quite a few changes to the UI and UX. That wasn't my original goal, but the improved UX made the entire app easier to reason about, and the additional frontend functionality created more opportunities for learning.

The frontend was built from scratch with React, Vite, TanStack Query, a few unstyled Radix components, and Lucide icons. (My current job doesn't use React, but I wanted to make sure that I could use it if the need arose.) I intentionally tried to minimize the number of packages I brought in so that I could focus on low-level work directly with React.

The [backend](https://github.com/stephanietuerk/realworld-backend-node) is a fork of the official Node/Express/Prisma RealWorld API, modified to fix known issues, update packages, and deploy. It conforms to the official endpoints spec.

You can view the deployed site [here](https://realworld-stephanie.netlify.app/)  
If you're curious to learn more about me, check out [my personal site](https://stephanietuerk.net/main)

## Application Features

The functionality of the application includes the following:

### Authentication & Authorization

- User registration with email/username/password
- User login with JWT token management
- Persistent authentication state across sessions
- Protected routes requiring authentication
- User logout functionality

### Article Management (Full CRUD)

- Create new articles with title, description, body, and tags
- Edit existing articles (author-only permission)
- Delete articles (author-only permission)
- View article details on dedicated page
- Markdown rendering for article body content
- Article slug-based routing

### Feed System

- Global feed displaying all articles from all users
- Personal feed showing articles from followed users
- Feed toggle between global feed and personal feed
- Pagination for article lists

### Social Features

- Follow/unfollow other users
- Favorite/unfavorite articles
- Real-time favorite count updates
- View user profiles with their articles
- Display author information on articles

### Article Interactions

- Comment on articles
- View all comments on an article
- Delete own comments
- Real-time comment count display

### Tag System

- Display popular tags in sidebar
- Filter articles by clicking tags
- Add multiple tags when creating articles
- Tag-based article discovery

### User Profile

- View user profile pages
- Display user's published articles
- Show user's favorited articles
- Edit own profile (bio, image, email, password)
- Profile settings page

### Technical Implementation Highlights

#### State Management

- React Context API for global application state
- Optimistic UI updates for improved UX
- Server state synchronization with TanStack Query

#### Data Fetching & Caching

- TanStack Query (React Query) for caching, and background refreshing
- Loading and error state management
- Mutation handling with optimistic updates

#### Routing

- React Router for client-side navigation
- Protected/authenticated routes
- Dynamic routing with parameters (slugs, usernames)
