# Udacity Project: My Store Front-End
Udacity Project: My Store
contact: **gerardo@onetechdude.com**

<div id="top"></div>

## About Project

This project provided a web service store cart systems for customer orders.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

The web service was based on Angular + TypeScript Syntax.

## Getting Started

### 1. Installation Steps

- Download/Clone Repo to Local Machine
- Open terminal root directory of project folder
- run: **npm install** to install all project dependencies.
- Install **http-server** tool for testing distributed/prod code. (**ex. npm i http-server**)

### 2. NPM Commands

```
    "start": "ng serve",
    "build": "ng build --prod",
    "lint": "ng lint",
    "format": "ng lint --fix"
```

- **format**: The command will lint format the code based on eslint rules ('airbnb')
- **lint**: Report lint errors identified within the code.
- **build**: Build distribution version of the project for production install.
- **start**: Start the project in development mode for code testing.

### 5. Run Development Version

- To run the project for development run: **npm run start**
- Via browser go to **http://localhost:4200**

### 6. Run Production Version

- To run the project for production run: **npm run start**
- Execute the **http-server** tool within the project folder. (**ex. http-server dist**)
- Via browser go to **http://localhost:8080**

## Project Structure

### Components

#### app.component
```
Description: This root component of the project this also also the location of the main top navigation bar for the web store.
```

#### catalog.component
```
Description:  Provider of the product catalog view based on the data collected from GET ./api/products/
```

#### catalogitem.component
```
Description:  Provides the html elements for the product list display. (@Input Example)
```

#### catalogdisclaimer.component
```
Description:  Displays disclaimer message which can be hiden from parent component. (@Output Example)
```

#### login.component
```
Description: Provides users login form for user authentication. Authenticared user is required to process orders.
```

#### notfound.component
```
Description: Provides 404 Page Not Found message when users try to reach a page that does not exist or that is invalid format.
```

#### product.component
```
Description: Provides detail information for a given product based on ID.
```

#### cart.component
```
Description: Display the pending items users ready for purshase. Also users can authenticate if needed aas well clear the cart.
```

#### success.component
```
Description: Display of final confirmation page after order has been processed.
```

### Services

#### alerts.service
```
Description: Provide of UI notifications. (Info, Warning, Error)
```

#### cart.service
```
Description: Provides temporary data retention of cart items selected by the user for order processing. This data gets cleared 
when a order is completed.
```

#### api.service
```
Description: Root location for all API endpoints utilized by the web application. 
```

### Routes

```
    { path: '', redirectTo: 'catalog', pathMatch: 'full' }, -> When no page is specified routes user to catalog page.
    { path: 'catalog', component: CatalogComponent },       -> Router pointer for the catalog page.
    { path: 'product/:id', component: ProductComponent },   -> Router pointer for the product detail page.
    { path: 'login', component: LoginComponent },           -> Router pointer for the login page.
    { path: 'cart', component: CartComponent },             -> Router pointer for the cart display page.
    { path: 'success', component: SuccessComponent },       -> Router pointer for the catalog 404 Page.
    { path: '404', component: NotfoundComponent },          -> When a invalid page is used the user will be redirected to 404 Page Not Found.
    { path: '**', redirectTo: '/404' }
```

## Other Notes

- This service does not have an API backend. It does have mock api service to test UI mechanics.
- You can test user authentication mechanics by using the below usernames.
  
```
username: dummy
note: You can use any password. This will emulate a successful authentication. If you try any other username this will emulate a unsuccessfull authentication.
```


## Contact
Antonio Garcia
Mail: **gerardo@onetechdude.com**

<p align="right">(<a href="#top">back to top</a>)</p>
