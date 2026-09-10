🏨 Vista Mar Hotel — Booking Website

A modern and responsive hotel website with a complete suite search and reservation flow.

The project combines a polished frontend with a PHP/MySQL backend to simulate a real hotel booking experience.

🌐 Live Demo

View Live Demo

The booking system requires a PHP server and MySQL database to run locally.

✨ Features

🔎 Search suites by check-in and check-out dates

👥 Search by number of guests

🏨 Dynamic suite availability

🖼️ Suite images and amenities

💰 Automatic total price calculation

📋 Suite details modal

📅 Reservation form

🔒 Availability validation before booking

📱 Responsive design

📨 Contact form

📧 Newsletter section

🧭 Responsive navigation

🧠 How It Works

The booking flow follows this process:

Search → Availability → Suite Details → Reservation

The user selects check-in, check-out, and number of guests.

JavaScript sends the search request to the PHP backend.

PHP queries MySQL and checks room capacity and conflicting reservations.

Available suites are returned as JSON and displayed dynamically.

The user can open the suite details and submit a reservation.

The backend validates availability again before saving the reservation.

This validation helps prevent double bookings.

🛠️ Technologies

Frontend

HTML5

CSS3

JavaScript

Bootstrap 5

Bootstrap Icons

Google Fonts

Fetch API / AJAX

Backend

PHP

PDO

Database

MySQL

📱 Responsive Design

The interface was designed to provide a consistent experience across:

💻 Desktop

💻 Laptop

📱 Mobile

📲 Tablet

The layout adapts navigation, search forms, suite cards, modals, and content sections for smaller screens.

📂 Project Structure

hotel-site/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── php/
│   ├── config.php
│   ├── search.php
│   ├── suite_detail.php
│   └── reserve.php
├── sql/
│   └── database.sql
└── README.md

🚀 Getting Started

Requirements

XAMPP, WAMP, MAMP, or another PHP server

PHP

MySQL

Web browser

1. Clone the repository

git clone YOUR_REPOSITORY_URL

2. Configure the database

Open phpMyAdmin and import:

sql/database.sql

This creates the database, tables, and sample data.

3. Configure the connection

Open:

php/config.php

Set your MySQL credentials:

DB_HOST
DB_NAME
DB_USER
DB_PASS

4. Start the project

Place the project inside your server directory.

For XAMPP:

htdocs/hotel-site

Then start Apache and MySQL.

Open:

http://localhost/hotel-site/

🎯 Project Goals

This project was created to practice building a more complete web application instead of a static landing page.

The main focus was:

Frontend and backend integration

Database communication

API-style PHP endpoints

Dynamic content rendering

Reservation logic

Date availability validation

Responsive UI development

🔮 Future Improvements

💳 Online payment integration

📧 Automatic reservation confirmation emails

👤 Customer authentication

⚙️ Admin dashboard

🏨 Suite management

📊 Reservation management

🔐 Improved authentication and security

👨‍💻 Developer

Developed by João Mateus

Junior Front-End Developer

Focused on building modern, responsive, and user-friendly web applications.

🤝 Open to

Freelance projects

Website development

Front-End opportunities

Collaborations

New web projects

⭐ If you like this project, consider giving the repository a star.
