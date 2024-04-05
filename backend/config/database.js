import mongoose from 'mongoose';

const connectionDB = async() =>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}`)
        .then( () =>{
            console.log("Base de datos conectada correctamente:", mongoose.connection.name);
        })
    } catch(e){
        console.error(e.name);
    }
} 

const database = {
    connectionDB
}

export default database;