// FREIGHT DESTINATION SECTION

var freightPriceList = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
var freightCost;
var freightDest;

// Has this user picked a freight destination country?
if( localStorage.getItem('country') ) {
	
	// Loop over each option
	var selectElement = document.querySelector('#country'); 
	for(var i=0; i<selectElement.length; i++) {
		
		// Is this the option the user chose?
		if( localStorage.getItem('country') == selectElement[i].value ) {
			// Select this option
			selectElement[i].setAttribute('selected', 'selected');

			freightDest = selectElement[i].value;

			console.log(freightDest);

			console.log("index" + i);
			freightCost = freightPriceList[i];
			console.log("freight section" + freightCost);
		} 
	}
} else {
	freightCost = 999;
	freightDest = "*Please select country.";
}

// Listen for changes in the country options

document.querySelector('#country').onchange = function(){

	localStorage.setItem('country', this.value);
	
	// Work out new freightDest and FreightCost and update Cart table

	if( localStorage.getItem('country') ) {
	
		// Loop over each option
		var selectElement = document.querySelector('#country'); 
		for(var i=0; i<selectElement.length; i++) {
			
			// Is this the option the user chose?
			if( localStorage.getItem('country') == selectElement[i].value ) {
				
				selectElement[i].setAttribute('selected', 'selected');	

				freightDest = selectElement[i].value;
				
				freightCost = freightPriceList[i];
				
				updateCartDisplay();
			} 
		}	
	} else {
				freightCost = 999;
				freightDest = "*Please select country.";
				updateCartDisplay();
	} 
}

// CART COUNT AND TABLE SECTION

// If a shopping cart does not exist in localstorage
if( localStorage.getItem('cart') == null ) {
	//Create the cart with empty array if cart is null 
	localStorage.setItem('cart', JSON.stringify( [] )); 
}
// Extract the cart and convert it back into an Object
var cart = JSON.parse( localStorage.getItem('cart') );

// Show the contents of the cart
console.log( cart );

// Show the user how many items they have in the cart
updateCartDisplay();


//  Find All the .add-to-cart buttons
var addToCartButtons = document.querySelectorAll('.add-to-cart');

// Add click event listeners to them all
for(var i=0; i<addToCartButtons.length; i++) {

	addToCartButtons[i].onclick = addToCart;
}

function addToCart()	{

	var productName = this.dataset.name;
	var productPrice = parseFloat(this.dataset.price);

	var product = {
		name: productName,
		price: productPrice
	} 

	cart.push(product);

	localStorage.setItem('cart', JSON.stringify(cart) );

	console.log(cart);

	updateCartDisplay();

	alert(productName + ' added to your Cart. Thank you.');

}

// Listen for clicks on the clear cart button
document.querySelector('#clear-cart').onclick = function() {

	localStorage.setItem('cart', JSON.stringify( [] ));

	cart = [];

	updateCartDisplay();

	// Alert message for empty cart
	alert('Your Cart is now empty');

}; 

function updateCartDisplay() {

	// Get the cart contents
	var cart = JSON.parse( localStorage.getItem('cart') );
	// Count the cart contents and display number on screen
	document.querySelector('#total-cart').innerHTML = cart.length;
	// Update & show cart table
	showCartTable();

}

function showCartTable() {

	// Find the container that will hold the table
	var container = document.querySelector('#cart-table');
	
	// Create the HTML table and style with border via setAttribute
	var table = document.createElement('table');
	table.setAttribute('border', '1'); 


	// Create a row to hold the headings
	var headingsRow = document.createElement('tr');

	// Create the name heading
	var nameHeading = document.createElement('th');

	nameHeading.innerHTML = 'Product Name';

	// Create price heading
	var priceHeading = document.createElement('th');

	priceHeading.innerHTML = 'Price';

	// Add the headings to the headings Row
	headingsRow.appendChild(nameHeading);
	headingsRow.appendChild(priceHeading);

	// Add the headings row to the table
	table.appendChild(headingsRow);

	// Grand total
	var grandTotal = 0;

	// Loop over all the cart items
	for (var i=0; i<cart.length; i++) {

		// Get the price of the product and add to the grand total
		grandTotal += cart[i].price;		

		// Create a row for this product
		var row = document.createElement('tr');

		// Create the product name data element
		var nameTD = document.createElement('td');

		// Create the product price data element
		var priceTD = document.createElement('td'); 		

		// Add data to the TD element
		nameTD.innerHTML = cart[i].name;
		priceTD.innerHTML = '$' + cart[i].price; 

		// Add the TD elements to the row
		row.appendChild(nameTD);
		row.appendChild(priceTD);

		// Add this row to the table
		table .appendChild(row);
	}


	// Freight table row and data

	// var freightCost = 10;

	console.log("table section" + freightCost);

	var freightRow = document.createElement('tr');
	var freightTextTD = document.createElement('td');
	var freightCostTD = document.createElement('td');

	freightTextTD.innerHTML = 'Freight to ' + freightDest;

	freightCostTD.innerHTML = '$' + freightCost;

	freightRow.appendChild(freightTextTD);
	freightRow.appendChild(freightCostTD);

	table.appendChild(freightRow);

	// Clear whatever is inside the div
	container.innerHTML = '';

	// Add the table to the screeen
	container.appendChild(table);

	// Grand Total table row and data.
	
	console.log(grandTotal);

	grandTotal += freightCost;

	console.log(grandTotal);

	var grandTotalRow = document.createElement('tr');
	var grandTotalTD = document.createElement('td');
	var gtTextTD = document.createElement('td');

	gtTextTD.innerHTML = 'Grand Total';

	grandTotalTD.innerHTML = '$' + grandTotal;

	grandTotalRow.appendChild(gtTextTD);
	grandTotalRow.appendChild(grandTotalTD);

	table.appendChild(grandTotalRow);

	// Clear whatever is inside the div
	container.innerHTML = '';

	// Add the table to the screeen
	container.appendChild(table);
}








