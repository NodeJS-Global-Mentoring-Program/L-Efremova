CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    login VARCHAR (30) NOT NULL CONSTRAINT uniq_login UNIQUE,
    password VARCHAR(100) NOT NULL,
    age int NOT NULL CHECK (
        age >= 4 
        AND age <= 130
    ),
    "isDeleted" BOOLEAN
);

INSERT INTO users (login, password, age, "isDeleted")
VALUES ('Anakin', 'password1', 40, false),
    ('Padme', 'password2', 35, false),
    ('Leila', 'password3', 20, false),
    ('Luke', 'password4', 20, false),
    ('Ben', 'password5', 5, false),
    ('Han', 'password6', 20, false)
    ON CONFLICT ON CONSTRAINT uniq_login DO NOTHING;