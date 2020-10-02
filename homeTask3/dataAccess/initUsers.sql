CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    login VARCHAR (30) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    age int NOT NULL CHECK (
        age >= 4 
        AND age <= 130
    ),
    "isDeleted" BOOLEAN
);

CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR (30) NOT NULL UNIQUE,
    permissions TEXT []
);

INSERT INTO groups (name, permissions) 
VALUES ('Dark Side', '{"READ", "WHRITE", "DELETE"}'),
    ('Jedi', '{"READ", "WHRITE", "DELETE", "SHARE", "UPLOAD_FILES"}')
    ON CONFLICT (name) DO NOTHING;