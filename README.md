# Szépség Éden – Web-Based Appointment Booking & Salon Management System

A comprehensive, full-stack software solution tailored for beauty salons to unify and streamline their appointment scheduling processes into a single, cohesive platform. Inspired by the real-world challenge of multi-provider service centers, this project eliminates fragmented scheduling by offering a centralized web interface for clients and a robust desktop application for administration and specialists.

This system was developed as an official Software Developer and Tester Technician Qualification Project (Vizsgaremek).

---

## 👥 Authors & Roles
- **Mészáros Gergő** – Frontend Development, UI/UX Design, Assets Creation, System Testing & Documentation.
- **Fuisz Máté** – Backend Development, Desktop (WPF) Application Development, Database Administration, System Testing & Documentation.

---

## 🛠️ System Architecture & Technologies

The solution uses a decoupled, multi-tier architecture to ensure high responsiveness and modularity:

* **Frontend (Web Application):** Built using **React** with the **Vite** build tool. Styled with advanced responsive CSS (utilizing media queries for mobile, tablet, and desktop compatibility).
* **Desktop Application:** Developed using **C# / WPF (.NET Framework)** via Microsoft Visual Studio, tailored for Windows management environments.
* **Backend Server:** Engineered in **C# / .NET**, exposing RESTful API endpoints from scratch to communicate with both the web frontend and desktop platforms.
* **Database:** Relational database management using **MySQL**, hosted and administered via **XAMPP / phpMyAdmin**.

---

## 💡 Key Features & Complex Logic

### 1. Smart Appointment Allocation Algorithm
The core intelligence of the backend lies in its conflict-free scheduling engine. When a client chooses a service and a specialist, the algorithm calculates available 30-minute intervals by cross-referencing:
- The specialist's specific working hour limits for that day.
- Existing reservations already saved in the database for that date.
- **Dynamic Duration Blocking:** It ensures the selected service can fit fully within the specialist's remaining shift without overlapping subsequent appointments or closing times.

### 2. Multi-Booking Under One Profile
To enhance user experience, a single registered user can book multiple parallel appointments at the same time. For example, a parent can book a massage for themselves and a haircut for their child for the exact same hour without creating a separate profile.

### 3. Automated Email Notifications
The system triggers immediate transactional emails to maintain data integrity and keep clients informed:
- When a specialist cancels an appointment via the desktop app.
- When a user profile is deleted by an admin while they still have upcoming bookings.
- When a provider leaves the salon and their professional profile is removed.

### 4. Enterprise Desktop Administration (WPF)
- **Specialist View:** Logged-in technicians can view their daily/weekly schedule chronologically and handle cancellations.
- **Admin View:** Complete control over staff onboarding (adding new employees) and compliance purging (deleting obsolete client or worker accounts).

---

## 📊 Relational Database Design

The system runs on a highly structured relational database schema (`szepsegeden`), enforcing transactional data integrity.

  +--------------+            +------------------+            +--------------+
  |     Role     |            |       User       |            |     Days     |
  +--------------+            +------------------+            +--------------+
  | id (PK)      |<-----------| id (PK)          |            | daynumber(PK)|
  | name         |            | email            |            | name         |
  +--------------+            | passwd_hash      |            +--------------+
                              | passwd_salt      |                   |
                              | surname          |                   |
                              | firstname        |                   |
                              | phonenumber      |                   |
                              | role_id (FK)     |                   |
                              +------------------+                   |
                                |       |      |                     |
         +----------------------+       |      +-------+             |
         |                              v              v             v
         |                    +------------------+   +-------------------+
         |                    |   Userservices   |   |   Workinghours    |
         |                    +------------------+   +-------------------+
         |                    | user_id (FK/PK)  |   | user_id (FK/PK)   |
         |                    | service_id(FK/PK)|   | daynumber (FK/PK) |
         v                    +------------------+   | opening_time      |
  +------------------+                  ^            | closing_time      |
  |   Reservation    |                  |            +-------------------+
  +------------------+                  |
  | id (PK)          |                  |
  | worker_id (FK)   |                  |
  | guest_id (FK)    |                  |
  | service_id (FK)  |------------------+
  | datetime         |
  | appointment      |
  +--------------+---+
                 |
                 v
          +--------------+
          |   Service    |
          +--------------+
          | id (PK)      |
          | name         |
          | price        |
          | duration     |
          +--------------+

### Table Definitions & Relations:
- `Role`: Defines systemic access permissions (`Admin`, `Worker`, `Guest`).
- `User`: Securely stores account details including cryptographically protected `passwd_hash` and `passwd_salt`.
- `Service`: Contains catalog listings along with processing price and duration.
- `Reservation`: Maps client selections to available slots, links `worker_id`, `guest_id`, and `service_id`.
- `Userservices`: Many-to-Many lookup table linking staff members to the precise treatments they are certified to provide.
- `Workinghours` & `Days`: Tracks exact operational shifts on a per-day, per-technician level.

---

## 🚀 Installation & Setup Guide

Follow these steps exactly to build, launch, and run the entire environment locally:

### Prerequisites
- **Node.js** (Latest stable version recommended)
- **XAMPP** (with Apache and MySQL modules)
- **Microsoft Visual Studio 2019** (or newer, with .NET Framework development tools)

### Step 1: Database Setup
1. Launch **XAMPP Control Panel** and start both **Apache** and **MySQL** modules.
2. Open your browser and navigate to `http://localhost/phpmyadmin`.
3. Create a blank database named `szepsegeden`.
4. Go to the **Import** tab and select the `szepsegeden.sql` file located in the project files.
5. Next, import the `init.sql` data seed file from the `Adatbazis` folder to populate initial parameters and configurations.

### Step 2: Backend and Desktop (WPF) Execution
1. Open the file `Szepsegeden.sln` using **Microsoft Visual Studio**.
2. **Verify Configuration Ports:** Open `App.config` and `Web.config` files inside the `Szepsegeden`, `SzepsegedenLibrary`, and `SzepsegedenWPF` projects. Ensure the port specified in your `connectionStrings` matches your active local MySQL port from XAMPP (defaults are usually `3306` or `3307`).
3. To start the **Backend API Server**: Right-click the `Szepsegeden` core project in the Solution Explorer, select **Set as Startup Project**, and click the green **Start (Play)** button at the top.
4. To start the **WPF Management Application**: Set the `SzepsegedenWPF` project as the Startup Project in Visual Studio and execute it.

### Step 3: Frontend Web Development Server
1. Open your terminal/command prompt and navigate to the directory containing the `src` folder and `package.json`.
2. Run `npm install` to download node dependencies.
3. Start the Vite server by executing:
   ```bash
   npm run dev

### Step 4: Run
1. Copy the local address generated in the terminal output (e.g., http://localhost:5173) and paste it into your browser to view the client UI.

---

🧪 Testing Accounts (Demo Environment)
Use the following credentials to fully explore the ecosystem right away:

Client / Guest Web Account:

  Email: teszt@szepseg.hu
  Password: Teszt123

Specialist / Technician Account (Desktop app):

  Email: fodrasz2@szepseg.hu
  Password: FodraszFanni123

System Administrator Account (Desktop app):

  Email: admin@admin.hu
  Password: Admin123

