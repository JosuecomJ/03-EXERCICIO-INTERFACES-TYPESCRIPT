//// FUNÇÕES E VARIAVEIS
const users = [];
//// VERIFICA USUARIO ATRAVÉS DA API E ARMAZENA EM UM ARRAY ////
async function fetchUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    if (user.messsage) {
        console.log(`Usuario não encontrado!`);
    }
    else {
        users.push(user);
        alert(`O usuário ${user.login} foi salvo.\n` +
            `\nid: ${user.id}` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`);
    }
}
/// VERIFICA SE O USUARIO EXISTE NO ARRAY E MOSTRA SEUS DADOS ////
async function showUser(username) {
    const user = users.find((user) => user.login === username);
    if (typeof user === "undefined") {
        alert("Usuário não encontrado!");
    }
    else {
        const response = await fetch(user.repos_url);
        const repos = await response.json();
        let message = `id: ${user.id}\n` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`;
        repos.forEach((repo) => {
            message +=
                `\nNome: ${repo.name}` +
                    `\nDescrição: ${repo.description}` +
                    `\nEstrelas: ${repo.stargazers_count}` +
                    `\nÉ um fork: ${repo.fork ? "Sim" : "Não"}\n`;
        });
        console.log(message);
    }
}
/// MOSTRA TODOS OS USUARIOS ///
function showAllUsers() {
    let message = "Usuarui:\n";
    users.forEach((user) => {
        message += `\n- ${user.login}`;
    });
    console.log(message);
}
/// MOSTRA O TOTAL DE REPOSITORIOS DO GRUPO///
function showReposTotal() {
    const reposTotal = users.reduce((accumlator, user) => accumlator + user.public_repos, 0);
    console.log(`O grupo possui um total de ${reposTotal} repositórios públicos!`);
}
/// APRESENTA OS 5 USUARIOS COM MAIOR NUMERO DE REPOSITORIOS PUBLICOS ///
function showTopFive() {
    const topFive = users
        .slice()
        .sort((a, b) => b.public_repos - a.public_repos)
        .slice(0, 5);
    let message = "Top 5 usuários com mais repositórios públicos:\n";
    topFive.forEach((user, index) => {
        message += `\n${index + 1} - ${user.login}: ${user.public_repos} repositorios`;
    });
    console.log(message);
}
async function main() {
    await fetchUser("isaacpontes");
    await fetchUser("julianaconde");
    await fetchUser("pcaldass");
    await fetchUser("lucasqueirogaa");
    await fetchUser("frans203");
    await fetchUser("LeDragoX");
    await fetchUser("JosuecomJ");
    await showUser("isaacpontes");
    await showUser("julianaconde");
    showAllUsers();
    showReposTotal();
    showTopFive();
}
main();
