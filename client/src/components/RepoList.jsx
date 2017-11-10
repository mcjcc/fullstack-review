import React from 'react';

const RepoList = (props) => {
  console.log('RepoList.jsx -- props.repos: ', props.repos);
  return (
    <div>
      <h4> Repo List Component </h4>
      These are the top {props.repos.length} repos. (Sorted by Star Count)
      <table>
        <thead>
          <tr>
            <th>Repo Name</th>
            <th>Owner</th>
            <th>Owner Avatar</th>
            <th>Star Count</th>
          </tr>
        </thead>
        <tbody>
          {props.repos.map((repo) => {
            return (
              <tr key={repo._id}>
                <td><a href={repo.repo_html_url} target="_blank">{repo.repo_name}</a></td>
                <td>{repo.owner_name}</td>
                <td><img  className="owner-img" src={repo.owner_avatar_url} /></td>
                <td>{repo.repo_stargazers_count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RepoList;
