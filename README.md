# SETUP PROCESS :

## Prerequisites :

1.  Install Node.js. ( Link : https://nodejs.org/en/download/prebuilt-installer )

2.  Set up a MongoDB Community Server and MongoDB Compass in your system.
    **_BELOW LINKS WILL AUTOMATICALLY STARTS DOWNLOADING THE REQUIRED SOFTWARE , JUST CLICK ON IT_**
3.  MongoDB Community Server Link : https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-8.0.3-signed.msi
4.  MongoDB Compass Link : https://downloads.mongodb.com/compass/mongodb-compass-1.44.7-win32-x64.exe

5.  Create a Cloudinary account. ( Link : https://cloudinary.com/users/register_free )

6.  Install POSTMAN. ( Link : https://www.postman.com/downloads/ )

## STEPS :

1.  Clone the repository

2.  Install dependencies - npm install

3.  Edit the config.env file in the root directory, configure the following variables:

    1. DATABASE_URL=YOUR_DATABASE_URL_HERE
    2. CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME_HERE
    3. CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY_HERE
    4. CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET_HERE

4.  Run the Server with Command : npx nodemon

5.  Access the application:
    1. Open POSTMAN and go to localhost:3000

---

# API ENDPOINTS:

## 1. ADMIN API DOCUMENTATION:

**Note:** The first admin will be created automatically.Check your console.

1. **Login**  
   **Endpoint:** `/admin/login` (POST)  
   **Request Body:**

   ```json
   {
     "email": "admin@example.com",
     "password": "admin123"
   }
   ```

2. **Logout**  
   **Endpoint:** `/admin/logout` (GET)

-----------------------------------------------------

## 2. TEACHER API DOCUMENTATION:

### **Note:**

For **ADD**, **UPDATE**, and **DELETE** operations, **ADMIN authentication** is required.

---

### 1. GET ALL TEACHERS WITH PAGINATION

**Endpoint:**  
`/teacher/allteacher/:page` (GET)

- **Description:** Retrieves all teachers with pagination.
- **Parameters:**
  - `:page` (optional): Page number. If left blank, defaults to `1`.
- **Example:**  
  `/teacher/allteacher/1`

---

### 2. GET TEACHER BY ID

**Endpoint:**  
`/teacher/getteacherbyid/:id` (GET)

- **Description:** Retrieves teacher details by their unique ID.
- **Parameters:**
  - `:id` (mandatory): The unique identifier of the teacher.
- **Example:**  
  `/teacher/getteacherbyid/12345`

---

### 3. ADD TEACHER

**Endpoint:**  
`/teacher/addteacher/` (POST)

- **Description:** Adds a new teacher to the system.
- **Request Body (form-data):**
  ```json
  {
    "name": "", // Teacher's name
    "email": "", // Teacher's email
    "subject": "", // Teacher's subject expertise
    "file": "" // Teacher's image (type: file)
  }

---

### 4. UPDATE TEACHER BY ID

**Endpoint:**  
`/teacher/updateteacherbyid/:id/` (PUT)

- **Description:** Updates the details of an existing teacher.
- **Parameters:**
  - `:id` (mandatory): The unique identifier of the teacher.
- **Request Body (form-data):**
  ```json
  {
    "name": "", // Updated name of the teacher
    "email": "", // Updated email of the teacher
    "subject": "", // Updated subject expertise
    "file": "" // Updated image of the teacher (type: file)
  }

---

### 5. SOFT DELETE TEACHER BY ID

**Endpoint:**  
`/teacher/deleteteacherbyid/:id` (DELETE)

- **Description:** Soft deletes a teacher by marking them inactive instead of permanently removing them from the system.
- **Parameters:**
  - `:id` (mandatory): The unique identifier of the teacher.
- **Example:**  
  `/teacher/deleteteacherbyid/12345`

--------------------------------------------------------------------

## 2. CLASS API DOCUMENTATION:

### **Note:**

For **ADD**, **UPDATE**, and **DELETE** operations, **ADMIN authentication** is required.

---

### 1. GET ALL CLASSES 

**Endpoint:**
`/class/allclass/` (GET)

- **Description:** Retrieves all classes.

---

### 2. GET CLASS BY ID

**Endpoint:**  
`/class/getclassbyid/:id` (GET)

- **Description:** Retrieves class details by their unique ID.
- **Parameters:**
  - `:id` (mandatory): The unique identifier of the class.
- **Example:**  
  `/class/getclassbyid/12345`

---

### 3. ADD CLASS

**Endpoint:**  
`/class/addclass/` (POST)

- **Description:** Adds a new class to the system.
- **Request Body:**
  ```json
  {
    "name": "", // Class name
    "teacherId": "", // Referencing teacher Id 
    "studentCount": "", // Class student count
  }

---

### 4. UPDATE CLASS BY ID

**Endpoint:**  
`/class/updateclassbyid/:id/` (PUT)

- **Description:** Updates the details of an existing class.
- **Parameters:**
  - `:id` (mandatory): The unique identifier of the class.
- **Request Body:**
  ```json
  {
    "name": "", // Class name
    "teacherId": "", // Referencing teacher Id 
    "studentCount": "", // Class student count
  }

---

### 5. DELETE CLASS BY ID

**Endpoint:**  
`/class/deleteclassbyid/:id` (DELETE)

- **Description:**Deletes a class permanently.
- **Parameters:**
  - `:id` (mandatory): The unique identifier of the class.
- **Example:**  
  `/class/deleteclassbyid/12345`

-----------------------------------------------------

## 2. STUDENT API DOCUMENTATION:

### **Note:**

For **ADD**, **UPDATE**, and **DELETE** operations, **ADMIN authentication** is required.

---

### 1. GET ALL STUDENTS WITH PAGINATION AND FILTER

**Endpoint:**  
`student/allstudent/:classId/:page` (GET)

- **Description:** Retrieves all student with pagination and class filteration.
- **Parameters:**
  - `:classId` (mandatory pass- "all"): Class Id for filtering students. If filtering not required just pass "all" (mandatory)
  - `:page` : Page number. If left blank, defaults to `1`.
- **Example:**  
  `student/allstudent/all/1` - Display all students.
  `student/allstudent/12345/1` - Display the filtered student only.

---

### 2. GET STUDENT BY ID

**Endpoint:**  
`/student/getstudentbyid/:id` (GET)

- **Description:** Retrieves student details by their unique ID.
- **Parameters:**
  - `:id` (mandatory): The unique identifier of the student.
- **Example:**  
  `/student/getstudentbyid/12345`

---

### 3. ADD STUDENT

**Endpoint:**  
`/student/addstudent/` (POST)

- **Description:** Adds a new student to the system.
- **Request Body (form-data):**
  ```json
  {
    "name": "", // student's name
    "email": "", // student's email
    "classId": "", // Refering class's Id
    "file": "" // student's image (type: file)
  }

---

### 4. UPDATE STUDENT BY ID

**Endpoint:**  
`/student/updatestudentbyid/:id/` (PUT)

- **Description:** Updates the details of an existing student.
- **Parameters:**
  - `:id` (mandatory): The unique identifier of the student.
- **Request Body (form-data):**
  ```json
  {
    "name": "", // Updated name of the student
    "email": "", // Updated email of the student
    "subject": "", // Updated Refering class's Id
    "file": "" // Updated image of the student (type: file)
  }

---

### 5. SOFT DELETE STUDENT BY ID

**Endpoint:**  
`/student/deletestudentbyid/:id` (DELETE)

- **Description:** Soft deletes a student by marking them inactive instead of permanently removing them from the system.
- **Parameters:**
  - `:id` (mandatory): The unique identifier of the student.
- **Example:**  
  `/student/deletestudentbyid/12345`

--------------------------------------------------------------------