import pandas as pd
import sys

def csv_to_null(csv_file_path, output_csv_file_path):
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
    
    # Write the DataFrame back to a CSV file
    df.to_csv(output_csv_file_path, index=False)
    
    print(f"Data with null values successfully written to {output_csv_file_path}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python csv_to_null.py <input_csv_file> <output_csv_file>")
        sys.exit(1)

    input_csv_file = sys.argv[1]
    output_csv_file = sys.argv[2]

    csv_to_null(input_csv_file, output_csv_file)
