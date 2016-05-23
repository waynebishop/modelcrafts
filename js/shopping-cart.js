

if( localStorage.getItem('cart') == null ) {
	
	localStorage.setItem('cart', JSON.stringify( [] ));
}

var cart = JSON.parse( localStorage.getItem( 'cart') );


console.log( cart );

updateCartDisplay();




var addToCartButtons = document.querySelectorAll('.add-to-cart');


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

}


document.querySelector('#clear-cart').onclick = function() {

	localStorage.setItem('cart', JSON.stringify( [] ));

	cart = [];

	updateCartDisplay();

}; 

function updateCartDisplay() {

	// Get cart contents
	var cart = JSON.parse( localStorage.getItem('cart') );

	document.querySelector('#total-cart').innerHTML = cart.length;

	showCartTable();


}

function showCartTable() {

	// Find the container that will hold the table
	var container = document.querySelector('#cart-table');

	// Create the HTML table and style with border via setAttribute
	var table = document.createElement('table');
	table.setAttribute('border', '1');


	// Create row to hold the headings
	var headingsRow = document.createElement('tr');

	// Create the name heading
	var nameHeading = document.createElement('th');

	nameheading.innerHTML = 'Product Name';

	// Create price heading
	var priceHeading = document.createElement('th');

	priceHeading.innerHTML = 'Price';

	// Add the headings to the headings Row
	headingsRow.appendChild(nameHeading);
	headingsRow.appendChild(priceHeading);

	// Add the headings row to the table
	table.appendChild(headingsRow);

	// Grandtotal
	var grandTotal = 0;

	// Loop over all the cart items
	for (var i=0; i<cart.length; i++) {

		// Get product price & add to the GT
		grandTotal += cart[i].price;

		// Create a row for this product
		var row = document.createElement('tr');

		// Create the product name data element
		var nameTD = document.createElement('td');

		// Create product price data element
		var priceTD = document.createElement('td');

		// Add data to the TD element
		nameTD.innerHtml = cart[i].name;
		priceTD.innerHTML = cart[i].price;

		// Add the TD elements to the row
		row.appendChild(nameTD);
		row.appendChild(priceTD);

		// Add this row to the table
		table .appendChild(row);

	}

	console.log(grandTotal);

	var grandTotalRow = document.createElement('tr');
	var grandTotalTD = document.createElement('td');
	var fillerTD = document.createElement('td');

	grandTotal.innerHTML = 'Grand Total' + grandTotal;

	grandTotalRow.appendChild(fillerTD);
	grandTotalRow.appendChild(grandTotalTD);

	table.appendChild(grandTotalRow);

	// Clear whatever is inside the div
	container.innerHTML = '';

	// Add table to the screen
	container.appendChild(table);

}






























