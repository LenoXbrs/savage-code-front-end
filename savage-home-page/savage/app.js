const {MongoClient, ObjectId} = require("mongodb");
async function connect(){
  if(global.db) return global.db;
    const conn = await MongoClient.connect("mongodb+srv://savagecode:savagecode@savagecode.qbenvjl.mongodb.net/?retryWrites=true&w=majority");
  if(!conn) return new Error("Can't connect");
    global.db = await conn.db("savagecode");
  return global.db;
}

const express = require('express');
const app     = express();
const port    = 3000     //porta padrão

app.use(require('cors')());
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//Definindo Rotas
const router = express.Router();

async function verificarEmail(email) {
  const db = await connect();
  if (db instanceof Error) {
    throw new Error("Can't connect to the database");
  }

  const collection = db.collection('usuario'); // Substitua 'nomedacolecao' pelo nome da sua coleção

  const user = await collection.findOne({ email });
  return user; // Retorna o usuário encontrado ou null se o e-mail não existir
}



//-------------------------------------
//---------   Rotas USUÁRIO   ---------
//-------------------------------------

/* GET usuario */
router.get('/usuario/:id?', async function(req, res, next) {
    try{
      const db = await connect();
      if(req.params.id)
        res.json(await db.collection("usuario").findOne({_id: new ObjectId(req.params.id)}));
      else
        res.json(await db.collection("usuario").find().toArray());
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// POST /usuario
router.post('/usuario', async function(req, res, next){
    try{
      const usuario = req.body;
      const db = await connect();
      res.json(await db.collection("usuario").insertOne(usuario));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// PUT /usuario/id
router.put('/usuario/:id', async function(req, res, next){
    try{
      const aluno = req.body;
      const db = await connect();
      res.json(await db.collection("usuario").updateOne({_id: new ObjectId(req.params.id)}, {$set: usuario}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// DELETE /usuario/id
router.delete('/usuario/:id', async function(req, res, next){
    try{
      const db = await connect();
      res.json(await db.collection("usuario").deleteOne({_id: new ObjectId(req.params.id)}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})


app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const user = await verificarEmail(email);
  if (!user) {
    return res.status(400).json({ mensagem: 'E-mail não encontrado.' });
  }

  // Restante da lógica de autenticação...

 console.log('Usuario encontrado!')
  res.json(user);
});



// //-------------------------------------
// //----------   Rotas CURSO   ----------
// //-------------------------------------

// //  GET /curso 
// router.get('/curso/:id?', async function(req, res, next) {
//     try{
//       const db = await connect();
//       if(req.params.id)
//         res.json(await db.collection("curso").findOne({_id: new ObjectId(req.params.id)}));
//       else
//         res.json(await db.collection("curso").find().toArray());
//     }
//     catch(ex){
//       console.log(ex);
//       res.status(400).json({erro: `${ex}`});
//     }
// })

// //  POST /curso
// router.post('/curso', async function(req, res, next){
//     try{
//       const curso = req.body;
//       const db = await connect();
//       res.json(await db.collection("curso").insertOne(curso));
//     }
//     catch(ex){
//       console.log(ex);
//       res.status(400).json({erro: `${ex}`});
//     }
// })

// //  PUT /curso/id
// router.put('/curso/:id', async function(req, res, next){
//     try{
//       const curso = req.body;
//       const db = await connect();
//       res.json(await db.collection("curso").updateOne({_id: new ObjectId(req.params.id)}, {$set: curso}));
//     }
//     catch(ex){
//       console.log(ex);
//       res.status(400).json({erro: `${ex}`});
//     }
// })

// //  DELETE /curso/id
// router.delete('/curso/:id', async function(req, res, next){
//     try{
//       const db = await connect();
//       res.json(await db.collection("curso").deleteOne({_id: new ObjectId(req.params.id)}));
//     }
//     catch(ex){
//       console.log(ex);
//       res.status(400).json({erro: `${ex}`});
//     }
// })



//-------------------------------------
//----------   Rotas MÓDULO   ---------
//-------------------------------------

//  GET /modulo 
router.get('/modulo/:id?', async function(req, res, next) {
    try{
      const db = await connect();
      if(req.params.id)
        res.json(await db.collection("modulo").findOne({_id: new ObjectId(req.params.id)}));
      else
        res.json(await db.collection("modulo").find().toArray());
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//  POST /modulo
router.post('/modulo', async function(req, res, next){
    try{
      const modulo = req.body;
      const db = await connect();
      res.json(await db.collection("modulo").insertOne(modulo));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//  PUT /modulo/id
router.put('/modulo/:id', async function(req, res, next){
    try{
      const modulo = req.body;
      const db = await connect();
      res.json(await db.collection("modulo").updateOne({_id: new ObjectId(req.params.id)}, {$set: modulo}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//  DELETE /modulo/id
router.delete('/modulo/:id', async function(req, res, next){
    try{
      const db = await connect();
      res.json(await db.collection("modulo").deleteOne({_id: new ObjectId(req.params.id)}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})


//-------------------------------------
//----------   Rotas AULA   -----------
//-------------------------------------

//  GET /aula 
router.get('/aula/:id?', async function(req, res, next) {
    try{
      const db = await connect();
      if(req.query.idModulo)
        res.json(await db.collection("aula").find({idModulo: req.query.idModulo}).toArray());
      if(req.params.id)
        res.json(await db.collection("aula").findOne({_id: new ObjectId(req.params.id)}));
      else
        res.json(await db.collection("aula").find().toArray());
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//  POST /aula
router.post('/aula', async function(req, res, next){
    try{
      const aula = req.body;
      const db = await connect();
      res.json(await db.collection("aula").insertOne(aula));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//  PUT /aula/id
router.put('/aula/:id', async function(req, res, next){
    try{
      const aula = req.body;
      const db = await connect();
      res.json(await db.collection("aula").updateOne({_id: new ObjectId(req.params.id)}, {$set: aula}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//  DELETE /aula/id
router.delete('/aula/:id', async function(req, res, next){
    try{
      const db = await connect();
      res.json(await db.collection("aula").deleteOne({_id: new ObjectId(req.params.id)}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})


//-------------------------------------
//-------   Rotas COMENTARIO   --------
//-------------------------------------

//  GET /comentario 
router.get('/comentario/:id?', async function(req, res, next) {
    try{
      const db = await connect();
      if(req.query.idAula)
        res.json(await db.collection("comentario").find({idAula: req.query.idAula}).toArray());
      if(req.params.id)
        res.json(await db.collection("comentario").findOne({_id: new ObjectId(req.params.id)}));
      else
        res.json(await db.collection("comentario").find().toArray());
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//  POST /comentario
router.post('/comentario', async function(req, res, next){
    try{
      const comentario = req.body;
      const db = await connect();
      res.json(await db.collection("comentario").insertOne(comentario));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//  PUT /comentario/id
router.put('/comentario/:id', async function(req, res, next){
    try{
      const comentario = req.body;
      const db = await connect();
      res.json(await db.collection("comentario").updateOne({_id: new ObjectId(req.params.id)}, {$set: comentario}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//  DELETE /comentario/id
router.delete('/comentario/:id', async function(req, res, next){
    try{
      const db = await connect();
      res.json(await db.collection("comentario").deleteOne({_id: new ObjectId(req.params.id)}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

app.use('/', router);

app.listen(port);
console.log('API funcionando');