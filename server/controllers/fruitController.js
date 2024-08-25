
const { connection, getFruit } = require('../connections/dbConnection');

class FruitController{
  constructor(){
    this.connection = null;
    this.initializeConnection();
  }
  async initializeConnection() {
    try {
      this.connection = await connection();
    } catch (error) {
      console.error('Failed to establish MongoDB connection:', error);
    }
  }



  
  async getFruit(req, res) {
    console.log('Fetching fruit...');
    const fruitId = req.params.fruitId;

    try {
      if (!this.connection) {
        console.error('No database connection available.');
        return res.status(500).send('Database connection is not available.');
      }

      const fruit = await getFruit(this.connection, fruitId);
      console.log('Fruit from MongoDB:', fruit);

      if (fruit) {
        res.json(fruit);
      } else {
        res.status(404).send('Fruit not found.');
      }
    } catch (error) {
      console.error('Error fetching fruit:', error);
      res.status(500).send('An error occurred while fetching the fruit.');
    }
  }


}

module.exports = {
  fruitController: new FruitController(),
}



// async function fetchAndPrintFruits() {
//   try {
//       const fruits = await connection(); // Await the result of the connection
//       console.log("All Fruits:");
//       fruits.forEach(fruit => console.log(fruit));
//   } catch (error) {
//       console.error("Error fetching fruits:", error);
//   }
// }
