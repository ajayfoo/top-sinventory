# Sinventory
An inventory management website where authorized users can filter and view musical instruments based on their type(string, brass, wind, etc.) and modify their info(count, picture, name, type). I did this project as part of my full-stack web developer course called "The Odin Project". The course gave a general overview of how the website should work; I implemented all the required features and some more, like image upload.

## Table Of Contents
- [How to setup?](#how-to-setup)
- [How to run?](#how-to-run)
- [Screenshots](#screenshots)
    - [Desktop](#desktop)
    - [Mobile](#mobile)

## How to setup?
The setup needs to be done only once.
### Step 1: Install PostgreSQL
You can use [The Odin Project's brilliant article](https://www.theodinproject.com/lessons/nodejs-installing-postgresql) to install PostgreSQL 
or follow the instructions given in [PostgreSQL's official website](https://www.postgresql.org/download/)

### Step 2: Create .env file
Create a file named .env in the project root folder and copy the contents of dot-env-example to .env. Then replace the placeholders with actuals values for 
each environment variables by following the hints given.

### Step 3: Bootstrap Database
Run the following commands in order in the project root folder after [installing nodejs](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
```sh
# Installs the dependencies
npm install
```
```sh
# Creates database schema and demo user
npm run bootstrap-db
```
## How to run?
Please [setup the project](#how-to-setup) before running it.  
For production
```sh
npm run start
```
For development
```sh
npm run serve
```
Launch a browser and go to localhost:3000 or localhost:<port number that you set in .env>, put username and password as demo.

## Screenshots
### Desktop

1. Home

   ![Home](https://i.imgur.com/qTrTFau.png)

2. Update Categories

   ![Update Categories](https://i.imgur.com/Dc7T43y.png)

3. Confirm Deletion of categories

   ![Confirm Deletion of categories](https://i.imgur.com/CQDf01i.png)

4. Instrument Page

   ![Instrument Page](https://i.imgur.com/JFo7MhN.png)

5. Update Instrument

   ![Update Instrument](https://i.imgur.com/lJpRjJt.png)

### Mobile

1. Home

   ![Home](https://i.imgur.com/poWLKzz.png)

2. Update Categories

   ![Update Categories](https://i.imgur.com/zcLsXka.png)

3. Confirm Deletion of categories

   ![Confirm Deletion of categories](https://i.imgur.com/M3Zczct.png)

4. Instrument Page

   ![Instrument Page](https://i.imgur.com/qyuw0nk.png)

5. Update Instrument

   ![Update Instrument](https://i.imgur.com/EO0cgJq.png)

## Credits

### Instrument & Category Descriptions

1. [Wikipedia](https://www.wikipedia.org)
2. [Britannica](https://www.britannica.com/)

### Images

1. [Classical Guitar 1](https://www.pexels.com/photo/photo-of-yellow-guitar-hanged-on-pink-wall-3428498/) - [Philip Boakye](https://www.pexels.com/@philboakye/)
2. [Acoustic Guitart 98](https://www.pexels.com/photo/brown-and-black-cut-away-acoustic-guitar-1010519/) - [Jessica Lewis 🦋 thepaintedsquare](https://www.pexels.com/@thepaintedsquare/)
3. [Trumpet 1](https://www.pexels.com/photo/a-trumpet-on-a-floor-7577302/) - [PNW Production](https://www.pexels.com/@pnw-prod/)
4. [Wooden Flute](https://www.pexels.com/photo/brown-wooden-flute-on-book-with-notes-221563/) - [Pixabay](https://www.pexels.com/@pixabay/)
5. [Tabla 1](https://www.pexels.com/photo/two-indian-tabla-drums-16743021/) - [Dr.Herumb Sharma](https://www.pexels.com/@dr-herumb-sharma-78972025/)
