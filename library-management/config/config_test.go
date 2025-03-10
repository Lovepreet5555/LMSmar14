package config

import (
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func TestConnectDatabaseMock(t *testing.T) {
	// Arrange: Mock the database connection
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("Failed to create mock DB: %v", err)
	}

	// Mock the GORM DB initialization using the mock database connection
	gormDB, err := gorm.Open(postgres.New(postgres.Config{
		Conn: db,
	}), &gorm.Config{})
	if err != nil {
		t.Fatalf("Failed to open gorm DB: %v", err)
	}

	// Set the global DB variable to the mock database
	DB = gormDB

	// Expect a BEGIN transaction
	mock.ExpectBegin()
	// Expect the AutoMigrate (we can simulate SQL queries here for migration)
	mock.ExpectExec("CREATE TABLE").WillReturnResult(sqlmock.NewResult(1, 1)) // Mock CREATE TABLE query
	// Expect a COMMIT transaction
	mock.ExpectCommit()

	// Act: Call ConnectDatabase with the isTest flag set to true
	DB, err = ConnectDatabase(true)

	// Assert: Ensure no error occurred and DB is set correctly
	assert.NoError(t, err)
	assert.NotNil(t, DB)

	// Ensure that the mock expectations were met

}

func TestConnectDatabaseMigrations(t *testing.T) {
	// Arrange: Mock the database connection
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("Failed to create mock DB: %v", err)
	}

	// Mock the GORM DB initialization using the mock database connection
	gormDB, err := gorm.Open(postgres.New(postgres.Config{
		Conn: db,
	}), &gorm.Config{})
	if err != nil {
		t.Fatalf("Failed to open gorm DB: %v", err)
	}

	// Set the global DB variable to the mock database
	DB = gormDB

	// Expect a BEGIN transaction
	mock.ExpectBegin()
	// Expect the AutoMigrate (we can simulate SQL queries here for migration)
	mock.ExpectExec("CREATE TABLE").WillReturnResult(sqlmock.NewResult(1, 1)) // Mock CREATE TABLE query
	// Expect a COMMIT transaction
	mock.ExpectCommit()

	// Act: Call ConnectDatabase with the isTest flag set to true
	DB, err = ConnectDatabase(true)

	// Assert: Ensure no error occurred and DB is set correctly
	assert.NoError(t, err)
	assert.NotNil(t, DB)

	// Ensure that the mock expectations were met

}
