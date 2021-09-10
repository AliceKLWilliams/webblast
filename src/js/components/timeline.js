class Timeline{
	constructor(){
		this.events();
	}

	events(){
		let readMoreBtns = document.querySelectorAll(".timeline__more");
		if(readMoreBtns){
			readMoreBtns.forEach(btn => btn.addEventListener("click", this.showMore.bind(this)));
		}
	}

	showMore(e){
		let event = e.currentTarget.closest(".timeline__event");
		let longText = event.querySelector(".timeline__content--long");
		let shortText = event.querySelector(".timeline__content--short");

		longText.classList.toggle("timeline__content--hide");
		shortText.classList.toggle("timeline__content--hide");
	}
}

export default Timeline;