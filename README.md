This is a tech test for Montra.

To run this tech test please clone the repo, run `yarn install`, and then create a `.env.local` file with the same format as the `env.example` file with the details sent to you.

Then you can run the project using `yarn dev`.

This project assumed a number of things leading to design choices you may not chose to replicate if this was intended for production.

1. 1 user was assumed. This means that no auth was added and row level security was not enabled in Supabase. This also meant that localstorage was used when the user updates there profile photo as to implement remotely stored avatars without having users would be a poor design and security choice.

2. Redux was used to show knowledge of the library. A project this small would not need a global state management package. If one was desired, then something small like [Jotai](https://jotai.org/) would be a better choice.

3. I wanted to show that I could pick up Supabase easily. I'd like to spend a more time working out how best to integrate it with TypeScript and where to do error handling.

4. In relation to above, I would use a library like [Zod](https://github.com/colinhacks/zod) to validate responses from Supabase where needed.

5. I did not include testing due to time constraints. If you'd like to see this I am happy to include some in the future.

6. If you'd like to see a more 'enterprise' level tech test I have done please look at [this repo](https://github.com/MLaidlawScott/waracle-test). This includes: Nx, Next, Storybook, RTK, RTKQuery, Chakru-UI, Postgres, Cypress, and Prisma.

7. Finally, I did not spend too much time styling the project. Tailwind is something I have recently started picking up and I am condfident I can easily transition my knowledge from traditional css modules to Tailwind. However, I did not think it would be a good use of time in this case.

## Summary

I spent around 10 hours on this tech test. I implemented Supabase and ThreeJs to meet the requirements having never used these libraries before. I achieved adequate styling using Tailwind, with which I have limited experience. Frequent and appropriately sized commits were used. I am happy to tidy things up or add more if you like.

<sub><sub>And just because its trendy...ChatGPT was used to generate the summary of Frank Herbert.</sub></sub>
