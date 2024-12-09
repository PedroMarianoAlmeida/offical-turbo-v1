# Official Turborepo V1

Pedro Almeida official monorepo, based in tailwind example.

## Code guide

- Files smaller than 100 lines
- Files and folder names in `kebab-case`
- `src`: All code generate after initial boilerplate

#### For APPs

- `src/config`: The objects that uses the env, and are invoked to perform API actions

#### For packages

- Order of imports: external packages, internal packages, elements inside the project
- The exports on package.json should reflect folder structure (to facilitate to check if some is missing)
- `src/adapters`: Something from the package to a `core` package

## More

- [Projects](./docs/projects.md)
- [Todo](./docs/todo.md)
- [History](./docs/history.md)
