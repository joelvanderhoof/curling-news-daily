    
var crawlArticlePages = (results) => {
   return new Promise ((resolve) => { 
    fetch(articleURL)
        .then((response) => {
            return response.text();
        })
        .then((body) => {
            //console.log(body);
            let title = $(`.graf--title`).text();
            let subtitle = $(`h3`).text();
            console.log(`subtitle: ${subtitle}`);
            //title = decodeURI(title);
            let author = $(`.postMetaLockup--authorWithBio`).find(`div`).find(`a`).text();
            let datePublished = $(`time`).attr(`datetime`);
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
};