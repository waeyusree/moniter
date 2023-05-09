// require("dotenv").config();

// let END_POINT_URL = process.env.REACT_APP_END_POINT_URL;
let END_POINT_URL = "http://209.15.108.158:3001";

/** === localhost === */
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
{
    // END_POINT_URL = process.env.REACT_APP_END_POINT_URL_LOCALHOST;
    END_POINT_URL = "http://localhost:3001";
}

module.exports = { END_POINT_URL };