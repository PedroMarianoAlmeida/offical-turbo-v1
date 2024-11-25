# Official Turborepo V1

Pedro Almeida official monorepo, based in tailwind example.

# Projects

- Original

  - [example doc](http://localhost:3010/)
  - [example web](http://localhost:3011/)

- Next 15
  - [Playground](http://localhost:3012/)

## TODO

### In order

#### Interaction with AI (object in the format that I want and Image)

- [x] Create package to handle with AI
- [x] Receive answer of prompt
- [x] Integrate with firebase (using the actionWithDailyRateLimit)
- [ ] Receive answer of image
- [ ] Receive answer as an Object (double check the response to check if has the props that I asked, if no automatically goes back to AI to get a response on the right format)

#### MVP - Better Image Project

Receives a prompt for an image, but instead of creating right away, send to a text prompt to check how be more specific with the image, then creates both images

#### After MVP

##### Save user history

- Share option?

##### Payment

### Debit tech

- Add all shadcn components on package.json
- Add dark theme on Next 15 app layout (the same of Shadcn?) - While doesn't have I am applying the shadcn package after the app css
- Replace the dark/light component, the Turborepo website is nicer
- Check if it is possible add the workspaces in a different json
- Role base protected page
  - For role will be necessary backend integration to verify the roles - So roles should not be in CoreSession, and it will be necessary a CoreSessionWithRoles, integrating next-auth and firebase (or other systems)
- In @repo/next auth, create a auth middleware to work like the Protected component
- Improve Shadcn header (there is some CSS issues)
  - It is not fixed on top
  - Fix alignment and spaces issues
  - The Group with Avatar and Menu is weird at the moment
  - The dark theme and itens menus should have a animation that I saw in docs (https://ui.shadcn.com/docs/components/menubar)
  - Maybe some code refactor, use react composition instead of those props (like shadcn approach on his own component files)
- Add unity test (the header deserves a unit test to check auth and items conditions)
- Check how to extract all Themes (auth, dark mode and query Tan Stack) to be reusable and easier to set up a new app project
- incrementUserCountUsage on firebase package should not be exported (after create some useful action to test remove it)
- Refactor packages/next/next-auth/src/protected.tsx to have a base component and both using that
- Check the comment on apps/next-15/next-15-playground/src/app/protected/page.tsx when start creating the real app
- Add on firebase package readme, the steps to get the environment variables

## History

### package-apps-structuring

- Separate the Original code in separate folder
- Set fix port to each project
- Create a new Next 15 app
- Create shadcn package
- Implement dark/ligh theme (with shadcn)
- A core package (to put for instance a react with children that I use everywhere)
- Next-auth adapters
- Finish next-auth adapters (redirect) and components
  - Check incognito lib to use the same nomeclature in the redirect - Actually I believe the protected wrapper is cleaner, instead of the withAuthenticator HOC, it is better create a middlewhere for Next, but I won"t do that
  - The redirect only for authenticated and public, other roles will be implemented in another time
- Connect auth with shadcn (using the core adapter)
- Fix header TS, the auth items should be accepted only when the auth prop was sent

### Add credit count to use features

- [x] Setup firebase
- [x] Create table with user and count by day
- [x] Increase the number when use again in the same day
- [x] Start the counting again when the previous usage was in another day
- [x] Check user count and stop user to take some action after reach limit (on server side)
- [ ] Implement the "with credit" role - I change my mind, it is better check everytime (the role need to be stored somewhere, and it will read the daily count to update this another database... so it is bad idea)
- [x] Create a Protected in @repo/next-auth but with fallback component instead of redirect (keep both)
- [x] Show fallback on frontend when user reach the limit
