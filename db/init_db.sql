CREATE USER admin WITH PASSWORD 'th3w0rld';
CREATE DATABASE imagegram_1 WITH OWNER admin;
GRANT postgres TO admin;
ALTER ROLE admin LOGIN;

\c imagegram_1
\i db/models/init_table.sql