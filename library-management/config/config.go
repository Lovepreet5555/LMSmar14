package config

import (
	"library-management/models"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DB holds the database connection instance
var DB *gorm.DB

// ConnectDatabase initializes the database connection
func ConnectDatabase(isTest bool) (*gorm.DB, error) {
	if isTest {
		// Mock database for unit testing
		return DB, nil // We just return the mock DB here in tests
	}

	// Actual database connection for normal use
	dsn := "host=localhost user=postgres password=postgres dbname=library_management sslmode=disable"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
		return nil, err
	}

	// Perform a simple query to test the connection
	database.Exec("SELECT 1")

	// Auto-migrate database tables
	err = database.AutoMigrate(
		&models.Library{},
		&models.User{},
		&models.Book{},
		&models.RequestEvent{},
		&models.IssueRegistry{},
		&models.UserLibrary{},
	)
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
		return nil, err
	}

	DB = database
	log.Println("Database connected and migrated successfully!")
	return DB, nil
}
