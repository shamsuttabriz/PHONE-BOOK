const loadPhone = async (searchText, isShowAllPhones) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayData(phones, isShowAllPhones);
}

const displayData = (phones, isShowAllPhones) => {
    const phoneContainer = document.getElementById('phone-container');
    // !!! Important part: Again search phone but I don't want to show previous data. 
    phoneContainer.innerHTML = '';

    // Display show all button if there are more than 12 phones
    const showAllMore = document.getElementById('show-all-card');
    if (phones.length > 12 && !isShowAllPhones) {
        showAllMore.classList.remove('hidden');
    }
    else {
        showAllMore.classList.add('hidden');
    }

    console.log("Is Show All Phones", isShowAllPhones);
    // Display only first 12 phones if show all
    if (!isShowAllPhones) {
        phones = phones.slice(0, 12);
    }

    // Phone card load from api - Application Programming Interface
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-slate-100 shadow-xl p-8 text-black`;
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body text-center">
                <h2 class="card-title mx-auto">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end mx-auto mt-5">
                    <button class="btn bg-neutral">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })

    // All data showing in the site. So I can remove loading spinner.
    toggleHandleSpinner(false);
}

// Search functionality implement in the site
const handleSearchPhone = (isShowAllPhones) => {
    // No data added in the site. So I can showing loading spinner.
    toggleHandleSpinner(true);

    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    loadPhone(inputText, isShowAllPhones);
}

// !!! Important part:  Loading spinner functionality implement 
const toggleHandleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// Handle Show All Phones Button
const handleShowAllPhones = () => {
    handleSearchPhone(true);
}
