const loadPhone = async (searchText = 13, isShowAllPhones) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
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

    // console.log("Is Show All Phones", isShowAllPhones);
    // Display only first 12 phones if show all
    if (!isShowAllPhones) {
        phones = phones.slice(0, 12);
    }

    // Phone card load from api - Application Programming Interface
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-slate-200 shadow-xl p-8 text-black`;
        phoneCard.innerHTML = `
            <figure class="bg-slate-50 py-8 rounded-lg"><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body text-center">
                <h2 class="card-title mx-auto">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <h2 class="font-bold text-2xl">$999</h2>
                <div class="card-actions justify-end mx-auto mt-5">
                    <button onclick="handleShowDetails('${phone.slug}');
                    show_details_modal.showModal()" class="btn bg-neutral text-slate-200 hover:text-slate-800">Show Details</button>
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

// Handle Show Details Button Implementation
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    console.log(data);
    showDetailsPhone(phone)
}

// Show Details Display Phone
const showDetailsPhone = (phone) => {
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
        <div class="w-full h-1/2 bg-slate-50 py-10 rounded-lg">
        <img class="w-1/3 mx-auto" src="${phone.image}" alt="Phone" />
        </div>
        <h3 id="show-details-phone-name" class="font-bold text-lg text-slate-900 mt-6">${phone.name}</h3>
        <p class="my-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="mb-2"><b class="text-slate-900">Storage :</b> ${phone.mainFeatures.storage}</p>
        <p class="mb-2"><b class="text-slate-900">Display Size :</b> ${phone.mainFeatures.displaySize}</p>
        <p class="mb-2"><b class="text-slate-900">Chipset :</b> ${phone.mainFeatures.chipSet}</p>
        <p class="mb-2"><b class="text-slate-900">Memory :</b> ${phone.mainFeatures.memory}</p>
        <p class="mb-2"><b class="text-slate-900">Slug :</b> ${phone.slug}</p>
        <p class="mb-2"><b class="text-slate-900">Release data :</b> ${phone.releaseDate}</p>
        <p class="mb-2"><b class="text-slate-900">Brand :</b> ${phone.brand}</p>
        <p class="mb-2"><b class="text-slate-900">GPS :</b> ${phone?.others?.GPS}</p>
    `
    // Show Display modal
    show_details_modal.showModal();
}

loadPhone();