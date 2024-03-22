//const repos = await fetch('https://api.github.com/orgs/diia-open-source/repos?per_page=200').then(r => r.json());
const repos = await fetch('https://api.github.com/users/nerovnia/repos?per_page=200').then(r => r.json());

const repoUrls = repos.map(r => r.clone_url);

console.log(repoUrls);