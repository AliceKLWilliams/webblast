class Reviews{
	constructor(){
		this.overlay = document.querySelector(".dark-overlay");

		this.events();
	}

	events(){
		// Form Submits

		let addReviewForm = document.querySelector(".add-review");
		if(addReviewForm) addReviewForm.addEventListener("submit", this.addReview.bind(this));

		let editReviewForm = document.querySelector(".edit-review");
		if(editReviewForm) editReviewForm.addEventListener("submit", this.editReview.bind(this));

		// Modal Options

		let cancel = document.querySelector(".delete__no");
		if(cancel) cancel.addEventListener("click", this.cancelDelete.bind(this));

		let confirm = document.querySelector(".delete__yes");
		if(confirm) confirm.addEventListener("click", this.confirmDelete.bind(this));

		// Add Review
		let openAdd = document.querySelector(".reviews__add");
		if(openAdd) openAdd.addEventListener("click", this.openAdd.bind(this));

		// Dynamic Buttons

		let reviewContainer = document.querySelector(".reviews");
		if(reviewContainer) reviewContainer.addEventListener("click", this.handleClick.bind(this));

		// Close Modals

		let modalCloses = document.querySelectorAll(".modal__close");
		if(modalCloses) modalCloses.forEach(btn => btn.addEventListener("click", this.closeModal.bind(this)));
	
	}

	showOverlay(){
		this.overlay.classList.add("dark-overlay--show");
	}

	hideOverlay(){
		this.overlay.classList.remove("dark-overlay--show");
	}

	closeModal(e){
		let modal = e.target.closest(".modal");
		this.hideModal(modal);
	}

	showModal(modal){
		modal.classList.add("modal--show");
		modal.setAttribute("aria-hidden", false);
		this.showOverlay();
	}

	hideModal(modal){
		modal.classList.remove("modal--show");
		modal.setAttribute("aria-hidden", true);
		this.hideOverlay();
	}

	handleClick(e){
		if(e.target.classList.contains("delete-review")){
			this.deleteReview.call(this, e);
		} else if(e.target.classList.contains("open-edit")){
			this.openEdit.call(this, e);
		}
	}

	openAdd(e){
		e.stopPropagation();
		let modal = document.querySelector(".add");
		this.showModal(modal);
	}

	openEdit(e){
		let modal = document.querySelector(".edit");
		
		let review = e.target.closest(".review");
		let title = review.querySelector(".review__title").innerHTML;
		let content = review.querySelector(".review__content").textContent;
		let numberStars = review.querySelector(".stars").dataset.count;

		// Set Form Values
		modal.querySelector(".edit__title").value = title;
		modal.querySelector(".edit__content").innerHTML = content;
		modal.querySelector(".edit__stars").value = numberStars;

		modal.querySelector(".edit-review").dataset.review  = review.dataset.id;

		this.showModal(modal);
	}

	addReview(e){
		e.preventDefault();

		const URL = `${data.root_url}/wp-json/webblast/v1/review`;
		const ID = e.currentTarget.dataset.event;
		const reviewData = new FormData(e.currentTarget);

		document.body.style.cursor = "wait";

		let modal = document.querySelector(".add");

		fetch(URL, {
			method: "POST",
			headers: {
				"X-WP-Nonce" : data.nonce,
				"Content-Type": "application/json"
			},
			body:JSON.stringify({
				"title": reviewData.get("title"),
				"content": reviewData.get("content"),
				"event_id": ID,
				"star_count": parseInt(reviewData.get("stars"))
			})
		})
		.then(this.handleErrors)
		.then(response => response.json())
		.then(newReviewID => {
			modal.querySelector("form").reset();

			this.hideModal(modal);

			let stars = this.createStars(parseInt(reviewData.get("stars")), false);

			// Create new Review
			let newReview = `<div class="review" data-id="${newReviewID}">
				<h3 class="review__title">${reviewData.get("title")}</h3>
				<div class="review__options">
					<button class="btn open-edit">Edit</button>
					<button class="btn btn--secondary delete-review">Delete</button>
				</div>
				${stars}
				<p class="review__content">${reviewData.get("content")}</p>
			</div>`

			document.querySelector(".reviews__content").innerHTML += newReview;

			//Hide 'Add Review' button
			let addBtn = document.querySelector(".reviews__add");
			addBtn.classList.add("btn--hidden");
			addBtn.setAttribute("aria-hidden", true);

			// Hide 'No Reviews' Text
			this.setHidden(document.querySelector(".reviews__none"), true);

			let reviewsAverage = document.querySelector(".reviews__avg");

			let numberReviews = document.querySelectorAll(".review").length;
			if(numberReviews == 1){
				// Add Average Review Text if first review
				this.setHidden(reviewsAverage, false);
				reviewsAverage.innerHTML = `<p>Average Review: </p> ${this.createStars(parseInt(reviewData.get("stars")), true)}`;

			} else {
				// Update Average if second and up review
				let average = this.getReviewAverage();
				reviewsAverage.innerHTML = `<p>Average Review: </p> ${this.createStars(average, true)}`;
			}
			
			document.body.style.cursor = "default";
		})
		.catch(err => {
			console.log(err);
			document.body.style.cursor = "default"
		});	

		return false;
	}

	getReviewAverage(){
		let reviews = [...document.querySelectorAll(".review")];
		let avg = 0;
		reviews.forEach(review => {
			avg += parseInt(review.querySelector(".stars").dataset.count);
		});
		avg /= reviews.length;

		return avg;
	}

	createStars(numStars, isInline){
		let stars = (isInline) ? `<div class="stars stars--inline" data-count="${numStars}">` : `<div class="stars" data-count="${numStars}">`;
		for(let i = 0; i< numStars; i++){
			stars  += `<i class="fa fa-star star"></i>`;
		}
		stars += `</div>`;

		return stars;
	}

	deleteReview(e){
		let modal = document.querySelector(".delete");
		this.showModal(modal);

		let review = e.target.closest(".review");
		modal.dataset.review = review.dataset.id;
	}

	cancelDelete(e){
		let modal = e.target.closest(".modal");
		this.hideModal(modal);
		modal.dataset.review = "";
	}

	confirmDelete(e){
		let modal = e.currentTarget.closest(".modal");

		// Send DELETE Request to the custom URL
		const URL = `${data.root_url}/wp-json/webblast/v1/review`;

		document.body.style.cursor = "wait";

		let reviewID = modal.dataset.review;

		fetch(URL, {
			method:"DELETE",
			headers: {
				"X-WP-Nonce" : data.nonce,
				"Content-Type": "application/json"
			},
			body:JSON.stringify({
				reviewID: reviewID
			})
		})
		.then(this.handleErrors)
		.then(response => response.json())
		.then(data => {
			this.hideModal(modal);

			document.body.style.cursor = "default";

			// Remove Review
			let review = document.querySelector(`.review[data-id="${reviewID}"]`);
			review.parentNode.removeChild(review);

			//Add 'Add Review' button
			let addBtn = document.querySelector(".reviews__add");
			addBtn.classList.remove("btn--hidden");
			addBtn.setAttribute("aria-hidden", false);

			// If no reviews  -> add 'no review' text && remove average review text
			let reviews = document.querySelectorAll(".review");
			if(reviews.length == 0){
				this.setHidden(document.querySelector(".reviews__none"), false);
				this.setHidden(document.querySelector(".reviews__avg"), true);
			} else {
				let average = this.getReviewAverage();
				document.querySelector(".reviews__avg").innerHTML = `<p>Average Review: </p> ${this.createStars(average, true)}`;
			}
			
		})
		.catch(err => {
			console.log(err);
			document.body.style.cursor = "default";
		});
	}

	setHidden(ele, isHidden){
		if(isHidden){
			ele.classList.add("hidden");
			ele.setAttribute("aria-hidden", "true");
		} else{
			ele.classList.remove("hidden");
			ele.setAttribute("aria-hidden", "false");
		}
	}

	editReview(e){
		e.preventDefault();

		const URL = `${data.root_url}/wp-json/webblast/v1/review`;
		const reviewID = e.currentTarget.dataset.review;
		const reviewData = new FormData(e.currentTarget);

		document.body.style.cursor = "wait";

		fetch(URL, {
			method: "PUT",
			headers: {
				"X-WP-Nonce" : data.nonce,
				"Content-Type": "application/json"
			},
			body:JSON.stringify({
				"title": reviewData.get("title"),
				"content": reviewData.get("content"),
				"review_id": parseInt(reviewID),
				"star_count": parseInt(reviewData.get("stars"))
			})
		})
		.then(this.handleErrors)
		.then(response => response.json())
		.then(data => {
			// Hide Modal
			this.hideModal(document.querySelector(".edit"));

			// Redraw Review
			let review = document.querySelector(`.review[data-id="${reviewID}"]`);
			review.querySelector(".review__title").textContent = reviewData.get("title");
			review.querySelector(".review__content").textContent = reviewData.get("content");

			let stars = "";
			for(let i = 0; i< parseInt(reviewData.get("stars")); i++){
				stars  += `<i class="fa fa-star star"></i>`;
			}

			review.querySelector(".stars").innerHTML = stars;
			review.querySelector(".stars").dataset.count = parseInt(reviewData.get("stars"));

			let average = this.getReviewAverage();
			document.querySelector(".reviews__avg").innerHTML = `<p>Average Review: </p> ${this.createStars(average, true)}`;

			// Reset Cursor
			document.body.style.cursor = "default";
		})
		.catch(err => {
			console.log(err);
			document.body.style.cursor = "default";
		});

		return false;
	}

	handleErrors(response){
		if(!response.ok){
			throw Error(response.statusText);
		}
		return response;
	}
}

let review = new Reviews();