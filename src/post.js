const { uuid } = require('uuidv4');
function Post(nome) {
    // constructor(nome) {
        this.id = uuid();
        this.descricao = '';
        this.is_ativo = true;
        this.cidade_id = 1;
        this.user_id = 1;
        this.is_adotado = false;
        this.nome_animal = nome;
        this.tipo_animal = 1;
        this.telefone = null;
        this.is_whatsapp = false;
        this.sexo_animal = 1;
        this.idade_animal = 1;
        this.raca_id = 1;
        this.is_castrado = false;
        this.is_vacinado = false;
    // }            
}
module.exports = Post;