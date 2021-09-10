class Favourite{
	constructor(){
		this.events();
	}

	events(){
		let favouriteBtns = document.querySelectorAll(".favourite-btn");
		favouriteBtns.forEach(btn => btn.addEventListener("click", this.handleClick.bind(this)));
	}

	handleClick(e){
		const btnClicked = e.currentTarget;
		if(btnClicked.dataset.favourited == "yes"){ // User is unfavouriting
			this.unfavourite(btnClicked);
		} else{
			this.favourite(btnClicked);
		}
	}

	favourite(btn){
		// Send PUT HTTP req to the URL
		const URL = `${data.root_url}/wp-json/webblast/v1/favourite`;
		const id = btn.dataset.event;

		fetch(URL, {
			method: "POST",
			headers:{
				"X-WP-Nonce": data.nonce,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				eventID: id
			})
		})
		.then(data => {
			return data.json();
		})
		.then(response => { 
			// response is the new favourite ID
			btn.dataset.favid = response;
			btn.dataset.favourited = "yes";
		});


	}

	unfavourite(btn){
		// Send DELETE HTTP req to URL
		const URL = `${data.root_url}/wp-json/webblast/v1/favourite`;
		const id = btn.dataset.event;
		const favouriteID = btn.dataset.favid;

		fetch(URL, {
			method: "DELETE",
			headers:{
				"X-WP-Nonce": data.nonce,
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				eventID: id,
				favouriteID: favouriteID
			})
		})
		.then(data => {
			return data.json();
		})
		.then(response => {
			console.log(response);
			btn.dataset.favourited = "no";
		});


	}
}

export default Favourite;