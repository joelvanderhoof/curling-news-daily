const cheerio = require(`cheerio`);
const fetch = require(`node-fetch`);
const express = require(`express`);
const router = express.Router();

// Load all articles plus their comments from the database
router.route(`/`)
.get((req, res) => {
        // Scrape 20 articles
        fetch(`https://hackernoon.com/`)
        //Scrape title, author, date published, and url
        .then((response) => {
            return response.text();
        })
        .then((body) =>{
            //console.log(body);
            let $ = cheerio.load(body);
            let results =[];

            $(`.js-trackedPost`).each((i, element) => {
                let articleURL = $(element).find(`a`).attr(`href`);
                // Remove the '?' and following parameters from the URL
                let n = articleURL.indexOf('?');
                articleURL = articleURL.substring(0, n != -1 ? n : articleURL.length);

                    fetch(articleURL)
                        .then((response) => {
                            return response.text();
                        })
                        .then((body) => {
                            console.log('checking page for title, author, and date published');
                            let title = $(`header`).text();
                            //title = decodeURI(title);
                            let author = $(`header`).find(`a`).text();
                            let datePublished = $(`header`).find(`time`).html();
                            datePublished = datePublished.toString()

                            // Add results to current results index
                            results[i] = {};
                            results[i].title = title;
                            results[i].author = author;
                            results[i].datePublished = datePublished;
                            results[i].articleURL = articleURL;
                            console.log(results[i]);
                        })
            });
            return results;
        })

        // Check db to see if each article has been saved already


            // If article has been saved, don't save it and scrape the next one down until a new article is scraped


        // Save articles to db


        // Open modal with message "Added 20 more articles!"
})
// .post((req, res) =>{})
// .put((req, res) =>{})
// .delete((req, res) =>{});

// // Scrape 20 most recent articles from hackernoon.com
// router.route(`/saved-articles`)
// .get((req, res) =>{})
// .post((req, res) =>{})
// .put((req, res) =>{})
// .delete((req, res) =>{});


// router.route()
// .get((req, res) =>{})
// .post((req, res) =>{})
// .put((req, res) =>{})
// .delete((req, res) =>{});

// router.route()
// .get((req, res) =>{})
// .post((req, res) =>{})
// .put((req, res) =>{})
// .delete((req, res) =>{});

module.exports = router; 