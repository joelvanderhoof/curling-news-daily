const cheerio = require(`cheerio`);
const fetch = require(`node-fetch`);
const express = require(`express`);
const router = express.Router();

// Load all articles plus their comments from the database
router.route(`/`)
.get((req, res) => {
    let results =[];
        // Scrape 20 articles
        fetch(`https://hackernoon.com/`)
        //Scrape title, author, date published, and url
        .then((response) => {
            return response.text();
        })
        .then((body) =>{
            //console.log(body);
            let $ = cheerio.load(body);

            $(`.js-trackedPost`).each((i, element) => {
                let articleURL = $(element).find(`a`).attr(`href`);
                // Remove the '?' and following parameters from the URL
                let n = articleURL.indexOf('?');
                articleURL = articleURL.substring(0, n != -1 ? n : articleURL.length);
                results[i] = {};
                results[i].articleURL = articleURL;

            });
            return results;
        })
        .then((results) => {
            
            // Get title, author, and date from each URL
            results.forEach((result) => {
                fetch(result.articleURL)
                    .then((response) => {
                            return response.text();
                    })
                    .then((body) => {
                        let $ = cheerio.load(body);

                        //console.log(body);
                        let title = $(`h1`).text().trim();
                        let author = $(`.postMetaLockup--authorWithBio`).find(`div`).find(`a`).text().trim();
                        let datePublished = $(`time`).attr(`datetime`);
                        //datePublished = datePublished.toString()
                        let articleText = ``;

                        // Get article text
                        $(`.sectionLayout--insetColumn`).children(`p`).each((i, element) => {
                            articleText += $(element).text();
                            articleText += `\n`;
                        });

                        // Add results to current results index
                        result.title = title;
                        result.author = author;
                        result.datePublished = datePublished;
                        result.articleText = articleText;
                        console.log(result);
                        res.json(results);
                    })
            })
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