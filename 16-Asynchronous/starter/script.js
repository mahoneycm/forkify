'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/**
 * New API url
 * https://countries-api-836d.onrender.com/countries/
 */

const renderCountry = (data, className = '') => {
  const flag = data.flags[1];
  const name = data.name.common;
  const region = data.region;
  const population = (+data.population / 1000000).toFixed(1);
  const language = Object.values(data.languages)[0];
  const currencies = Object.values(data.currencies)[0].name;

  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${flag}" />
      <div class="country__data">
        <h3 class="country__name">${name}</h3>
        <h4 class="country__region">${region}</h4>
        <p class="country__row"><span>👫</span>${population} people</p>
        <p class="country__row"><span>🗣️</span>${language}</p>
        <p class="country__row"><span>💰</span>${currencies}</p>
      </div>
    </article>
  `;
  
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  }
  
  const renderError = (msg) => {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
}

// const getCountryDataandNeighbor = (country) => {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3/name/${country}`);
//   request.send();
  
//   request.addEventListener("load", () => {
//     const [data] = JSON.parse(request.responseText)
  
//     // Render country 1
//     renderCountry(data);
//     console.log(data);

//     // Render country 2
//     const neighbor = data.borders?.[0];
//     console.log(neighbor);

//     if(!neighbor) return;

//     // AJAX call country 2
//     const requestNeighbor = new XMLHttpRequest();
//     requestNeighbor.open("GET", `https://restcountries.com/v3/alpha?codes=${neighbor}`);
//     requestNeighbor.send();

//     requestNeighbor.addEventListener("load", () => {
//       console.log(requestNeighbor.responseText);
//       const [dataNeighbor] = JSON.parse(requestNeighbor.responseText)

//       renderCountry(dataNeighbor, 'neighbour');
//     })
//   }
// )};

// getCountryDataandNeighbor('usa');
// getCountryDataandNeighbor('el salvador');
// getCountryDataandNeighbor('italy');

// *** CODING CHALLENGE 1 ***

//  https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

/*

// const whereAmI = (lat, lng) => {
//   fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
//     .then(response => {
//       return response.json();
//       // console.log(response);
//     })
//     .then(data => {
//       if (data.city == undefined ) throw new Error(`No city found for "${lat}, ${lng}`);
//       // console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName}`);

//       getCountryData(data.countryName);
//     })
//     .catch(err => console.log(err.message))
// }

// whereAmI("Well", "well");
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

*/

const getJSON = (url, errorMsg = "Something went wrong") => {
  return fetch(url)
  .then((response) => {
    // console.log(response);

    if(!response.ok)
      throw new Error(`${errorMsg} (${response.status})`)

    return response.json();
  });
};



const getCountryData = (country) => {
  getJSON(`https://restcountries.com/v3/name/${country}`, "Country not found")
    .then(data => { 
      renderCountry(data[0]);
      const neighbor = data[0].borders[0]

      // console.log(neighbor);

      if(!neighbor) throw new Error("No neighbor found");

      // Country 2
      return getJSON(`https://restcountries.com/v3/alpha?codes=${neighbor}`, "Country not found")
  })
  .then(data => renderCountry(data[0], "neighbour"))
  .catch(err => {
    console.log(err);
    return renderError(`Something went wrong: ${err.message}`);
  })
  .finally(() => {
    countriesContainer.style.opacity = 1;
  })
}

// btn.addEventListener('click', ()  => getCountryData('usa'));


// console.log('Test start');
// setTimeout(() => {
//   console.log('0 second timer');
// }, 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolve promise 2').then(res => {

//   for(let i = 0; i < 1000000000; i++) {

//   }

//   console.log(res);
// })

// console.log('Test end.');

/*

const lotteryPromise = new Promise((resolve, reject) => {
  
  console.log('Lottery draw is happening 🎰');
  setTimeout(() => {
    if(Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost 😭'));
    }
  }, 2000);
});

lotteryPromise.then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
})


wait(2).then(() => {
  console.log('I waited for 2 seocnds');
  return wait(1);
}).then(() => {
  console.log(`I waited for 1 second`);
})

Promise.resolve('abcd').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

*/

// Promisifying setTimeout
const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};


const getPosition = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position), 
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

/*

getPosition().then(pos => console.log(pos));

const whereAmI = () => {
  getPosition().then(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
  })
  .then(response => {
      return response.json();
      // console.log(response);
  })
  .then(data => {
    if (data.city == undefined ) throw new Error(`No city found for "${lat}, ${lng}`);
    // console.log(data);
    console.log(`You are in ${data.city}, ${data.countryName}`);

    
    // getCountryData(data.countryName);
    getCountryData('usa');
  })
  .catch(err => console.log(err.message))
}

btn.addEventListener('click', whereAmI);

/*

const createImage = (path) => {
  const imgWrapper = document.querySelector('.images');
  
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = path;

    img.addEventListener('load', () => {
      imgWrapper.append(img)
      resolve(img);
    })

    img.addEventListener('error', () => {
      reject(new Error('Image not found'));
    })
  })
}

let currentImg;

createImage("./img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    return wait(2)
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("/img/img-2.jpg");
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
  })
  .catch(err => console.error(err))

*/

const whereAmI = async (country) => {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
    const dataGeo =await resGeo.json();
    
    const res = await fetch(`https://restcountries.com/v3/alpha/${dataGeo.countryCode}`);
    console.log(res.ok);
    if(!res.ok) throw new Error('Problem getting location data');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.countryName}`
  } catch (error) {
    console.error(error)
    renderError(`💥 ${error.message}`);

    // Reject promise returned from async function
    throw error;
  }
}

/*
console.log(`1: Will get location`);
whereAmI()
  .then(city => console.log(city))
  .catch(err => console.error(`2: ${err.message}`))
  .finally(() => console.log('3: Finished getting location'));
  
  (async () => {
    try {
      console.log(`1: Will get location`);
      const city = await whereAmI();
      console.log(`2: ${city}`);
    } catch (error) {
      console.error(`2: ${error}`);
    }
    console.log(`3: Finished getting location`);
  })();
*/

/*

const get3Countries = async (c1, c2, c3) => {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3/name/${c1}`),
      getJSON(`https://restcountries.com/v3/name/${c2}`),
      getJSON(`https://restcountries.com/v3/name/${c3}`)      
    ]);

    console.log(data.flatMap(d => d[0].capital));
  } catch (error) {
    console.error(error);
  }
}

get3Countries('portugal', 'canada', 'tanzania');

*/

/*

(async () => {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3/name/italy`),
    getJSON(`https://restcountries.com/v3/name/egypt`),
    getJSON(`https://restcountries.com/v3/name/mexico`)      
  ]);
  // console.log(res[0]);
})();

const timeout = (sec) => {
  return new Promise((_, reject ) => {
    setTimeout(() => {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  })
}

Promise.race([
  getJSON(`https://restcountries.com/v3/name/mexico`),
  timeout(0.12)
]).then(res => console.log(res))
  .catch(err => console.error(err))

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Success'),
]).then(res => console.log(res))

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Success'),
]).then(res => console.log(res))

*/

const createImage = (path) => {
  const imgWrapper = document.querySelector('.images');
  
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = path;

    img.addEventListener('load', () => {
      imgWrapper.append(img)
      resolve(img);
    })

    img.addEventListener('error', () => {
      reject(new Error('Image not found'));
    })
  })
}

// const loadImg = async (n) => {
//   await createImage(`./img/img-${n}.jpg`);
// }

// const loadNPause = async () => {
//   try {
//     const getImgs = Promise.allSettled([
//       loadImg(1),
//       loadImg(2),
//       loadImg(3)
//     ])
//     .then(res => console.log(res))
    
//   } catch (error) {
//     console.error(error);
//   }
// }

const loadNPause = async () => {
  try {
    let img = await createImage("./img/img-1.jpg");
    console.log(img);
    await wait(2);
    img.style.display = "none";
    
    img = await createImage("./img/img-2.jpg");
    console.log(img);
    await wait(2);
    img.style.display = "none";
  } catch (error) {
    console.error(error);
  }
}

// const nonAsync = () => {
//   const img1 = createImage("./img/img-1.jpg");
//   console.log(img1);
//   wait(2);
//   img1.style.display = "none";
//   wait(2);
  
//   const img2 = createImage("./img/img-2.jpg");
//   console.log(img2);
//   wait(2);
//   img2.style.display = "none";
// }

const loadAll = async (imgArr) => {
  try {
    const imgs = imgArr.map(async (img) => {
      const image = await createImage(img);
      image.classList.add("parallel");
      return image
    })
  
    const imgs2 = await Promise.all(imgs);
  
    console.log(imgs);
    console.log(imgs2);
  } catch (error) {
  console.error(error);
  }
}

// const test = loadNPause();

loadAll([
  "./img/img-1.jpg",
  "./img/img-2.jpg",
  "./img/img-3.jpg"
])
