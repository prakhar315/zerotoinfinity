# Admin Interface Database Connection Guide

This guide will help you understand how the admin interface connects to the database and how to troubleshoot any issues.

## How the Database Connection Works

1. **Backend API**: The Django backend provides API endpoints for managing topics and resources.
2. **Frontend Connection**: The React frontend connects to these endpoints to fetch, create, update, and delete data.
3. **Authentication**: All admin operations require authentication with an admin token.

## Setting Up the Admin Interface

1. **Start the Backend Server**:
   ```
   cd backend
   python manage.py runserver
   ```
   This starts the Django server at http://localhost:8000

2. **Start the Frontend Server**:
   ```
   cd frontend
   npm start
   ```
   This starts the React server at http://localhost:3000

3. **Login to the Admin Interface**:
   - Go to http://localhost:3000/admin/login
   - Use the admin credentials:
     - Username: admin
     - Password: admin123

## Troubleshooting Database Connection Issues

If you're experiencing issues with the admin interface not connecting to the database:

1. **Check the Backend Server**:
   - Make sure the Django server is running at http://localhost:8000
   - Check the terminal for any error messages

2. **Check Authentication**:
   - Make sure you're logged in as an admin user
   - Check the browser console for any authentication errors
   - Try logging out and logging back in

3. **Clear Browser Cache**:
   - Sometimes browser caching can cause issues
   - Try clearing your browser cache or using incognito mode

4. **Check Network Requests**:
   - Open your browser's developer tools (F12)
   - Go to the Network tab
   - Look for any failed requests to the API endpoints
   - Check the response status codes and error messages

5. **Check CORS Settings**:
   - If you see CORS errors in the console, make sure the backend CORS settings are correct
   - The backend should allow requests from the frontend origin

## Common Issues and Solutions

1. **"Failed to load topics" error**:
   - Check if the backend server is running
   - Check if you're authenticated as an admin
   - Check the browser console for more specific error messages

2. **Changes not saving to the database**:
   - Check if you're filling out all required fields
   - Check the browser console for any error messages
   - Try refreshing the page and trying again

3. **"Unauthorized" error**:
   - Your authentication token may have expired
   - Try logging out and logging back in

4. **Database appears empty**:
   - If you're seeing empty tables, you may need to create some initial data
   - Use the "Add New Topic" and "Add New Resource" buttons to create data

## Creating Test Data

To quickly populate your database with test data:

1. Run the create_admin.py script:
   ```
   cd backend
   python create_admin.py
   ```

This will create:
- An admin user (if one doesn't exist)
- A test topic
- A test content item

## Database Structure

The database has the following main tables:

1. **Users**: Stores user information
2. **Topics**: Stores topic information (title, description, order, parent)
3. **Content**: Stores resource information (title, type, URL, description, order, topic)
4. **Progress**: Tracks user progress through content

When you add a topic or resource through the admin interface, it's stored in these tables and can be retrieved later.

## Viewing the Database Directly

If you want to view the database directly:

1. Use the Django admin interface:
   - Go to http://localhost:8000/admin/
   - Login with the admin credentials

2. Or use a SQLite browser to open the db.sqlite3 file in the backend directory
