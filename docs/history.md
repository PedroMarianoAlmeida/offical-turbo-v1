# History

## package-apps-structuring

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

## Add credit count to use features

- [x] Setup firebase
- [x] Create table with user and count by day
- [x] Increase the number when use again in the same day
- [x] Start the counting again when the previous usage was in another day
- [x] Check user count and stop user to take some action after reach limit (on server side)
- [ ] Implement the "with credit" role - I change my mind, it is better check everytime (the role need to be stored somewhere, and it will read the daily count to update this another database... so it is bad idea)
- [x] Create a Protected in @repo/next-auth but with fallback component instead of redirect (keep both)
- [x] Show fallback on frontend when user reach the limit

### Interaction with AI (object in the format that I want and Image)

- [x] Create package to handle with AI
- [x] Receive answer of prompt
- [x] Integrate with firebase (using the actionWithDailyRateLimit)
- [x] Receive answer of image
- [x] IncrementUserCountUsage on firebase package should not be exported (after create some useful action to test remove it)
- [x] Receive answer as an Object (double check the response to check if has the props that I asked, if no automatically goes back to AI to get a response on the right format) - No need, it better

### Better Image AI

- [x] Add SignIn button on homepage
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
- [x] Improve text (remove the =D, keep formal) - Put all copy in a external file, this will be useful on i18n - TOO BORING OMG
- [x] Upgrade Step 2 Form
  - [x] Improve the Reference artwork - It is not clear that it is a link, and the google result is not useful - [x] And even if the array is empty, the art reference is there
  - [x] Add the Step 1 text as remainder
  - [x] Upgrade Step 4
  - [x] Put images side by side
- [x] Improve header
- [x] Add something on Home Page
- [x] Add a Error page (when there is unexpected error, not the response false) - It is not pretty but it is done
- [x] Add a button of "Keep suggestion" and the the placeholder will became the answer
- [x] Create home page (or just Add the History first, because the plan is to put a feed of created images there)
- [x] Add a Copy prompt button (then the user will be able to get the prompt and generate the image somewhere else) on Step 3
- [-] Save the Step1 AI response on Cookies, if is there not run AI again - I face NextJs issues to set the cookie
  - I change my mind, actually but a button of (run again, for cases the user doesn't like the AI response)
- [x] After click in the buttons take a time to redirect, it is possible add a Loading too?
  - [x] Done for step 1
  - [x] Done for step 2
  - [x] Done for step 3
- [x] Improve loading individually by step on New Image
  - [x] Improve Loading page from Step 1 (not sure if it is working)
  - [x] Improve Loading page from Step 2
  - [x] Improve Loading page from Step 3
  - [x] Improve Loading page from Step 4
  - [x] Add Daily Usage
  - [-] Ju feedbacks
  - Generate image on Step 3 (I will not implement, because maybe the user wants only a new prompt instead of generate image)
  - Their initial ideas have false flag of "against policy", maybe remove this from response and leave for image generator handle - No one else complains about that
- [x] Create About page
- [-] The generateImage is using 2 credits (one per image) - And the promise all is on step4... maybe the "generate image" should generate both images... but I had problems of Promise All and my async wrapper (that is required on actionWithDailyRateLimit), so I leave this way for now - Makes sense this action be more expensive, so it is a feature, not a bug =P

#### Migrate to MongoDB Prisma feature:

- [x] Copy the behaviour of packages/backend/firebase/src/userCount.ts in a new prisma package
  - Actually this doesn't works as expected, the prisma should be in the APP
- [x] Remove everything from Firebase package and use the local prisma
- [x] Add the consent checkbox on Step 1
- [x] On step 3 put a button to revert to aiGeneratedPrompt

### Tech Debit

- [x] Remove auth menu background
- Add all shadcn components on package.json (this will solve by himself when I need to use some component)
- Create the reachLimit validation in a single place (it is a simple comparison, but I did differently in layout and server side... so just a function of return userUsage > limit)

## After MVP

- [x] Improve loading dashboard page - On LoadingWrapper - Maybe with shadcn in his package?
- [x] Add Download Image button
- [-] Check if it is possible improve the Query on Similar artwork - I remove similar

## Migrate to mongo DB

- [x] Small bug: On step 3, if the user toggle back for ai prompt after change it, should clean the "user prompt field" (only if send this way)

- When create the image, save the image in database, get the string name and put it in 2 places:
  - User history
  - General history
  - So the place to see the image will be in /result/resultId
  - User can see all images create in User history
- A feed with all images generated in homepage
- After login goes to Dashboard instead of New Image
