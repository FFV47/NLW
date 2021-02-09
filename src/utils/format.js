const subjectList = [
	"Artes",
	"Biologia",
	"Ciências",
	"Educação física",
	"Física",
	"Geografia",
	"História",
	"Matemática",
	"Português",
	"Química",
];

const weekdayList = [
	"Domingo",
	"Segunda-feira",
	"Terça-feira",
	"Quarta-feira",
	"Quinta-feira",
	"Sexta-feira",
	"Sábado",
];

function convertHourToMinute(time) {
	const [hour, min] = time.split(":");
	return Number(hour * 60) + Number(min);
}

module.exports = {
	subjectList,
	weekdayList,
	convertHourToMinute,
};
