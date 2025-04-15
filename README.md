# Zero to Infinity

A comprehensive learning platform for mathematics and related subjects.

## Project Structure

This project consists of two main parts:

1. **Frontend**: React application
2. **Backend**: Django REST API

## Deployment

### Frontend Deployment (Vercel)

The frontend is configured for deployment on Vercel.

1. Push the code to GitHub:
   ```
   git push origin main
   ```

2. Connect your GitHub repository to Vercel:
   - Go to [Vercel](https://vercel.com/)
   - Import your GitHub repository
   - Configure the project:
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Add environment variables:
     - `REACT_APP_API_URL`: URL of your deployed backend API

3. Deploy:
   - Click "Deploy"

### Backend Deployment (Render or similar)

The backend can be deployed on platforms like Render, Heroku, or PythonAnywhere.

1. Create a new Web Service on your chosen platform
2. Connect to your GitHub repository
3. Configure the service:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn takeyouforward.wsgi:application`
4. Add environment variables:
   - `DEBUG`: false
   - `ALLOWED_HOSTS`: Your domain names
   - `CORS_ALLOWED_ORIGINS`: Your frontend URL

## Development Setup

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\\Scripts\\activate`
   - Unix/MacOS: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Run migrations:
   ```
   python manage.py migrate
   ```

6. Create an admin user:
   ```
   python create_admin.py
   ```

7. Start the development server:
   ```
   python manage.py runserver
   ```

## Admin Interface

The admin interface is available at `/admin/login` and provides tools for managing:

- Topics
- Content/Resources
- Users
- Progress tracking

## License

This project is licensed under the MIT License - see the LICENSE file for details.
