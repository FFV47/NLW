const Database = require("sqlite-async");

module.exports = async function (db, { proffyValue, classValue, classScheduleValues }) {
	try {
		// .run method -> returns the Database object after executing the SQL query
		/** @type {Database} */
		const insertedProffy = await db.run(`
			INSERT INTO proffys (
				name,
				avatar,
				whatsapp,
				bio
			) VALUES (
				"${proffyValue.name}",
				"${proffyValue.avatar}",
				"${proffyValue.whatsapp}",
				"${proffyValue.bio}"
			);
		`);

		// If execution was successful, the 'this' object will contain two properties named 'lastID' and 'changes' which contain the value of the last inserted row ID and the number of rows affected by this query respectively.
		const proffy_id = insertedProffy.lastID;

		/** @type {Database} */
		const insertedClass = await db.run(`
			INSERT INTO classes (
				subject,
				cost,
				proffy_id
			) VALUES (
				"${classValue.subject}",
				"${classValue.cost}",
				"${proffy_id}"
			);
		`);

		const class_id = insertedClass.lastID;

		/** @type {Array} */
		const sqlQueryArray = classScheduleValues.map((scheduleValue) => {
			return db.run(`
			INSERT INTO class_schedule (
				class_id,
				weekday,
				time_from,
				time_to
			) VALUES (
				"${class_id}",
				"${scheduleValue.weekday}",
				"${scheduleValue.time_from}",
				"${scheduleValue.time_to}"
			);
		`);
		});

		await Promise.all(sqlQueryArray);
	} catch (e) {
		console.log("Mensagem: " + e.message);
	}
};
