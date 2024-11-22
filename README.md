# SETUP PROCESS :
## Prerequisites :
 1) Install Node.js. ( Link : https://nodejs.org/en/download/prebuilt-installer )
   
 2) Set up a MongoDB Community Server and MongoDB Compass in your system.
   ***BELOW LINKS WILL AUTOMATICALLY STARTS DOWNLOADING THE REQUIRED SOFTWARE , JUST CLICK ON IT***
   1) MongoDB Community Server Link : https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-8.0.3-signed.msi 
   2) MongoDB Compass Link : https://downloads.mongodb.com/compass/mongodb-compass-1.44.7-win32-x64.exe 

 3) Create a Cloudinary account. ( Link : https://cloudinary.com/users/register_free )
   
 4) Install POSTMAN. ( Link : https://www.postman.com/downloads/ )


## STEPS :
   1) Clone the repository
   
   2) Install dependencies - npm install
   
   3) Edit the config.env file in the root directory, configure the following variables:
      1) DATABASE_URL=YOUR_DATABASE_URL_HERE
      2) CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME_HERE
      3) CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY_HERE
      4) CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET_HERE
   
    4) Run the Server with Command : <pre>npx nodemon</pre>
   
    5) Access the application:
      1) Open POSTMAN and go to localhost:3000


---------------------------------------------------------
# API ENDPOINTS:

## ADMIN:
**Note:** The first admin will be created automatically.Check your console.

1) **Login**  
   **Endpoint:** `/admin/login` (POST)  
   **Request Body:**  
   ```json
   {
     "email": "admin@example.com",
     "password": "admin123"
   }

2) **Logout**  
   **Endpoint:** `/admin/logout` (GET)  