class UsuariosData {
 constructor() {
 this.usuarios = [
 {
 id: 1,
 nome: 'Lais Lopes ',
 email: 'lais@email.com',
 senha: '123456',
 dataNascimento: '1995-03-12',
 cpf: '12345678901'
 },
 {
 id: 2,
 nome: 'Santiago Muñiz',
 email: 'santi@email.com',
 senha: '123456',
 dataNascimento: '1998-07-25',
 cpf: '23456789012'
 },
 {
 id: 3,
 nome: 'Yasmin Saad',
 email: 'carla@email.com',
 senha: '123456',
 dataNascimento: '2000-11-08',
 cpf: '34567890123'
 }

 ];
 }
 listar() {
 return this.usuarios;
 }
 buscarPorId(id) {
 return this.usuarios.find(usuario => usuario.id === id);
 }
 buscarPorEmail(email) {
 return this.usuarios.find(usuario => usuario.email === email);
 }
 buscarPorCpf(cpf) {
 return this.usuarios.find(usuario => usuario.cpf === cpf);
 }
 inserir(dadosUsuario) {
 const maiorId = this.usuarios.reduce(
 (maior, usuario) => Math.max(maior, usuario.id),
 0
 );
 const novoUsuario = {
 id: maiorId + 1,
 ...dadosUsuario
 };
 this.usuarios.push(novoUsuario);
 return novoUsuario;
 }
}
module.exports = new UsuariosData();