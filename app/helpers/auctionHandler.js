// au clic sur le bouton encherir il faut que 5% du montant actuel soit ajouter au prix de départ ou à l'enchère en cours suivant la situation
// Une fois le bouton cliqué il faut que ma base de donnée s'enrichisse des nouvelles valeurs qui sont :
// - L'identité de l'enchereur (article)
// - le nouveau montant (article)
// - Le nouveau temps restant si ça le prolonge (article)
// - modification de l'historique des enchères


const client = require('../models/client');

const auctionHandler ={
    async auctioning(price, productId, acheteurId ) {
        const historicQuery = {
          text: 'INSERT INTO "encherir" ("montant", "date", "utilisateur_id", "article_id") VALUES ($1, NOW(), $2, $3) RETURNING *',
          values: [price, productId, acheteurId],
        };
        const newAuctioning = await client.query(historicQuery);

        const updatedProductQuery = {
            text: 'UPDATE "article" SET "montant" = $1, "utilisateur_achat_id" = $3 WHERE "id" = $2 RETURNING *',
            values: [price, productId, acheteurId],
          };
          const updatedProduct = await client.query(updatedProductQuery);
          const auctionTracer = {newAuctioning, updatedProduct}
          //!! Vérification à faire
/*           if(auctionTracer) {
            return auctionTracer;
          }
          else {
            return null;
          } */
      },

};



module.exports = auctionHandler;