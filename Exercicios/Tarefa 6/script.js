let pessoas = [];

function salvarPessoa() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;

  const pessoa = { nome, email, telefone };
  pessoas.push(pessoa);

  atualizarTabela();
}

function sincronizarPessoas() {
  pessoas.forEach(pessoa => {
    fetch('https://663d4de617145c4d8c39373a.mockapi.io/pessoas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pessoa)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao sincronizar pessoa: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Pessoa sincronizada:', data);
    })
    .catch(error => {
      console.error('Erro ao sincronizar pessoa:', error.message);
    });
  });
}

function atualizarTabela() {
  const tabela = document.getElementById('tabelaPessoas');

  tabela.innerHTML = '';

  pessoas.forEach(function(pessoa) {
    const tr = document.createElement('tr');
    
    const tdNome = document.createElement('td');
    tdNome.textContent = pessoa.nome;
    tr.appendChild(tdNome);

    const tdEmail = document.createElement('td');
    tdEmail.textContent = pessoa.email;
    tr.appendChild(tdEmail);

    const tdTelefone = document.createElement('td');
    tdTelefone.textContent = pessoa.telefone;
    tr.appendChild(tdTelefone);

    tabela.appendChild(tr);
  });
}
