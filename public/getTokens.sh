#!/bin/bash

# List of token filenames
files=(
"eth.png"
"weth.png"
"usdc.png"
"usdt.png"
"pufeth.png"
)

# Base URL
base_url="https://explorer.everclear.org/logos/assets"

# Create folder if it doesn't exist
mkdir -p tokens

# Download loop
for file in "${files[@]}"; do
  echo "Downloading $file..."
  curl -s -o "./tokens/$file" "$base_url/$file"
done

echo "✅ All downloads completed!"

# Sleep for 5 seconds
sleep 3