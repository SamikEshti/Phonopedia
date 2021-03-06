document.getElementById('error-message').style.display = 'none';
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        phoneDetails.textContent = "";
        document.getElementById('error-message').style.display = 'block';
        
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data.slice(0,20)))
            .catch(error => displayError(error));
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = phones => {
    const phoneDetails = document.getElementById('phoneDetails');
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phoneDetails.textContent = "";
    if (phones.length == 0) {
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        innerHTML = error-message();
    }
    phones.forEach(mobile => {
        innerhtml = `${mobile}`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 w-80 mx-auto">
            <img src="${mobile.image}" class="card-img-top w-50 mx-auto my-3" alt="..." >
            <div class="card-body bg-opacity-10 bg-primary">
                <p class="card-title"><b>Phone Name : </b> ${mobile.phone_name}</p>
                <p class="card-text"><b>Brand : </b> ${mobile.brand}</p>
            <button onclick="loadPhoneDetail('${mobile.slug}')" class="btn btn-primary" type="button"
            id="detail">Details</button>
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
    phoneDetails.textContent = "";
    div.classList.add('card');
    div.innerHTML = `
    <img src="${mobile.image}" class="card-img-top w-50 mx-auto my-3" alt="...">
    <div class="card-body bg-opacity-10 bg-primary">
    <h4 class="text-center"><em><u> Specifiations </u></em></h4> <br>
        <p class="card-text"><b>Brand : </b>${mobile.brand}</p>
        <p class="card-text"><b>Phone Name : </b>${mobile.name}</p>
        <p class="card-text"><b>Storage : </b>${mobile.mainFeatures.storage}</p>
        <p class="card-text"><b>Display Size : </b>${mobile.mainFeatures.displaySize}</p>
        <p class="card-text"><b>Chip Set : </b>${mobile.mainFeatures.chipSet}</p>
        <p class="card-text"><b>Release Date : </b>${mobile.releaseDate}</p>
        <p class="card-text"><b>WLAN : </b>${mobile.others.WLAN}</p>
        <p class="card-text"><b>Bluetooth : </b>${mobile.others.Bluetooth}</p>
        <p class="card-text"><b>GPS: </b>${mobile.others.GPS}</p>
        <p class="card-text"><b>NFC : </b>${mobile.others.NFC}</p>
        <p class="card-text"><b>Radio : </b>${mobile.others.Radio}</p>
        <p class="card-text"><b>USB : </b>${mobile.others.USB}</p>
        <p class="card-text"><b>Sensors : </b>${mobile.mainFeatures.sensors}</p>
    </div>
    `;
    phoneDetails.appendChild(div);
}