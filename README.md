# Bean Scene Ordering System Frontend

[🖊️Link to Bean Scene's Reservation System Repository](https://github.com/teleported-cat/Bean-Scene-Reservation)

[💽Link to Backend Repository](https://github.com/teleported-cat/BeanSceneOrderingAPI)

[🎥Video Demonstration of this System](https://www.youtube.com/watch?v=MjX5MCQAlOU)

A mobile application designed for waitstaff & kitchen staff to place, track, and manage food orders within a restaurant. The application is developed using React Native, ASP.NET API, and MongoDB.

This system was developed for a fictional client which is a restaurant called "Bean Scene" and follows the requirements and business rules they laid out.

This project was developed over course of ~18 weeks from July 2025 to November 2025, with a majority of the progress made in the latter half.

## Workflows

When a user opens the application, it will ask for their credentials to authenticate & authorise them. The credentials must match the those of a staff account in the system and brings the user to the dashboard for their role.

For staff, they can access a search menu containing information for all menu items in the restaurant and the ability to place orders & update their statuses.

For managers, they can access everything a staff member can, as well as the ability to manage the menu items, staff accounts, and view reports that visualises the order data.

In the items tab, the user can view all menu items/categories and can create/edit/delete them. Each item has a name, description, image, price, allergens, category, and flags if the item is available, gluten-free, or vegan/vegetarian.

In the staff tab, the user can view all staff accounts in the system, which each account consists of a first/last name, username, email, password, and role (which can be staff or manager). A manager can update an account's details, change password, delete it, or create a new one. The password is automatically hashed using BCrypt.

In the orders tab, the user can view all orders from a glance including the table number, order's name, date & time of the order, and its status. By tapping on the status, the user can update the status of an order (Pending, In-progress, Completed, Cancelled). The user can view the details of an order can view the menu items included in it. When creating an order, the user can specify the quantity of an item & add it to the cart; on the checkout screen, the user can remove items from the order, view the total cost, and specify the order's name, table, and any additional notes.

In the reports tab, the user can view graphs that summarise the composition of orders by status for the current day and view the number of orders over the last 7 days.

In the search tab, the user can search for any menu item in the system either using a text search bar, category, or both. If the user is a manager, they can access all item actions (view, edit, delete), while if they are staff, they can only view.

## Offline Functionality

Whenever data is successfully retrieved from the database, the frontend saves it to the device using AsyncStorage. If the internet connection is lost while using the application, it goes into offline mode which retrieves the data saved to the device rather than the backend. Users won't be able to modify the data, but can still view items, categories, staff, orders, and reports.

## Technology/Tools Used

The system consists of three parts: the frontend which uses React Native, the backend which uses ASP.NET Core API, and MongoDB for the database.

Swagger UI was used to document and test the API endpoints.

During the design phase of development, the user interface was created & prototyped in Figma, which was used to guide the interface development greatly.

## UI

The application was designed for both phone & tablet screens with a responsive user interface, primarily with flexboxes.
