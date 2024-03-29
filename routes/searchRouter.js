// ------ Imports
const express = require("express");
const axios = require("axios");
const router = express.Router();

// ------ Request Handles

// empty search page
// localhost:3000/
router.get("/", (req, res) => {
    res.render("home", {data: []});
})

// search for random dog pic
// localhost:3000/search
router.get("/search", async (req, res) => {
    let query = req.query.search.toLowerCase(); 
    let queryCap = query.slice(0,1).toUpperCase() + query.slice(1).toLowerCase(); 
  
    try{
        //API: https://dog.ceo/dog-api/breeds-list
        let payload = await axios.get(`https://dog.ceo/api/breed/${query}/images/random`);

        console.log(payload.data.message);

        if(payload.data.status !== "success"){
            res.render("home", {data: []})
        } else {
            res.render("home", { data: payload.data, name: queryCap})
        }
    } catch (error) {
        console.log(`There was an error getting your dog picture ${error}`);

        let errorMsg = `There was an error getting your dog picture of a ${queryCap}. Please check the breed and try again.`;

        res.render("error", {message: errorMsg});
        
    }
});

// get all the dog pics of a breed
// localhost:3000/breed/:breed
router.get("/breed/:breed", async (req, res) => {
    console.log(req.params);
    let { breed } = req.params;
    console.log(breed);

    let breedCap = breed.slice(0,1).toUpperCase() + breed.slice(1).toLowerCase();
    
    try {
        let payload = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
        
        console.log(`payload`);
        console.log(payload.data.message);

        if(payload.data.status === "success"){

            res.render("breed", { data: payload.data.message, name: breedCap})
        } else {
            // Handle the case where status is not success
            console.error("API returned unsuccessful status:", payload.data.status);
            res.render("error", { message: "Failed to fetch images for the breed." });
        }

    } catch (error) {
        console.error("Error fetching images:", error);
        res.render("error", { message: "Error fetching images. Please try again later." });
    }
})

// ------ Exports
module.exports = router;