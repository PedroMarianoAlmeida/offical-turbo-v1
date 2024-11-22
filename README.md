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

- Implement authentication (with next-auth)
- Connect auth with shadcn (not direcly, create the own interface and adapters)

## For future

- Add all shadcn components on package.json
- A core package (to put for instance a react with children that I use everywhere)
- Add dark theme on Next 15 app layout (the same of Shadcn?) - While doesn't have I am applying the shadcn package after the app css
- Replace the dark/light component, the Turborepo website is nicer

## Done

- Separate the Original code in separate folder
- Set fix port to each project
- Create a new Next 15 app
- Create shadcn package
- Implement dark/ligh theme (with shadcn)
