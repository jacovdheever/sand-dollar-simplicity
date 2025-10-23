#!/bin/bash

# Sand Dollar Design - Quick Start Script
# This script sets up and starts the development environment

echo "🚀 Starting Sand Dollar Design Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Kill any existing processes on ports 3001 and 8080
echo "🧹 Cleaning up existing processes..."
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
lsof -ti:8080 | xargs kill -9 2>/dev/null || true

# Start the development environment
echo "🚀 Starting development servers..."
echo "   - Backend server: http://localhost:3001"
echo "   - Frontend server: http://localhost:8080"
echo "   - Admin dashboard: http://localhost:8080/sanddollar-admin"
echo ""
echo "🔐 Admin credentials:"
echo "   Username: jaco@sanddollardesign.co.za"
echo "   Password: SandDollarDesign@2025!"
echo ""
echo "Press Ctrl+C to stop the servers"
echo ""

npm run dev:full
