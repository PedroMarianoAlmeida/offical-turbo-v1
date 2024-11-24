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

#### Add credit count to use features

- [X] Setup firebase
- [X] Create table with user and count by day
- [X] Increase the number when use again in the same day
- [X] Start the counting again when the previous usage was in another day
- [ ] Check user count and stop user to take some action after reach limit (on server side)
- [ ] Implement the "with credit" role
- [ ] Create a Protected in @repo/next-auth but with fallback component instead of redirect (keep both)
- [ ] Show fallback on frontend when user reach the limit

#### Interaction with AI (object in the format that I want and Image)

#### Save user history

### Debit tech

- Add all shadcn components on package.json
- Add dark theme on Next 15 app layout (the same of Shadcn?) - While doesn't have I am applying the shadcn package after the app css
- Replace the dark/light component, the Turborepo website is nicer
- Check if it is possible add the workspaces in a different json
- Role base protected page
- In @repo/next auth, create a auth middleware to work like the Protected component
- Improve Shadcn header (there is some CSS issues)
  - It is not fixed on top
  - Fix alignment and spaces issues
  - The Group with Avatar and Menu is weird at the moment
  - The dark theme and itens menus should have a animation that I saw in docs (https://ui.shadcn.com/docs/components/menubar)
  - Maybe some code refactor, use react composition instead of those props (like shadcn approach on his own component files)
- Add unity test (the header deserves a unit test to check auth and items conditions)
- Check how to extract all Themes (auth, dark mode and query Tan Stack) to be reusable and easier to set up a new app project
