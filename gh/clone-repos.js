import { spawnSync } from "node:child_process"
import { resolve } from "node:path"

function $(command, options) {
  const result = spawnSync(command, { stdio: "inherit", shell: true, ...options });
  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
}

const repos = await fetch(
  'https://api.github.com/orgs/diia-open-source/repos?per_page=200'
  ).then(r => r.json());

const repoUrls = repos
  .map((r) => ({ name: r.name, url: r.clone_url}))
  .filter(({ url }) => url.includes("be-"));

  const TARGET_DIRECTORY = ".";

  const cloneCommands = repoUrls.map(
    (repo) => `git clone ${repo.url} ${resolve(TARGET_DIRECTORY, repo.name)}`
  );

console.log(cloneCommands);

for (const cloneCommand of cloneCommands) {
  $(cloneCommand)
}