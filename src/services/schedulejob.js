let cron = require("node-cron");
const axios = require("axios").default;
const Articles = require("../model/articles");
const API_KEY = process.env.API_KEY;
let categories = ["business", "sports", "health", "technology"];

module.exports = {
  fetchData: () => {
    cron.schedule("0 1 * * *", async () => {
      
      try {
        await Articles.deleteMany({});
      }
      catch(err){
        console.log('documents could not be deleted.');
      }
      categories.map((category) => {
        axios
          .get(
            `https://newsapi.org/v2/top-headlines?country=gb&category=${category}&apiKey=${API_KEY}`
        )
          .then((resp) => {
            if (resp.status === 200) {
              resp.data.articles.map(async (article) => {
                const addArticle = new Articles({
                  metaTitle: article.title,
                  description: article.description,
                  ogImage: article.urlToImage,
                  canonicalUrl: article.url,
                  ogUrl: article.url,
                  category: category
                });

                try {
                  const articleToAdd = await addArticle.save();
                  console.log("article added successfully");
                } catch (error) {
                  console.log("error while saving: ", error);
                }
              });
            }
          })
          .catch((error) => {
            console.log("erorr in fetching: ", error);
          });
      });
    },
    {
        scheduled: true,
        timezone: "Asia/Karachi"
    });
  },
};
