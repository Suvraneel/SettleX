#!/bin/bash

# List of AVIF filenames
files=(
  "Ethereum.avif"
  "Optimism.avif"
  "BSC.avif"
  "Unichain.svg"
  "Polygon.avif"
  "zksync.avif"
  "Ronin.avif"
  "BASE.avif"
  "Ape-Chain.avif"
  "Mode.avif"
  "ARB.avif"
  "Avalanche.png"
  "zircuit.svg"
  "Linea.avif"
  "blast.png"
  "Taiko.avif"
  "Scroll.avif"
)

# Base URL
base_url="https://explorer.everclear.org/logos/chains"

# Create folder if it doesn't exist
mkdir -p chains

# Download loop
for file in "${files[@]}"; do
  echo "Downloading $file..."
  curl -s -o "./chains/$file" "$base_url/$file"
done

echo "✅ All downloads completed!"
