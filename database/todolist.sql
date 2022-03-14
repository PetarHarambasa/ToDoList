USE master;

GO

DROP DATABASE IF EXISTS ToDoListApp 

GO

CREATE DATABASE ToDoListApp

GO

USE ToDoListApp

GO

CREATE TABLE Task(
	IDTask int primary key identity,
	Name nvarchar(255),
	Checked bit default 0
)

GO

CREATE PROCEDURE spSelectTask
AS
BEGIN
SELECT IDTask, Name, Checked FROM Task
END

GO

CREATE PROCEDURE spInsertTask
(
	@name nvarchar(255)
)
AS
BEGIN
	INSERT INTO Task (name) VALUES (@name)
END

GO

CREATE PROCEDURE spUpdateTask
(
	@id int,
	@checked bit
)
AS
UPDATE Task
SET Checked = @checked
WHERE IDTask = @id

GO

CREATE PROCEDURE spDeleteTask
	@id INT
AS
BEGIN
	DELETE FROM Task WHERE IDTask = @id
END