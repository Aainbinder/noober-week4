async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)
  
  // 🔥 start here: write code to loop through the rides
  for(let i = 0; i < json.length; i++){
    let ride = json[i];
    appendRide(ride);
    
  }
  
}

function passengerNumber(ride){
  return ride.numberOfPassengers;
}

function appendRide(ride){

  let outputElement = document.querySelector('.rides')
  let service = determineService(ride);

  outputElement.insertAdjacentHTML('beforeend', `
  <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
    <i class="fas fa-car-side"></i>
    <span>${service}</span>
  </h1>`)

  for(let i = 0; i < ride.length; i++){
    //ride data
    let fullName = passengerName(ride[i]);
    let passengerQ = passengerNumber(ride[i]);
    let phone = ride[i].passengerDetails.phoneNumber;
    let border = ride[i].purpleRequested ? 'purple-500' : 'gray-900';
    let passengerButton = ride[i].purpleRequested ? 'purple-600' : 'gray-600';

    //pickup data
    let pickupAddress = ride[i].pickupLocation.address;
    let pickupCity = ride[i].pickupLocation.city;
    let pickupState = ride[i].pickupLocation.state;
    let pickupZip = ride[i].pickupLocation.zip;

    //dropoff data
    let dropoffAddress = ride[i].dropoffLocation.address;
    let dropoffCity = ride[i].dropoffLocation.city;
    let dropoffState = ride[i].dropoffLocation.state;
    let dropoffZip = ride[i].dropoffLocation.zip;

    outputElement.insertAdjacentHTML('beforeend',`
        <div class="border-4 border-${border} p-4 my-4 text-left">
        <div class="flex">
          <div class="w-1/2">
            <h2 class="text-2xl py-1">${fullName}</h2>
            <p class="font-bold text-gray-600">${phone}</p>
          </div>
          <div class="w-1/2 text-right">
            <span class="rounded-xl bg-${passengerButton} text-white p-2">
              ${passengerQ} passengers
            </span>
          </div>
        </div>
        <div class="mt-4 flex">
          <div class="w-1/2">
            <div class="text-sm font-bold text-gray-600">PICKUP</div>
            <p>${pickupAddress}</p>
            <p>${pickupCity}, ${pickupState} ${pickupZip}</p>
          </div>
          <div class="w-1/2">
            <div class="text-sm font-bold text-gray-600">DROPOFF</div>
            <p>${dropoffAddress}</p>
            <p>${dropoffCity}, ${dropoffState} ${dropoffZip}</p>
          </div>
        </div>
      </div> `)
  }

}

function passengerName(ride){
  return ride.passengerDetails.first + " " + ride.passengerDetails.last;
}

function determineService(ride){
  for(let i = 0; i < ride.length; i++){
    if(ride.length > 1){
      return "Noober Pool"
    } else if(ride[i].purpleRequested){
      return "Noober Purple"
    } else if(ride[i].numberOfPassengers > 3){
      return "Noober XL"
    } else {
      return "Noober X"
    }
  }
}



window.addEventListener('DOMContentLoaded', pageLoaded)

