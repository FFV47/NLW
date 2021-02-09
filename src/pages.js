// LOCAL MDOULES

const { subjectList, weekdayList, convertHourToMinute } = require("./utils/format");

// DATABASE

const database = require("./database/db");

// PAGE FUNCTIONS
const pageLanding = (req, res) => res.render("index.html");
async function pageStudy(req, res) {
	const filter = req.query;

	// undefined does not pass the verification
	if (!filter.subject || !filter.weekday || !filter.time) {
		return res.render("study.html", { filter, subjectList, weekdayList });
	}

	const timeMin = convertHourToMinute(filter.time);

	const query = `
		SELECT * FROM proffys
		JOIN classes ON classes.proffy_id = proffys.id
		WHERE EXISTS (
			SELECT * FROM class_schedule
			WHERE class_schedule.class_id = classes.id
			AND class_schedule.weekday = ${filter.weekday}
			AND class_schedule.time_from <= ${timeMin}
			AND class_schedule.time_to > ${timeMin}
		)
		AND classes.subject = ${filter.subject}
	`;

	try {
		const db = await database;
		const proffyList = await db.all(query);
		return res.render("study.html", { proffyList, filter, subjectList, weekdayList });
	} catch (e) {
		console.log("Message: " + e.message);
	}
}
const pageGiveClasses = (req, res) =>
	res.render("give-classes.html", { subjectList, weekdayList });

async function saveClasses(req, res) {
	const createProffy = require("./database/createProffy");

	const proffyValue = {
		name: req.body.name,
		avatar: req.body.avatar,
		whatsapp: req.body.whatsapp,
		bio: req.body.bio,
	};

	const classValue = {
		subject: req.body.subject,
		cost: req.body.cost,
	};

	const classScheduleValues = req.body.weekday.map((weekdayValue, index) => {
		return {
			weekday: weekdayValue,
			time_from: convertHourToMinute(req.body.time_from[index]),
			time_to: convertHourToMinute(req.body.time_to[index]),
		};
	});

	try {
		const db = await database;
		await createProffy(db, { proffyValue, classValue, classScheduleValues });

		let queryString = "?subject=" + req.body.subject;
		queryString += "&weekday=" + req.body.weekday[0];
		queryString += "&time=" + req.body.time_from[0];
		return res.redirect("/study" + queryString);
	} catch (e) {
		console.log("Message: " + e.message);
	}
}

module.exports = {
	pageLanding,
	pageStudy,
	pageGiveClasses,
	saveClasses,
};
