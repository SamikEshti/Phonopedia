document.getElementById('error-message').style.display = 'none';
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        // please write something to display
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
            .catch(error => displayError(error));
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (phones.length == 0) {
        // show no result found;
    }
    phones.forEach(mobile => {
        console.log(mobile);
        innerhtml = `${mobile}`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${mobile.image}" class="card-img-top w-50 mx-auto" alt="..." >
            <div class="card-body">
                <h5 class="card-title">${mobile.phone_name}</h5>
                <p class="card-text">${mobile.brand}</p>
                <button onclick="loadPhoneDetail('${mobile.brand}')" class="btn btn-primary" type="button"
            id="detail">detail</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = mobile => {
    console.log(mobile);
    const phoneDetails = document.getElementById('phoneDetails');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${mobile.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${mobile.brand}</h5>
        <p class="card-text">${mobile.slug}</p>
    </div>
    `;
    phoneDetails.appendChild(div);
}