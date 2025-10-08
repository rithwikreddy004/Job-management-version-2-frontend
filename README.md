# 🚀 Deployment

**Live App:** [https://jobmanagementadmin.vercel.app](https://job-management-version-2-frontend.vercel.app/)

---

# Job Management Admin Interface

**Project:** A full-stack web application designed for administrators to create, manage, filter, and view job postings with real-time updates and pixel-perfect UI.

---

## **Table of Contents**

* [Tech Stack](#tech-stack)
* [Setup](#setup)
* [Pages & Features](#pages--features)
* [Design Notes](#design-notes)
* [Screenshots](#screenshots)
* [Implementation Status](#implementation-status)
  

---

## **Tech Stack**

* **Frontend:** **Next.js** (App Router), **React.js**, **Mantine** (UI Library), **React Hook Form**
* **Backend:** **NestJS** (Node.js/TypeScript)
* **Database:** **PostgreSQL** (Hosted on Render)
* **ORM:** **Prisma ORM**
* **Validation:** **Zod** (Client-side Form Validation)
* **Deployment:** **Vercel** (Frontend) + **Render** (Backend & Database)

---

## **Setup**

### **Setup (Run Locally)**

1.  **Clone the repositories** (Frontend and Backend)
    ```bash
    git clone [Frontend_Repo_URL] my-job-admin
    git clone [Backend_Repo_URL] my-job-backend
    ```

2.  **Install dependencies** in both directories:
    ```bash
    cd my-job-admin && npm install
    cd ../my-job-backend && npm install
    ```

3.  **Environment Variables (Backend)**
    Create a `.env` file in the `my-job-backend` directory for local development:
    ```
    # Replace with your local Postgres credentials
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME"
    ```

4.  **Database Setup (Prisma)**
    In the `my-job-backend` directory, apply the schema to your local PostgreSQL database:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Run the application (Simultaneously)**
    Start the backend server:
    ```bash
    cd my-job-backend
    npm run start:dev
    ```
    Start the frontend server:
    ```bash
    cd my-job-admin
    npm run dev
    ```
    Visit `http://localhost:3001` to see the app.

---

## **Pages & Features**

### **1. Job Creation Model**

* **High-Fidelity Form:** Implements all required fields: Job Title, Company Name, Location, Job Type, Salary Range (Min/Max), Application Deadline, and Job Description.
* **Robust Validation:** Uses **React Hook Form** and **Zod** to validate all fields, including ensuring the **Application Deadline** is a valid future date.
* **Instant Submission:** Submits data via `POST /jobs` and automatically closes the modal and refreshes the dashboard upon success.

### **2. Job List Dashboard – `/`**

* **Real-time Listing:** Fetches and displays job postings from the live database.
* **Dynamic Filtering:** Implements functional filtering that sends query parameters to the backend for **Job Title, Location, Job Type, and Salary Range**.
* **Live Update:** Job list updates instantly when filters are changed and when a new job is created.

---

## **Design Notes**

* **Figma Fidelity:** UI elements are a **pixel-perfect replica** of the provided Figma design, covering header, filter bar, and job card layouts.
* **Responsiveness:** Implemented responsive design across the header and main content areas to ensure optimal viewing on mobile and desktop devices.
* **Data Flow:** All data requests use the deployed **NestJS API**, with configuration handled via environment variables (`NEXT_PUBLIC_API_URL`).

---

## **Screenshots**

![Home Page](#)#Home Page
<img width="1891" height="907" alt="Screenshot 2025-10-08 222231" src="https://github.com/user-attachments/assets/53bf7a28-6b7f-4ce4-bf8e-a5b22f372425" />



![Create Job Opening](#)#Create Job Opening
<img width="1767" height="863" alt="Screenshot 2025-10-08 222307" src="https://github.com/user-attachments/assets/6b01d6a6-dfbf-4cbc-a387-f66d9766d151" />





## **Implementation Status**

**✅ Completed**

* Full-Stack CRUD functionality for Job Postings.
* Database Schema definition and migration via Prisma ORM.
* Full UI Cloning and Responsive Design.
* Functional Dynamic Filtering for all required fields.
* Automated state synchronization (no manual page reload required after submit).
