CREATE TABLE IF NOT EXISTS EVENT(
	id VARCHAR(30) PRIMARY KEY,
	title VARCHAR(50),
	date VARCHAR(15),
	location VARCHAR(50)
);

CREATE TYPE BUDGET_TYPE AS ENUM("income", "budget");

CREATE TABLE IF NOT EXISTS BUDGET(
	id VARCHAR(30) PRIMARY KEY,
	event_id VARCHAR(30),
	description VARCHAR(30),
	amount VARCHAR(30),
	budget_type BUDGET_TYPE,
	FOREIGN KEY (event_id) REFERENCES EVENT(id),
);