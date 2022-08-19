-- SQLite
UPDATE progress SET progress=13 WHERE progress_id = 9;
UPDATE inventory SET apple=10,flask=0,dayPotion=3,monsterEgg=0 WHERE inventory_id = 9;
--SELECT * FROM inventory;
--DELETE FROM users;
--DELETE FROM inventory;
--DELETE FROM progress;
--DROP TABLE inventory;
--SELECT * FROM progress;
--SELECT * FROM inventory;
-- ALTER TABLE progress ADD COLUMN hour INTEGER;
--.schema
--SELECT * FROM progress;
/*
CREATE TABLE inventory(
inventory_id INTEGER,
apple INTEGER,
bones INTEGER,
dayPotion INTEGER,
nightPotion INTEGER,
healthPotion INTEGER,
flask INTEGER,
fountainFlask INTEGER,
chaliceFlask INTEGER,
slimeFlask INTEGER,
monsterEgg INTEGER,
FOREIGN KEY (inventory_id) REFERENCES users(id)
);*/
/*CREATE TABLE progress(
progress_id INTEGER,
hour INTEGER,
location_y INTEGER,
location_x INTEGER,
progress INTEGER,
health INTEGER,
FOREIGN KEY (progress_id) REFERENCES users(id)
);*/
--INSERT INTO inventory (inventory_id,apple,nightPotion,dayPotion,healthPotion,bones) VALUES (8,0,0,0,0,0);
--DELETE FROM inventory;
--INSERT INTO inventory (inventory_id,apple,bones,dayPotion,nightPotion,healthPotion,flask,fountainFlask,chaliceFlask,slimeFlask,monsterEgg) VALUES (8,3,0,0,0,0,0,0,0,0,0);