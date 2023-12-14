
document.querySelector('#button-random-dog').addEventListener('click', createImgRandom);
document.querySelector('#button-show-breed').addEventListener('click', createImgOfBreed);
document.querySelector('#button-show-sub-breed').addEventListener('click', showSubBreeds);
document.querySelector('#button-show-all').addEventListener('click', showAllBreeds);

function createListItem(text) {
  const li = document.createElement('li');
  li.textContent = text;
  return li;
}

function createUnorderedList() {
  return document.createElement('ul');
}

async function createImgRandom() {
  let response = await fetch('https://dog.ceo/api/breeds/image/random');
  let data = await response.json()
  document.getElementById('content').innerHTML = `<img class="content__image" alt="Image random" src="${data.message}">`
}

async function createImgOfBreed() {
  const contentDiv = document.getElementById('content');
  const input = document.getElementById('input-breed');
  const breed = input.value.toLowerCase()

  try {
    let response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    if (response.ok) {
      let data = await response.json()
      contentDiv.innerHTML = `<img alt="Image of breed" src="${data.message}">`
    }
    else {
      contentDiv.innerHTML = `<p>Breed not found!</p>`
    }
  } catch (error) {
    console.log(error)
  }
}

async function showSubBreeds() {
  const contentDiv = document.getElementById('content');
  const input = document.getElementById('input-breed');
  const breed = input.value.toLowerCase()

  try {
    let response = await fetch(`https://dog.ceo/api/breed/${breed}/list`)
    if (response.ok) {
      let data = await response.json();
      const arrayOfSubBreed = data.message;

      if (arrayOfSubBreed.length !== 0) {
        contentDiv.innerHTML = `<ol id="list-breed"></ol>`

        arrayOfSubBreed.forEach((sub) => {
          const li = document.createElement('li');
          li.textContent = sub;
          document.getElementById('list-breed').appendChild(li);
        })
      }
      else {
        throw new Error('No sub-breeds found!');
      }
    }
    else {
      throw new Error('Breed not found!');
    }
  } catch (error) {
    contentDiv.innerHTML = `<p>${error.message}</p>`
  }
}

async function showAllBreeds() {
  const contentDiv = document.getElementById('content');
  const listBreed = document.createElement('ol');
  contentDiv.innerHTML = '';
  contentDiv.appendChild(listBreed);

  try {
    let response = await fetch(`https://dog.ceo/api/breeds/list/all`);

    if (response.ok) {
      let data = await response.json();
      const arrayAllBreeds = Object.entries(data.message);

      arrayAllBreeds.forEach(([breed, subBreeds]) => {

        // arrayAllBreeds è un array in cui ogni elemento è una coppia [breed, subBreeds],
        // dove breed è il nome della razza e subBreeds è un array delle sotto-razze (destructuring).

        const li = createListItem(breed);
        listBreed.appendChild(li);

        if (subBreeds.length !== 0) {
          const subUl = createUnorderedList();
          subBreeds.forEach((subBreed) => {
            const subLi = createListItem(subBreed);
            subUl.appendChild(subLi);
          })
          li.appendChild(subUl);
        }
      })
    } else {
      throw new Error('Error!')
    }
  } catch (error) {
    contentDiv.innerHTML = `<p>${error.message}</p>`
  }
}