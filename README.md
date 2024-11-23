# Official Turborepo V1

Pedro Almeida official monorepo, based in tailwind example.

# Projects

- Original

  - [example doc](http://localhost:3010/)
  - [example web](http://localhost:3011/)

- Next 15
  - [Playground](http://localhost:3012/)

## TODO

## In order

## For future

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
- Add unity test (the header deserves a unit test to check auth and items conditions)

## Done

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
