# Property Listings App - Minhazur Bhuiyan

## [Click for Happy-Path Test] (https://drive.google.com/file/d/1IbconYaBmmKIHJmd1U4IjZcOl_9lw8GJ/view?usp=drive_link)

## Edge case
One edge case in the UI is inputting a non-float/int as a price, but the form protects against it, as well as the typing is enforced downstream.

## How to run locally
The frontend and backends are run on Docker containers. You can use any of the following commands to run this application locally:
    
    - `docker compose up --build` runs the application quickly if cache exists
    
    - `docker compose up --build --no-cache` runs without cache, useful if part of the previous build isn't needed

    - Optionally, you can also add the `-d` flag to either of the above commands in terminal to regain control of it instead of keeping logs open. In this case, you can use `docker compose logs -f` to view logs again.

Once the docker containers are running, access the web application via `localhost:3000` in your browser of choice.

## Design choices and tradeoffs
Overall, I had established a modular file structure with comprehensive packages to ensure this project is easy to follow with little context, especially if this work is ever continued. Admittedly, keeping the structure a bit more monolithic would be easier to skim through, as the functionalities of this app are pretty simple. As a result of this design, I added some extra functionalities to support creating test data, clearing the database, and updating or removing indicvidual rows from the database.  

## Use of AI tools
I primarily used ChatGPT to quickly generate a lot of the frontend scaffolding, though I made sure to start writing the code for basic layouts while using AI to be a second pair of eyes by helping me ensure I was using the right typings in the right places. I also used AI to springboard some design choices, such as keeping components more self-contained. ChatGPT was usually laying out a main page with every component written in one place. I felt that it was much cleaner and easy to follow by ensuring each component and dependency was separated out enough so that each file had a very clear mission. At a certain point, it felt like I was blindly pasting code snippets into ChatGPT so it could quickly debug for me (I was starting to panic as I rushed). After a bit, I decided to slow down and go line-by-line on my own to isolate problem areas and potential causes of bugs and errors. This approach was far more productive as I just used AI to discuss and verify ideas for solutions and fixes I had in mind (or to gain clarity in cases where I knew what I wanted to do, but maybe could not recall the syntax or was unclear on certain best practices).

Additionally, AI was used to generate example property data dictionaries, as well as the test files, which I had walked through, as well. As I finished up various sections, I would also consult ChatGPT on ways to ensure my code is cleanly organized with respect to the next section. 


## What I would do differently
For the sake of testing and cohesion, I ended up keeping the application to one page (though I addressed all the requested endpoints). With a bit more time, I would have ensured the core features were on separate pages, but I am hoping the modals provide a user-friendly experience. I would also opt to manually set the `id` field for property listings, perhaps to the listing's title or a combination of the title and maybe a timestamp or something unique. Without the full scope of this project, I figured allowing duplicate titles would be fine for now, so simply incrementing the id key would be a (mostly) harmless way of storing each new row. 

## AI Usage Log
## Top Prompts:

# 1.) Why am I receiving error 429 from my AI summary response? OpenAI request failed: Error code: 429 - {'error': {'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.', 'type': 'insufficient_quota', 'param': None, 'code': 'insufficient_quota'}
   
    - ChatGPT explained the error I was seeing about my quota being used up based on console logs also saying the same. I was very confused, as my usage stats showed $0. Ultimately, a one-time payment for API credits unblocked me. 

# 2.) echo $OPENAI_API_KEY is blank

     - I was having some issues with my API key, as the old one I was using was not being overwritten. Fortunately, I was able to succesfully overwrite it. 

# 3.) Write some unit tests for this application

    - Extremely convenient, all I need to do is review and add/remove based on my use case