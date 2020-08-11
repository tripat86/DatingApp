# DatingApp

Demo

Azure published - https://dappdemo.azurewebsites.net/ - Register with your information and check the app flow OR you can just login with an existing user lola/password

![DatingApp Demo](DatingApp-SPA/src/assets/DatingApp_Demo.gif)

Dating App ( Angular 9 / .Net WebAPI Core (v 3.0) / Entity Framework core ( v 3.0) / SQL Server)

- Identity and Role Management

- Persist data using Entity Framework Core.

- Used Repository Pattern, created generic Repository for adding another layer of abstraction over Entity Franework. 

- Common error handling in Angular and .net core to show webapi errors on client app. Used Http Interceptors.

- Used AutoMapper in webapi core.

- Integrated 3rd party components like Alertify.js as service wrapper into the Angular application

- Authentication using JWT Authentication tokens for securing Webapi's.

- Implemented lazy loading to load related navigation properties in entity so Entity Framework core loads navigation properties when it needs them.

- Filtering, sorting and paging of data

- Drag and drop photo upload integration into a cloud platform (cloudinary)

- Private messaging Chat system

- User can like profiles of other users( of opposite sex ) and can recieve likes from other users as well. Implemented Many-To-Many relationships.

- Global error Handling in the API and the SPA.

- ngx-loader to show loader on each http request and hide loader on http response.

- Implemeted Routing. Secured routes with CanActivate and CanDeActivate guards.

- Resolvers to pass data in route.

- Used Angular Reactive forms.

- Deployed to Azure

- HTTPS certificate applied
