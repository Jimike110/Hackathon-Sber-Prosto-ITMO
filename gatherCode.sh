#!/bin/bash
# Define the output file
OUTPUT="allCode.txt"

# Clear the output file if it already exists
> "$OUTPUT"

# Recursively find all files in the "app" folder
find ./app -type f | while read -r file; do
  echo "----- File: $file -----" >> "$OUTPUT"
  cat "$file" >> "$OUTPUT"
  echo -e "\n" >> "$OUTPUT"
done

echo "All files have been concatenated into $OUTPUT"
