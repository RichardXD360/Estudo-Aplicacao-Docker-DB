const API_URL = 'http://localhost:3000';

// Função para carregar a lista de usuários
async function carregarUsuarios() {
    try {
        const res = await fetch(`${API_URL}/Users`);
        const usuarios = await res.json();
        const tabela = document.getElementById('tabelaUsuarios');

        if (usuarios.length === 0) {
            tabela.innerHTML = `<tr><td colspan="3" class="text-muted">Nenhum usuário encontrado.</td></tr>`;
            return;
        }

        tabela.innerHTML = usuarios.map(u => `
            <tr>
                <td>${u.nome}</td>
                <td>${u.email}</td>
                <td>${u.idade}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        document.getElementById('tabelaUsuarios').innerHTML =
            `<tr><td colspan="3" class="text-danger">Erro ao conectar com o servidor.</td></tr>`;
    }
}

// Função para enviar novo usuário
document.getElementById('formNovoUsuario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const idade = parseInt(document.getElementById('idade').value);

    if (!nome || !email || !idade) return alert('Preencha todos os campos.');

    try {
        const res = await fetch(`${API_URL}/UserNovo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, idade })
        });

        if (!res.ok) throw new Error('Erro ao criar usuário.');

        document.getElementById('formNovoUsuario').reset();
        await carregarUsuarios();
    } catch (error) {
        alert('Falha ao adicionar usuário: ' + error.message);
    }
});

// Carrega os usuários ao iniciar
carregarUsuarios();