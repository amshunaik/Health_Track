# Health Challenge Tracker

Deployment link : https://amshunaik.github.io/Health_Track/

### About the Application :
-  This project was generated with Angular CLI version 18.1.0.
-  Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.
## Application setting
- install vs code
- install node.js recent version
- Create a new folder and open the terminal and write following command :
      - npm install -g @angular/cli
      - ng version
      - ng new Demo
- To start the deployment server write command
      - ng serve
- To create a Component
      - ng generate component Health/first
- To create a Service
     - ng generate service health
- Configure Routes in app.routes.ts

## Assumptions :
- Initially stored the dataset in Data list in localStorage using setItem method.
-  Routes created :

      * '/'-> redirect to First page through which the user can add his workout plan
      * '/table' -> redirect to healthtable page , which represent the workout list in tabular form with filters
      * '/graph -> redirect to the visualization page to visualize the progress of any person by workout time for different workout types.
- In the First page :
      - Handled the case if the user try to add workout without filling all the entries with a alert message.
      - Handled the case if the same user is adding his workout plan of a workout type with 2 conditions :
  
            * If the newly created plan's workout type already present in the list then had incremented the workout time ( added time)
            * If the newly created plan's workout type not present in the list then pushed it in ther users workouts list[].
- In the Second page ( where all the list items are represented in tabular form '/Table' )
  
            * Handled the filters and the workout list seperately for both search the the select type filter.
- In the third page ( The visualization graph part '/graph' )
  
            * Filtered out the required data for graph for that particular person whole progress the user want to vsualize
  
## Coverage Summary 

* Statements   : 100% ( 122/122 )
* Branches     : 100% ( 19/19 )
* Functions    : 100% ( 23/23 )
* Lines        : 100% ( 115/115 )

================================================================================

| File                    | Statements | Branches | Functions | Lines |
|-------------------------|------------|----------|-----------|-------|
| src/app/app.component.ts | 100%       | 100%     | 100%      | 100%  |
| src/app/health.service.ts | 100%       | 100%     | 100%      | 100%  |

For a detailed report, you can open the [coverage report](./coverage/demo/index.html) and [coverage report main](./coverage/demo/app/index.html) in your browser.
