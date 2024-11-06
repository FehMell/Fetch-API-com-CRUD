// By Fernanda Mell e Pedro de Oliveira


function buscarAnimePorId(animeId) {
    const apiUrl = `https://api.jikan.moe/v4/anime/${animeId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const { title, episodes, score, rank, mal_id } = data.data;
            adicionarAnimeNaTabela(title, episodes, score, rank, mal_id);
        })
        .catch(error => {
            console.error('Houve um problema com a requisição:', error);
            alert('Anime não encontrado. Verifique o ID e tente novamente.');
        });
}

function adicionarAnimeNaTabela(title, episodes, score, rank, mal_id) {
    const tabelaCorpo = document.querySelector('#animeTable tbody');

    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
    <td>${title}</td>
    <td>${episodes}</td>
    <td>${score} ☆</td>
    <td>${rank}</td>
    <td>${mal_id}</td>
    `;

    tabelaCorpo.appendChild(novaLinha);
}

//CREATE

function criarAnime(titulo, episodios, pontuacao, ranking, id) {
    adicionarAnimeNaTabela(titulo, episodios, pontuacao, ranking, id);
}

document.getElementById('buscarButton').addEventListener('click', () => {
    const animeId = document.getElementById('animeIdInput').value;
    if (animeId) {
        buscarAnimePorId(animeId);
        document.getElementById('animeIdInput').value = '';
    } else {
        alert('Por favor, insira um ID válido.');
    }
});

// UPDATE
function restartTable(tableId) {
    let table = document.getElementById(tableId);
    let rows = table.getElementsByTagName('tr');

    for (let i = rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

// DELETE
function removeAnime(removeId) {
    let numberOfRows = document.getElementById('animeTable').rows.length
    let table = document.getElementById('animeTable');
    for (let i = 0; i < numberOfRows; i++) {
        if (table.rows[i].cells[4].innerText == removeId) {
            table.rows[i].remove()
            break;
        }
    }

}