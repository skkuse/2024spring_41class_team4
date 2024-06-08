## Getting Started
1. To get started with this project, clone repository
    ```bash 
    git clone https://github.com/skkuse/2024spring_41class_team4.git
    ```

2. For easy development, download VSCode and **reopen in container** in this project

3. Run server
    ```bash
    cd api
    python manage.py runserver
    ```

## API 
This API project provides APIs for user management including signup, login, and logout functionalities.

### API document
The API documentation is available via Swagger UI:
- URL: `localhost:8000/api/swagger/`

### Dependencies
- Django
- Django REST Framework
- drf-yasg (for Swagger documentation)

### Configuration
- Database: MySQL
- API base endpoints: `/api/`
- API documentation (Swagger UI): `/api/swagger/`