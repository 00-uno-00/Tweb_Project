import json
import csv

# Load scores from JSON file
with open('scores.json', 'r') as json_file:
    player_scores = json.load(json_file)

# Convert the list of scores to a dictionary for easier lookup
scores_dict = {player['player_id']: player['score'] for player in player_scores}

# Load the target CSV file
csv_file_path = 'Assignment_Data/players.csv'  # Replace with your target CSV file path
updated_rows = []

with open(csv_file_path, 'r', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    fieldnames = reader.fieldnames + ['score']  # Add the 'score' column
    for row in reader:
        player_id = int(row['player_id'])
        if player_id in scores_dict:
            row['score'] = scores_dict[player_id]
        else:
            row['score'] = None  # Handle cases where the player_id is not in scores_dict
        updated_rows.append(row)

# Write the updated data back to a new CSV file
updated_csv_file_path = 'updated_players.csv'  # Path to save the updated CSV file
with open(updated_csv_file_path, 'w', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(updated_rows)

print(f"Scores appended and saved to {updated_csv_file_path}")
