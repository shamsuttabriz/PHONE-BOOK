const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayData(phones);
}

const displayData = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

    const showAllMore = document.getElementById('show-all-card');
    if (phones.length > 12) {
        showAllMore.classList.remove('hidden');
    }
    else {
        showAllMore.classList.add('hidden');
    }

    phones = phones.slice(0, 12);

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-slate-100 shadow-xl p-8 text-black`;
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })

    // All data showing in the site. so i can remove loading spinner.
    toggleHandleSpinner(false);
}


const handleClick = () => {
    // No data added in the site. So i can showing loading spinner.
    toggleHandleSpinner(true);

    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    console.log(inputText);
    loadPhone(inputText);
}

const handleShowCard = () => {
    console.log("Hello World");
}

const toggleHandleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}
