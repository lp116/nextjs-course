import {MongoClient} from 'mongodb';

async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body;
        const {title, image, address, description} = data;
        const client = await MongoClient.connect('mongodb+srv://leeping13017:13017leeping@cluster0.sywpypj.mongodb.net/?retryWrites=true&w=majority');
        const db = client.db();
        const meetupsCollection = db.collection('myFirstDatabase')
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message : 'Meetup inserted !'});
    }
   
}

export default handler;