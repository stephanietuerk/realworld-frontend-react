# RealWorld Demo — React + Node

This is a frontend repo for a full-stack implementation of the [RealWorld app](https://github.com/gothinkster/realworld) that I built for learning and demonstration purposes.

The RealWorld project is intended to showcase implementations of the same product -- a Medium.com/dev.to style article creation/sharing site -- with different technologies. They offer a starter repo but I chose to build from scratch. My implementation's [deployed site](https://realworld-stephanie.netlify.app/) is fully functional, so feel free to create an account, write an article, edit it, leave comments, and otherwise poke around.

If you compare my implementation to the [official demo](https://demo.realworld.io), you'll see that I made quite a few changes to the UI and UX. That wasn't my original goal, but the improved UX made the entire app easier to reason about, and the additional frontend functionality created more opportunities for learning.

The frontend was built from scratch with React, Vite, TanStack Query, a few unstyled Radix components, and Lucide icons. (My current job doesn't use React, but I wanted to make sure that I could use it if the need arose.) I intentionally tried to minimize the number of packages I brought in so that I could focus on low-level work directly with React.

The [backend](https://github.com/stephanietuerk/realworld-backend-node) is a fork of the official Node/Express/Prisma RealWorld API, that I modified to fix known issues, update packages, and deploy. It conforms to the official endpoints spec.

If you're curious to learn more about me, check out [my personal site](https://stephanietuerk.net/main)

Caveat lector: This no where near being a prod-ready app. It is barely optimized for mobile, it is entirely untested, and many more details could use additional polish. Its current level of polish reflects its status as a personal exercise.

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

## UX Improvements (Not in RealWorld Spec)

### Navigation & Workflow

- **Modal-based authentication**: Login/register forms open as modals that overlay the current page, allowing users to authenticate without losing their place in the app or interrupting their workflow

- **Improved navbar for logged-in users**: Streamlined navigation with clearer options—consolidated account actions under a dropdown menu, making "Write" and "Explore" more prominent in the main nav

- **Self-view profile access**: Expanded author profile page to also be the default view for the user's profile page. Improves experience consistency of application, making it easier for users to understand how they appear to other users and how to manage their content.

### Visual Design & Information Architecture

- **Enhanced article preview cards**:
  - Added visual separation with card-style containers instead of simple list items
  - Improved information hierarchy with better typography and spacing
  - Positioned favorite count more prominently with better visual weight
  - Made article metadata (author, date, tags) easier to scan
- **Improved contrast and accessibility**: Ensured text meets WCAG contrast requirements; the original's light gray text was difficult to read
- **Clear interactive affordances**:
  - Added hover states to all clickable elements
  - Made tags visually distinct and clearly clickable
  - Improved button styling to look more clickable vs. the original's flat design
- **Better use of white space**: Reduced visual clutter by giving content more breathing room, particularly in the sidebar and article listings

- **Profile header design**: Added a colored banner section to profile pages for better visual hierarchy and to make the username more prominent

### Article Editor Experience

- **Cleaner, more focused editor layout**:
  - Simplified the create article page with clearer form structure
  - Better label hierarchy and field descriptions
  - Added helpful hints (e.g., "All fields required except Tags")
- **Auto-expanding textarea**: The article content textarea grows dynamically as you type, eliminating the need for scrolling within a fixed-height input

- **Write/Preview toggle**: Added a preview mode so authors can see rendered markdown before publishing

- **In-place editing**: Users can edit articles directly from the article view without navigating to a separate page. Click "Edit article" and the same view transforms into edit mode, preserving context and making the editing workflow feel more fluid. An "Exit editing" option returns you to read mode without navigation.

- **Contextual article metadata sidebar**: While editing, the right sidebar displays article metadata (author, last updated) and actions (save, delete), keeping all relevant information and controls visible without cluttering the editing canvas

### Profile & Content Management

- **Improved profile layout**:
  - Clear "Show my" toggle between "Own Articles" and "Favorites" with better visual indication of selected state
  - Empty states with helpful prompts (e.g., "Why not write your first one?" with direct link to create)
  - Breadcrumb navigation showing current location
- **Consistent article display**: Profile pages show articles in the same card format as the main feed, maintaining visual consistency throughout the app

### Tag Filter UI

- **Improved tag filter interface**:
  - Moved tag filtering to a collapsible sidebar panel with clear "Show articles about" section
  - Made it easier to see which tags are selected
  - Maintained tag functionality while making the UI cleaner and less overwhelming

### Design System Foundations

- **Modern color palette**: Updated from the original green/gray to a blue/mint scheme that feels more contemporary and has additional contrast, color is used consistenly based on functionality
- **CSS variables implementation**: Styling is implemented through CSS variables for easy theming and component reuse
- **Professional polish**: Added details like proper border radii, consistent shadows on cards, refined color usage, and breadcrumb navigation throughout
