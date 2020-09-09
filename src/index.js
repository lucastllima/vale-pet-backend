const express = require('express');
const Post = require('./post');
const { isUuid } = require('uuidv4');
const { response } = require('express');

const single_post = {
    'descricao': 'Descrição 001',
    'is_ativo': 1,
    'cidade_id': 1,
    'user_id': 1,
    'is_adotado': false,
    'nome_animal': 'Bob 001',
    'tipo_animal': 0,
    'telefone': null,
    'is_whatsapp': false,
    'sexo_animal': 0,
    'idade_animal': 0,
    'raca_id': 1,
    'is_castrado': false,
    'is_vacinado': false
};



const app = express();
app.use(express.json());

function logRequests(req, res, next) {
    const { method, url } = req;
    const logLabel = `[${ method.toUpperCase() }] ${ url }`
    console.time(logLabel);
    next(); // Próximo middleware
    console.timeEnd(logLabel);
}
// app.use(logRequests); // Middleware me todas rotas

function validateProjectId(req, res, next) {
    const { id } = req.params;
    if (!isUuid(id)) {
        return res.status(400).json({error: 'ID do post inválido'});
    }
    return next();
}

const posts = [];

app.get('/posts', logRequests, (req, res) => { // Middleware em rota isolada
    const {nomeAnimal} = query = req.query;
    const results = nomeAnimal ?
        posts.filter(project => project.nome_animal.includes(nomeAnimal)) : posts;

    return res.json(results);
});

app.post('/posts', (req, res) => {
    const post = new Post(req.body.nome_animal);
    posts.push(post);
    return res.json(post);
});

app.put('/posts/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    // const post = req.body; TODO: Implementar update do que vier da tela

    const postIndex = posts.findIndex((project => project.id === id));

    if (postIndex < 0) {
        return res.status(400).json({error: 'Post não encontrado.'});
    }

    // TODO: remover temporario que altera só o nome
    posts[postIndex].nome_animal = posts[postIndex].nome_animal + 'Alterado - ' + new Date().toTimeString().split(' ')[0];
    return res.json(posts[postIndex]);
});

app.delete('/posts/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    
    const postIndex = posts.findIndex((project => project.id === id));

    if (postIndex < 0) {
        return res.status(400).json({error: 'Post não encontrado.'});
    }

    posts.splice(postIndex, 1);
    return res.status(204).send();
});

app.listen(3333, () => {
    console.log('Running backend... 🐾');
});

