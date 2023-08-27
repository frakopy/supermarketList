# **Supermarket List Django Project**
Welcome to the Supermarket List Django Project! This project allows you to create and manage your supermarket shopping lists. 
It's built using Django and Django REST framework for the backend, and includes HTML, CSS, and JavaScript for the frontend.

## Tech Stack
1. Django
2. Django REST framework
3. HTML
4. CSS
5. JavaScript

## Getting Started
Follow these steps to set up and run the Supermarket List application on your local machine:

1. Clone the repository:

`git clone https://github.com/frakopy/supermarketList.git`

2. Create a .env file:
Create a file named .env in the project root directory. This file will hold your environment variables.

3. Set Environment Variables:
Add the following environment variables to your .env file:

`SECRET_KEY=your_secret_key`
`DEBUG=True  # Set to False in production`
`DATABASE_NAME=your_database_name`

Replace your_secret_key with your Django secret key and your_database_name with the desired name for your database.

## Install Dependencies:

1. Install the required Python dependencies using pip:

`pip install -r requirements.txt`

2. Run Migrations:
Apply database migrations to set up the database schema:

`python manage.py makemigrations`
`python manage.py migrate`

3. Start the Development Server:
Run the Django development server:

`python manage.py runserver`

Access the Application:
Open your web browser and navigate to http://localhost:8000 to access the Supermarket List application.

Create a New List:
you can create a new supermarket shopping list.

Add Items:
Add items to your shopping list by specifying the item name, quantity, and any other relevant details.

View and Manage Lists:
You can view and manage your existing shopping lists, edit items, mark items as purchased, and delete items.

Contributing
If you would like to contribute to this project, feel free to fork the repository and submit pull requests with your enhancements.
