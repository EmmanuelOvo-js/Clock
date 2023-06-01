const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeHandColor = document.getElementById('large-hand-color');
const secondHandColor = document.getElementById('second-hand-color');

clock = () => {
	const now = new Date();
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');

	// Setup canvas
	ctx.save(); // Save the default state

	ctx.clearRect(0, 0, 500, 500); // Clear the entire canvas
	ctx.translate(250, 250); // Move the origin to the center of the canvas
	ctx.rotate(-Math.PI / 2); // Rotate the canvas -90 degrees
	// Set some default styles
	ctx.strokeStyle = '#000000';
	ctx.fillStyle = '#f4f4f4';
	ctx.lineWidth = 5;
	ctx.lineCap = 'round';

	// Set some default styles
	ctx.strokeStyle = '#000000';
	ctx.fillStyle = '#f4f4f4';
	ctx.lineWidth = 5;
	ctx.lineCap = 'round';

	// Draw clock face
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth = 14;
	ctx.fillStyle = faceColor.value; // Add value
	ctx.strokeStyle = borderColor.value; // Add value
	ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.fill();
	ctx.restore();

	// Draw hour lines
	ctx.save();
	ctx.strokeStyle = lineColor.value; // Add value
	for (let i = 0; i < 12; i++) {
		ctx.beginPath();
		ctx.rotate(Math.PI / 6);
		ctx.moveTo(100, 0);
		ctx.lineTo(120, 0);
		ctx.stroke();
	}
	ctx.restore();

	// Draw minute lines
	ctx.save();
	ctx.lineWidth = 4;
	ctx.strokeStyle = lineColor.value; // Add value
	for (let i = 0; i < 60; i++) {
		// Do not draw on hour lines
		if (i % 5 !== 0) {
			ctx.beginPath();
			ctx.moveTo(117, 0);
			ctx.lineTo(120, 0);
			ctx.stroke();
		}
		ctx.rotate(Math.PI / 30);
	}
	ctx.restore();

	const hr = now.getHours() % 12;
	const min = now.getMinutes();
	const sec = now.getSeconds();
	// console.log(`${hr}:${min}:${sec}`);
	// Color for hands
	ctx.strokeStyle = '#800000';

	// Draw hour hand
	ctx.save();
	ctx.rotate(
		(Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
	);
	ctx.strokeStyle = largeHandColor.value; // Add value
	ctx.lineWidth = 14;
	ctx.beginPath();
	ctx.moveTo(-20, 0);
	ctx.lineTo(80, 0);
	ctx.stroke();
	ctx.restore();

	// Draw minute hand
	ctx.save();
	ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
	ctx.strokeStyle = largeHandColor.value; // Add value
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.moveTo(-28, 0);
	ctx.lineTo(112, 0);
	ctx.stroke();
	ctx.restore();

	// Draw second hand
	ctx.save();
	ctx.rotate((sec * Math.PI) / 30);
	ctx.strokeStyle = secondHandColor.value; // Add value
	ctx.fillStyle = secondHandColor.value; // Add value
	ctx.lineWidth = 6;
	ctx.beginPath();
	ctx.moveTo(-30, 0);
	ctx.lineTo(100, 0);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.restore();

	ctx.restore(); // Restore the default state

	requestAnimationFrame(clock);
};

requestAnimationFrame(clock);
document.getElementById('save-btn').addEventListener('click', () => {
	const canvas = document.getElementById('canvas');
	const dataURL = canvas.toDataURL('image/png');
	const link = document.createElement('a');
	link.download = 'clock.png';
	link.href = dataURL;
	link.click();
});
