import pandas as pd
import json
import sys

def csv_to_json(csv_file_path, json_file_path):
    # Read the CSV file
    df = pd.read_csv(csv_file_path)
    
    # Replace null values with appropriate default values
    for column in df.columns:
        if df[column].dtype == 'int64':
            df[column].fillna(-1, inplace=True)
        elif df[column].dtype == 'float64':
            df[column].fillna(-1.0, inplace=True)
        else:
            df[column].fillna("", inplace=True)
    
    # Convert the DataFrame to a list of dictionaries
    data = df.to_dict(orient='records')
    
    # Write the data to a JSON file
    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)
    
    print(f"Data successfully written to {json_file_path}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python csv_to_json.py <input_csv_file> <output_json_file>")
        sys.exit(1)

    input_csv_file = sys.argv[1]
    output_json_file = sys.argv[2]

    csv_to_json(input_csv_file, output_json_file)
