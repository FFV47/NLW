const database = require("./db");
const createProffy = require("./createProffy");

database.then(async (db) => {
	try {
		const proffyValue = {
			name: "Diego Fernandes",
			avatar:
				"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
			whatsapp: "32999877081",
			bio:
				"Entusiasta das melhores tecnologias de química avançada.<br /><br />Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
		};

		const classValue = {
			subject: 1,
			cost: "20",
		};

		const classScheduleValues = [
			{
				weekday: 1,
				time_from: 720,
				time_to: 1220,
			},
			{
				weekday: 0,
				time_from: 520,
				time_to: 1220,
			},
		];
		await createProffy(db, { proffyValue, classValue, classScheduleValues });

		// DATA QUERY

		// const selectedProffys = await db.all("SELECT * FROM proffys");
		// console.log(selectedProffys);

		// .all method -> returns the results of the query
		const selectedProffy = await db.all(`
			SELECT * FROM class_schedule
			WHERE class_schedule.time_from >= 300
			AND class_schedule.time_to < 1200
		`);
		console.log(selectedProffy);
	} catch (e) {
		console.log("Mensagem: " + e.message);
	}
});
