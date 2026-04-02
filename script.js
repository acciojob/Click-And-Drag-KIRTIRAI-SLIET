// Your code here.
document.addEventListener("DOMContentLoaded", () => {
	const cubes = document.querySelectorAll(".cube");
	const container = document.querySelector(".container");

	let active = null;
	let offsetX = 0;
	let offsetY = 0;

	cubes.forEach(cube => {
		cube.addEventListener("mousedown", (e) => {
			active = cube;

			// Convert to absolute ONLY when dragging starts
			const rect = cube.getBoundingClientRect();
			const containerRect = container.getBoundingClientRect();

			offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;

			cube.style.position = "absolute";
			cube.style.left = rect.left - containerRect.left + "px";
			cube.style.top = rect.top - containerRect.top + "px";
			cube.style.margin = "0"; // prevent shift

			cube.style.cursor = "grabbing";
		});
	});

	document.addEventListener("mousemove", (e) => {
		if (!active) return;

		const containerRect = container.getBoundingClientRect();

		let x = e.clientX - containerRect.left - offsetX;
		let y = e.clientY - containerRect.top - offsetY;

		// 🔒 Boundaries
		x = Math.max(0, Math.min(x, container.clientWidth - active.offsetWidth));
		y = Math.max(0, Math.min(y, container.clientHeight - active.offsetHeight));

		active.style.left = x + "px";
		active.style.top = y + "px";
	});

	document.addEventListener("mouseup", () => {
		if (active) {
			active.style.cursor = "grab";
		}
		active = null;
	});
});