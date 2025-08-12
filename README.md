Front-end: A React application that provides a simple login page and two protected pages: a dashboard and a profile page.

Authentication: The application must use Azure Single Sign-On (SSO) for user authentication. The login page should redirect users to the Azure login page. Upon successful authentication, the user should be redirected back to the dashboard.

Back-end and Database: After a successful SSO login, your application should store the user's data (such as their name and email from Azure) in a PostgreSQL database. The dashboard and profile pages should retrieve and display this user-specific data from the database.

Containerization: The entire application stack (React front-end, Node.js back-end, and PostgreSQL database) must be containerized using Docker. Provide a single docker-compose.yml file that allows me to build and run the entire application with a single command (docker-compose up).