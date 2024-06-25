import pandas as pd
import sys

def csv_to_null(csv_file_path, output_csv_file_path):
    # Read the CSV file
    df = pd.read_csv(csv_file_path)
    
    # Replace empty values with None
    df = df.where(pd.notnull(df), None)
    
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
