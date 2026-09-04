class UsuariosData {
 constructor() {
 this.usuarios = [
 {
 id: 1,
 nome: 'Lais Lopes',
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

atualizar(id, dadosUsuario) {
  const index = this.usuarios.findIndex(usuario => usuario.id === id);
  if (index === -1) return null;

  // Garantindo que o ID original não seja alterado
  const usuarioAtualizado = {
    ...this.usuarios[index],
    ...dadosUsuario,
    id: id 
  };

  this.usuarios[index] = usuarioAtualizado;
  return usuarioAtualizado;
}

excluir(id) {
  const index = this.usuarios.findIndex(usuario => usuario.id === id);
  
  // Se não encontrou o usuário, retorna false
  if (index === -1) return false;

  // Remove o usuário da array
  this.usuarios.splice(index, 1);
  return true;
}

}


module.exports = new UsuariosData();