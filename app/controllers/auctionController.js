const dataMapper = require("../models/datamapper");

const auctionController = {
  async Auctioning(req, res) {
    try {
      const { prix, articleId, acheteurId } = req.body;
      const auction = await dataMapper.Auctioning(prix, articleId, acheteurId);
      res.json({status :'Done', histAuctions : auction.newAuctioning.rows, updatedTableArticle : auction.updatedArticle.rows});
    }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
 },
};


module.exports = auctionController;
