#!/bin/bash

# Sweet Crush Game Deployment Script
echo "🍭 Sweet Crush - Deployment Script"
echo "=================================="

case "${1:-start}" in
    "start")
        echo "Starting Sweet Crush game..."
        docker compose up -d
        echo "✅ Game is running at http://localhost:3099"
        ;;
    "stop")
        echo "Stopping Sweet Crush game..."
        docker compose down
        echo "✅ Game stopped successfully"
        ;;
    "restart")
        echo "Restarting Sweet Crush game..."
        docker compose down
        docker compose up -d
        echo "✅ Game restarted at http://localhost:3099"
        ;;
    "build")
        echo "Building Sweet Crush game..."
        docker compose build
        echo "✅ Game built successfully"
        ;;
    "logs")
        echo "Showing Sweet Crush game logs..."
        docker compose logs -f
        ;;
    "status")
        echo "Sweet Crush game status:"
        docker compose ps
        ;;
    "clean")
        echo "Cleaning up Sweet Crush resources..."
        docker compose down --rmi all --volumes --remove-orphans
        echo "✅ Cleanup completed"
        ;;
    "help")
        echo "Available commands:"
        echo "  start   - Start the game (default)"
        echo "  stop    - Stop the game"
        echo "  restart - Restart the game"
        echo "  build   - Build the Docker image"
        echo "  logs    - Show container logs"
        echo "  status  - Show container status"
        echo "  clean   - Remove all containers and images"
        echo "  help    - Show this help message"
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo "Use '$0 help' to see available commands"
        exit 1
        ;;
esac 