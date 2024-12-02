# Official Turborepo V1

Pedro Almeida official monorepo, based in tailwind example.

# Projects

- Last used is 3014

## Next 15

- [Playground](http://localhost:3012/)
- [Better Image](http://localhost:3014/)

## Chrome Extensions

- [Flappy Bird](http://localhost:3013/)

## Original

- [example doc](http://localhost:3010/)
- [example web](http://localhost:3011/)

## Code guide

- Order of imports: external packages, internal packages, elements inside the project
- Files smaller than 100 lines
- The exports on package.json should reflect folder structure (to facilitate to check if some is missing)

## TODO

### In order

#### MVP - Better Image Project

Receives a prompt for an image, but instead of creating right away, send to a text prompt to check how be more specific with the image, then creates both images

#### After MVP

- [ ] Ju feedbacks
  - After login, redirect to dashboard
  - Improve text (remove the =D, keep formal)
  - Generate image on Step 3 (I will not implement, because maybe the user wants only a new prompt instead of generate image)
  - Their initial ideas have false flag of "against policy", maybe remove this from response and leave for image generator handle
- [ ] Improve the Reference artwork - It is not clear that it is a link, and the google result is not useful - And even if the array is empty, the art reference is there
  - Query
  - Style
- [ ] Upgrade Step 2 Form
  - [ ] Add size select - Fix on form and on generateImage
  - [ ] Add the Step 1 text as remainder
  - [ ] Add a button of "Keep suggestion" and the the placeholder will became the answer
  - [ ] Check Controlling an input with a state variable error
- [ ] Upgrade Step 3
- [ ] Add a Copy prompt button (then the user will be able to get the prompt and generate the image somewhere else)
- [ ] Create About page
- [ ] Create home page (or just Add the History first, because the plan is to put a feed of created images there)
- [ ] Improve loading dashboard page - On LoadingWrapper - Maybe with shadcn in his package?
- [ ] Improve error pages - On ErrorWrapper - Maybe with shadcn in his package?
- [-] Save the Step1 AI response on Cookies, if is there not run AI again - I face NextJs issues to set the cookie
  - I change my mind, actually but a button of (run again, for cases the user doesn't like the AI response)
- [ ] Add a "run again" in each step that has AI response (to generate a new response - New question, new revised prompt and new images)
- [ ] Add i18n (for Portuguese) - Check the prompts, I hard coded that the answer should be in english
- [ ] The generateImage is using 2 credits (one per image) - And the promise all is on step4... maybe the "generate image" should generate both images... but I had problems of Promise All and my async wrapper (that is required on actionWithDailyRateLimit), so I leave this way for now
- [ ] Add a Error page (when there is unexpected error, not the response false)
- [ ] Clear the cookies after finish step 4? - Maybe

##### Save user history

- When create the image, save the image in database, get the string name and put it in 2 places:
  - User history
  - General history
  - So the place to see the image will be in /result/resultId
- Share option
  - The resultId
- User can see all images create in User history
- A feed with all images generated in homepage

##### Payment

### Debit tech

- Check how to extract all Themes (auth, dark mode and query Tan Stack) to be reusable and easier to set up a new app project - Do this just after the "Better Image" Project
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
- Create the reachLimit validation in a single place (it is a simple comparison, but I did differently in layout and server side... so just a function of return userUsage > limit)

### Future features

- The Progress bar has links to the previous page steps

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

#### Interaction with AI (object in the format that I want and Image)

- [x] Create package to handle with AI
- [x] Receive answer of prompt
- [x] Integrate with firebase (using the actionWithDailyRateLimit)
- [x] Receive answer of image
- [x] IncrementUserCountUsage on firebase package should not be exported (after create some useful action to test remove it)
- [x] Receive answer as an Object (double check the response to check if has the props that I asked, if no automatically goes back to AI to get a response on the right format) - No need, it better

#### Better Image AI

- [x] Setup the project with dark theme, auth and firebase
- [x] Protect dashboard for authenticated only - Redirect to homepage
  - [-] Remove the auth from Protected, instead pass the Session as props (then I can pass the same session for Protected by redirect and with fallback, and remove the complexity from those elements)
    - Actually it was a bad idea, when I try it the Protected children doesn't know anymore that the hasUser from core session is true, so it will require extra if(hasUser) all over the place - But in the current way is kind of useless, because a cannot send from a layout to the page
- [x] Check daily usage to enable use the tool
- [x] Create the first form that receives the original prompt
- [x] Send the question for next step, then retrieve for server side to do the AI thing and be ready for next step
- [x] Send the original prompt to object type chatGPT, the response should have
  - Follow up questions: string[]
  - Is valid input: boolean - It is OK with the politic of generate image
  - Suggest styles: string[] - If the "has style" is false, send suggestions of styles for the image - If it is empty means there is style already on description
  - Similar famous images - string[]
- [x] Create the new form with the info receive by ai, with the ai response, add a field for free text
- [x] Send again all the data and receive a revised prompt
- [x] Send the revised prompt to the user to final adjusts
- [x] Send to generate image the original prompt and the final prompt to generate image
- [x] Show the images to user - Remove all size related code (do it again after MVP)
- [x] Add the Use Again and refresh the page (check daily usage) - Fix inconsistencies between server and client side
- [x] Create a happy path with buttons
- [x] Deploy
- [x] Improve general UI
  - [x] Create a Step Progress UI (Put in new-image/layout)
  - [x] Add Default padding (at least on forms)
  - [-] Add max width on forms (and centralize?) - After the container I don't think that it is necessary anymore


#### Tech Debit

- Add all shadcn components on package.json (this will solve by himself when I need to use some component)
