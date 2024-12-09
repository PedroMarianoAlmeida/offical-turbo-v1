# Official Turborepo V1

Pedro Almeida official monorepo, based in tailwind example.

## Code guide

- Order of imports: external packages, internal packages, elements inside the project
- Files smaller than 100 lines
- Avoid export default (keep import name sync with the real name)
- Wrap all responses in a object (helps intellisense)
- The try/catch should use `@repo/core-main/asyncWrapper`
- Files and folder names in `kebab-case`
- `src`: All code generate after initial boilerplate

#### For APPs

- `src/config`: The objects that uses the env, and are invoked to perform API actions

#### For packages

- The exports on package.json should reflect folder structure (to facilitate to check if some is missing)
- If some `src/config` is necessary on the APP, add it on the package readme
- `src/adapters`: Something from the package to a `core` package

## More

- [Projects](./docs/projects.md)
- [Todo](./docs/todo.md)
- [History](./docs/history.md)
