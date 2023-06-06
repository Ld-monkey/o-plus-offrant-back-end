const dataMapper = require("../models/datamapper");

const mainController = {

  async testPage(req, res) {
    try {
      const article_test = await dataMapper.TEST();
      res.send(article_test);
    }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
    
  }

};


module.exports = mainController;
