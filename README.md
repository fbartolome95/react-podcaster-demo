# Podcaster Test App

This project is a test app for demo purposals. Builded as Single Page Application, app lists the top
100 podcasts from a public endpoint and shows some features like live search, local storage or
navigation through views for detailed items.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Troubleshooting

### CORs issues

In development, you can use Chrome extension `CORS unblock` to make successful endpoint calls. You
also can use the `cors-anywhere` setting the preffix in this project's `.env` file.

### Podcast Detail fetch not working

In development, you may be using "cors-anywhere" middleware for prevent CORS troubles. If you have
reached the requests limit, you need to refresh the token accesing
[https://cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo) and
clicking on the button to request access to the demo server.

## Author

Fernando Bartolomé
