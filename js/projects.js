const projectsContainer = document.querySelector(".projects-container");

async function renderProjects() {
  const url = "https://portfolio-cms.heysiri.codes/wp-json/wp/v2/posts";
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);

    projectsContainer.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      projectsContainer.innerHTML += createHTML(result[i]);
    }
  } catch (error) {
    projectsContainer.innerHTML = `<div class="error">There was an error. Please refresh or try again later.<div>`;
  }
}

renderProjects();

function createHTML(post) {
  let htmlForProjectDescription = `
  <div class="project-card-wrapper">
    <a href="${post.acf.live_site}" class="project-card">
      <img src="${post.better_featured_image.media_details.sizes.medium_large.source_url}" alt="${post.acf.alt_text}"/>
      <h2>${post.title.rendered}</h2>
      <p>${post.acf.description}</p>
    </a>`;

  let htmlForAchievements = "";

  if (post.acf.achievements.length > 0) {
    htmlForAchievements = `<div class="project-achievements">
    <p class="achievements-heading">Achievements:</p>
    <p class="achievements-content">${post.acf.achievements} </div>`;
  }

  const htmlForGithubLink = `
    <div class="icon-container">
      <a href="${post.acf.github_url}" alt="link to github">
        <svg viewBox="0 0 30.752 30">
          <path d="M28.69,13.023a15.309,15.309,0,0,0-5.6-5.6,15.039,15.039,0,0,0-7.718-2.062A15.041,15.041,0,0,0,7.658,7.427a15.307,15.307,0,0,0-5.6,5.6A15.04,15.04,0,0,0,0,20.741,14.943,14.943,0,0,0,2.933,29.78a15.059,15.059,0,0,0,7.578,5.556.9.9,0,0,0,.8-.14.783.783,0,0,0,.26-.6q0-.06-.01-1.081t-.01-1.782l-.46.08a5.874,5.874,0,0,1-1.111.07,8.466,8.466,0,0,1-1.391-.14,3.109,3.109,0,0,1-1.341-.6,2.54,2.54,0,0,1-.881-1.231l-.2-.461a5,5,0,0,0-.631-1.021,2.416,2.416,0,0,0-.871-.761l-.14-.1a1.47,1.47,0,0,1-.26-.24,1.1,1.1,0,0,1-.18-.28q-.06-.14.1-.231a1.3,1.3,0,0,1,.581-.089l.4.06a2.923,2.923,0,0,1,.991.48,3.231,3.231,0,0,1,.971,1.041A3.529,3.529,0,0,0,8.238,29.56a2.357,2.357,0,0,0,1.311.43,5.693,5.693,0,0,0,1.141-.1,3.982,3.982,0,0,0,.9-.3,3.244,3.244,0,0,1,.981-2.062,13.709,13.709,0,0,1-2.052-.36,8.171,8.171,0,0,1-1.882-.781,5.39,5.39,0,0,1-1.612-1.341,6.446,6.446,0,0,1-1.051-2.1,10,10,0,0,1-.41-3,5.84,5.84,0,0,1,1.582-4.124,5.382,5.382,0,0,1,.14-4.084A2.805,2.805,0,0,1,9.009,12a12.037,12.037,0,0,1,1.672.771q.531.32.851.541a14.459,14.459,0,0,1,7.688,0l.761-.48a10.775,10.775,0,0,1,1.842-.881,2.624,2.624,0,0,1,1.622-.22,5.33,5.33,0,0,1,.16,4.084,5.841,5.841,0,0,1,1.582,4.124,10.109,10.109,0,0,1-.41,3.013,6.2,6.2,0,0,1-1.061,2.1,5.6,5.6,0,0,1-1.622,1.331,8.187,8.187,0,0,1-1.882.781,13.7,13.7,0,0,1-2.052.361A3.566,3.566,0,0,1,19.2,30.371v4.224a.8.8,0,0,0,.25.6.87.87,0,0,0,.791.14,15.057,15.057,0,0,0,7.578-5.556,14.946,14.946,0,0,0,2.933-9.039A15.053,15.053,0,0,0,28.69,13.023Z" transform="translate(0 -5.365)" />
        </svg>
      </a>
    </div>
</div>
  <hr />`;

  const html = htmlForProjectDescription + htmlForAchievements + htmlForGithubLink;

  return html;
}
