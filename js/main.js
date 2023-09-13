const loadPhone = async (searchInput="13",isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchInput}`
  );
  const data = await response.json();
  let arrayOfPhone = data.data;
  displayPhone(arrayOfPhone,isShowAll);
};

const displayPhone = (arrayOfPhone,isShowAll) => {
    const showAllContainer = document.getElementById("showAllContainer");
  if(arrayOfPhone.length > 12 && !isShowAll){
    showAllContainer.classList.remove("hidden");
  }
  else{
    showAllContainer.classList.add("hidden");
  }
  if(!isShowAll){
      arrayOfPhone = arrayOfPhone.slice(0,12);
  }

  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  arrayOfPhone.forEach((category) => {
    // console.log(category);
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="card w-96 bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
            <img src="${category.image}" alt="Sorry!" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
            <h2 class="card-title">${category.phone_name}</h2>
            <p>It's a great phone you can't lead a day without it!</p>
            <div class="card-actions">
            <button onclick="showDetailsHandler('${category.slug}')" class="btn btn-primary">Show Details</button>
            </div>
            </div>
            </div>
        
        
        `;
    phoneContainer.appendChild(div);
  });
  toggleSpinner(false);
}

const searchHandler = (isShowAll) => {
   toggleSpinner(true);
   const searchInputField = document.getElementById("searchInput");
   const searchInput = searchInputField.value;
   loadPhone(searchInput,isShowAll);
}
const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById("loadingSpinner");
    if(isLoading){
        spinner.classList.remove("hidden");
    }
    else{
        spinner.classList.add("hidden");
    }
}

const showAllHandler = () => {
    searchHandler(true);
}

const showDetailsHandler = async(id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const phoneInfo = data.data;
    
    show_details.showModal();
    showPhoneDetails(phoneInfo);
}
const showPhoneDetails = (phoneInfo) => {
    const mainFeatures = phoneInfo.mainFeatures;
    console.log(mainFeatures);
    const modal = document.getElementById("show_details");
    const div = document.createElement("div");
    div.innerHTML = `
    <form method="dialog" class="modal-box">
            <div class="flex justify-center">
            <img src="${phoneInfo.image}"/>
            </div>
            <h3 class="font-bold text-lg">${phoneInfo.name}</h3>
            <h3 class="font-bold text-lg">Storage:${mainFeatures?.storage}</h3>
            <p class="py-4">Press ESC key or click the button below to close</p>
            <div class="modal-action">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </div>
          </form>
    `
    modal.appendChild(div);
}

loadPhone();
