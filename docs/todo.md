# TODO

## In order

### MVP - Better Image Project

Receives a prompt for an image, but instead of creating right away, send to a text prompt to check how be more specific with the image, then creates both images

- [ ] After login, redirect to dashboard (at the moment for new image is better, update after have history)
- [ ] Add a "run again" in each step that has AI response (to generate a new response - New question, new revised prompt and new images)

### After MVP

- [ ] Check if it is possible improve the Query on Similar artwork
- [ ] Upgrade Step 2 Form
  - [ ] Add size select - Fix on form and on generateImage
  - [ ] Check Controlling an input with a state variable error
- [ ] Improve loading dashboard page - On LoadingWrapper - Maybe with shadcn in his package?
- [ ] Improve error pages - On ErrorWrapper - Maybe with shadcn in his package?
- [ ] Add i18n (for Portuguese) - Check the prompts, I hard coded that the answer should be in english
- [ ] Clear the cookies after finish step 4? - Maybe

#### Save user history

- When create the image, save the image in database, get the string name and put it in 2 places:
  - User history
  - General history
  - So the place to see the image will be in /result/resultId
- Share option
  - The resultId
- User can see all images create in User history
- A feed with all images generated in homepage
- After login goes to Dashboard instead of New Image

#### Debit tech (Better Image AI)

- The apps/next-15/better-image-ai/src/app/dashboard/new-image/step2/Step2Form.tsx is awful

#### Payment

## Debit tech

- Check how to extract all Themes (auth, dark mode, query Tan Stack, Toast) to be reusable and easier to set up a new app project - Do this just after the "Better Image" Project
- Check Better Image - New Image folders, there is a code pattern of check user, get cookies, run action, send result to a child component... this logic should be extracted to be reused - Maybe a Next-core package (the Layout thing can be in the same project)
- Add dark theme on Next 15 app layout (the same of Shadcn?) - While doesn't have I am applying the shadcn package after the app css
- Replace the dark/light component, the Turborepo website is nicer
- Check if it is possible add the workspaces in a different json
- Role base protected page
  - For role will be necessary backend integration to verify the roles - So roles should not be in CoreSession, and it will be necessary a CoreSessionWithRoles, integrating next-auth and firebase (or other systems)
- In @repo/next auth, create a auth middleware to work like the Protected component (maybe put on Layout is good enough)
- Improve Shadcn header (there is some CSS issues)
  - It is not fixed on top
  - Fix alignment and spaces issues
  - The Group with Avatar and Menu is weird at the moment
  - The dark theme and itens menus should have a animation that I saw in docs (https://ui.shadcn.com/docs/components/menubar)
  - Maybe some code refactor, use react composition instead of those props (like shadcn approach on his own component files)
  - When we are in the page should update the style (maybe a new component)
- Add unity test (the header deserves a unit test to check auth and items conditions)
- Refactor packages/next/next-auth/src/protected.tsx to have a base component and both using that
- Check the comment on apps/next-15/next-15-playground/src/app/protected/page.tsx when start creating the real app
- Add on firebase package readme, the steps to get the environment variables
- Check if is possible pass props from Layout to Page in Next (if, yes, pass the userData when used the Protected from @repo/next-auth)
- Documented the use for ProtectedWithFallback and userCount
- Solve download button issue: Access to fetch at '' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
- Check tokens before try to generate the AI responses

## Future features

- The Progress bar has links to the previous page steps
- [ ] Upgrade packages/react/shadcn/src/composition/paragraph-skeleton.tsx to be more flexible with sizes and number of "words" - And add the flex wrap padding, etc
