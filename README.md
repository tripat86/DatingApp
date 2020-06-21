# DatingApp

Demo

Azure published - https://dappdemo.azurewebsites.net/ - Login with username as "lola" and password as "password"

![DatingApp Demo](DatingApp-SPA/src/assets/DatingApp_Demo.gif)

Dating App ( Angular 9 / .Net WebAPI Core (v 3.0) / Entity Framework core ( v 3.0) / SQL Server)

- Integrated 3rd party components like Alertify.js as service wrapper into the Angular application

- Used Visual Studio code effectively to improve workflow

- Used AutoMapper in webapi core.

- Drag and drop photo upload integration into a cloud platform (cloudinary)

- Private messaging Chat system

- User can like profiles of other users( of opposite sex ) and can recieve likes from other users as well. Implemented Many-To-Many relationships.

- Filtering, sorting and paging of data

- Authentication using JWT Authentication tokens for securing Webapi's.

- Handled errors in the API and the SPA

- Persist data using Entity Framework Core.

- Used Repository Pattern, created generic Repository for adding another layer of abstraction over Entity Franework. 

- Common error handling in Angular and .net core to show webapi errors on client app. Used Http Interceptors.

- ngx-loader to show loader on each http request and hide loader on http response.

- Implemeted Routing. Secured routes with CanActivate and CanDeActivate guards.

- Resolvers to pass data in route.

- Used Angular Reactive forms.

- Implemented lazy loading to load related navigation properties in entity so Entity Framework core loads navigation properties when it needs them.

- Deployed to Azure
